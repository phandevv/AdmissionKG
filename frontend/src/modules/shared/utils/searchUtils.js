/**
 * High-performance Vietnamese text normalization, fuzzy matching, and BM25-style relevance ranking utility.
 * Optimized for rapid filtering and accurate relevance scoring across large admission datasets.
 */

// Strip Vietnamese accents/diacritics and convert to lower-case ASCII
export function removeVietnameseAccents(str) {
  if (!str) return '';
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim();
}

/**
 * Fast Levenshtein edit distance calculation (optimized for short search tokens)
 */
export function editDistance(s1, s2) {
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  if (s1.length > s2.length) {
    const tmp = s1; s1 = s2; s2 = tmp;
  }

  const row = new Array(s1.length + 1);
  for (let i = 0; i <= s1.length; i++) row[i] = i;

  for (let i = 1; i <= s2.length; i++) {
    let prev = i;
    for (let j = 1; j <= s1.length; j++) {
      let val;
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        val = row[j - 1];
      } else {
        val = Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      }
      row[j - 1] = prev;
      prev = val;
    }
    row[s1.length] = prev;
  }
  return row[s1.length];
}

/**
 * Checks if a search token matches and returns score
 * @returns {number} Score >= 0 (0 means no match)
 */
export function scoreTokenMatch(token, normalizedText, textWords) {
  if (!token) return 10;
  if (!normalizedText) return 0;

  // 1. Exact word boundary match (Highest priority)
  if (textWords.includes(token)) {
    return 100;
  }

  // 2. Exact word prefix match
  if (textWords.some((w) => w.startsWith(token))) {
    return 70;
  }

  // 3. Exact substring match
  if (normalizedText.includes(token)) {
    return 50;
  }

  // 4. Acronym check (e.g., "cntt" -> "cong nghe thong tin", "dhqn" -> "dai hoc quy nhon")
  if (token.length >= 2 && token.length <= 6) {
    const acronym = textWords.map((w) => w[0]).join('');
    if (acronym.includes(token)) return 60;
  }

  // 5. Fuzzy match against individual target words (Tolerance for typos)
  // Only allow fuzzy matching if token length >= 3 to avoid single/two-letter false positives
  if (token.length >= 3) {
    const maxAllowedDistance = token.length <= 4 ? 1 : 2;
    for (let i = 0; i < textWords.length; i++) {
      const word = textWords[i];
      if (Math.abs(word.length - token.length) <= maxAllowedDistance) {
        const dist = editDistance(token, word);
        if (dist <= maxAllowedDistance) {
          return Math.max(10, 40 - dist * 15);
        }
      }
    }
  }

  return 0;
}

/**
 * Calculates Full-Text Relevance Score for a record given a query.
 * Weighted by field importance:
 * - Institution Name / Code: High Weight (3.0x)
 * - Major Name / Code / Track: High Weight (2.5x)
 * - Province / Region / Combinations: Standard Weight (1.0x)
 *
 * @param {string} query
 * @param {Object} row
 * @returns {number} 0 if not matching, > 0 for matched with relevance ranking
 */
export function computeSearchRelevance(query, row) {
  if (!query) return 1;
  const rawQuery = query.trim();
  if (!rawQuery) return 1;

  const normalizedQuery = removeVietnameseAccents(rawQuery);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 0) return 1;

  let totalScore = 0;

  // Check if entire query phrase matches exact substring (Big boost!)
  if (row._normText && row._normText.includes(normalizedQuery)) {
    totalScore += 500;
  }
  if (row._normInst && row._normInst.includes(normalizedQuery)) {
    totalScore += 800;
  }
  if (row._normMajor && row._normMajor.includes(normalizedQuery)) {
    totalScore += 600;
  }

  // Evaluate each token across weighted fields
  for (let i = 0; i < queryTokens.length; i++) {
    const token = queryTokens[i];

    const instScore = scoreTokenMatch(token, row._normInst || '', row._normInstWords || []);
    const majorScore = scoreTokenMatch(token, row._normMajor || '', row._normMajorWords || []);
    const generalScore = scoreTokenMatch(token, row._normText || '', row._normWords || []);

    const tokenMaxScore = Math.max(
      instScore * 3.0,
      majorScore * 2.5,
      generalScore * 1.0
    );

    // If any token fails to match, this entire row does not qualify
    if (tokenMaxScore === 0) {
      return 0;
    }

    totalScore += tokenMaxScore;
  }

  return totalScore;
}
