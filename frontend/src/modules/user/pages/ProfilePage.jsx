import React, { useMemo, useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import useApiData from '../../shared/hooks/useApiData';
import { academicProfilesApi } from '../../shared/services/api';
import { useAuth } from '../../shared/auth/AuthContext';
import {
  COMPULSORY_SUBJECTS,
  ELECTIVE_SUBJECTS,
  MAX_ELECTIVE_COUNT,
  NATIONAL_GRADUATION_EXAM_SUBJECTS,
  GRADUATION_COMPULSORY_SUBJECTS,
  MAX_GRADUATION_ELECTIVES,
} from '../data/curriculumData';

import ProfileHero from '../components/profile/ProfileHero';
import ProfileTabNav from '../components/profile/ProfileTabNav';
import ProfileWizardFooter from '../components/profile/ProfileWizardFooter';
import Step1Curriculum from '../components/profile/Step1Curriculum';
import Step2GradesTable from '../components/profile/Step2GradesTable';
import Step3GraduationExam from '../components/profile/Step3GraduationExam';
import Step4Priorities from '../components/profile/Step4Priorities';
import Step5CombinationScores from '../components/profile/Step5CombinationScores';
import { calculateAllCombinationScores } from '../utils/combinationScoreCalculator';

export default function ProfilePage() {

  const { user } = useAuth();
  const userId = user?.id;

  const { data, loading, error, reload } = useApiData({
    profiles: () => academicProfilesApi.list({ userId: userId ?? '' }),
  });

  const myProfile = useMemo(
    () => (Array.isArray(data.profiles) ? data.profiles.find((p) => p.userId === userId) : null),
    [data.profiles, userId]
  );

  // UX Navigation Mode: từng bước có tab và wizard footer
  const [activeTab, setActiveTab] = useState('hocba'); // 'hocba' | 'thpt' | 'priority' | 'combos'

  // States: Môn tự chọn học bạ
  const [selectedElectives, setSelectedElectives] = useState([]);
  const [draftElectives, setDraftElectives] = useState([]);
  const [isElectivesLocked, setIsElectivesLocked] = useState(false);
  const [isEditingElectives, setIsEditingElectives] = useState(false);
  const [savingElectives, setSavingElectives] = useState(false);

  // States: Điểm học bạ 3 năm
  const [grades, setGrades] = useState({});

  // States: Môn thi & Điểm thi tốt nghiệp THPT (2+2)
  const [thptElectives, setThptElectives] = useState([]);
  const [thptGrades, setThptGrades] = useState({});

  // States: Thu nhỏ / Mở rộng các phần (mặc định tất cả đều thu nhỏ khi vào trang)
  const [collapsedSections, setCollapsedSections] = useState({
    step1: true,
    step2: true,
    step3: true,
    step4: true,
    step5: true,
  });

  const toggleSection = (stepKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  // States: Vùng miền & Tỉnh/Thành phố
  const [provinceCity, setProvinceCity] = useState('');
  const [region, setRegion] = useState('');

  // States: Ưu tiên & chứng chỉ
  const [priorityArea, setPriorityArea] = useState('KV3');
  const [priorityGroup, setPriorityGroup] = useState('NONE');
  const [ielts, setIelts] = useState('');

  // Tự động tính toán điểm các tổ hợp môn (Học bạ & Tốt nghiệp THPT) theo quy định Bộ GD&ĐT
  const calculatedCombinations = useMemo(() => {
    return calculateAllCombinationScores({
      grades,
      thptGrades,
      ielts,
      priorityArea,
      priorityGroup,
    });
  }, [grades, thptGrades, ielts, priorityArea, priorityGroup]);

  // Tổ hợp có điểm xét tuyển cao nhất
  const bestCombo = useMemo(() => {
    return calculatedCombinations?.thptResults?.[0] || calculatedCombinations?.hocbaResults?.[0] || null;
  }, [calculatedCombinations]);

  const [initialized, setInitialized] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Auto-sync states
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'saved' | 'cached'
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const autoSaveTimerRef = React.useRef(null);

  // Nạp dữ liệu từ backend và khôi phục bản nháp local nếu có
  useEffect(() => {
    if (!userId) return;
    const draftKey = `admission_profile_draft_${userId}`;
    let localDraft = null;
    try {
      const localDraftStr = localStorage.getItem(draftKey);
      if (localDraftStr) localDraft = JSON.parse(localDraftStr);
    } catch (e) {
      console.warn('Cannot parse local draft:', e);
    }

    if (myProfile && !initialized) {
      const hocba = myProfile.hocbaScores || {};
      const thpt = myProfile.thptScores || {};
      const certs = myProfile.internationalCertificates || {};

      // 1. Môn tự chọn học bạ
      const dbElectives = Array.isArray(hocba.electiveSubjects) ? hocba.electiveSubjects : [];
      const electivesToUse = (localDraft?.selectedElectives?.length === MAX_ELECTIVE_COUNT)
        ? localDraft.selectedElectives
        : (dbElectives.length > 0 ? dbElectives : (localDraft?.draftElectives || []));

      setSelectedElectives(electivesToUse);
      setDraftElectives(localDraft?.draftElectives || electivesToUse);
      setIsElectivesLocked(electivesToUse.length === MAX_ELECTIVE_COUNT);
      setIsEditingElectives(electivesToUse.length !== MAX_ELECTIVE_COUNT);

      // 2. Điểm học bạ
      const initialGrades = {};
      if (hocba.scores && typeof hocba.scores === 'object') {
        Object.entries(hocba.scores).forEach(([sub, scoreObj]) => {
          initialGrades[sub] = {
            grade10: scoreObj.grade10 !== undefined && scoreObj.grade10 !== null ? String(scoreObj.grade10) : '',
            grade11: scoreObj.grade11 !== undefined && scoreObj.grade11 !== null ? String(scoreObj.grade11) : '',
            grade12: scoreObj.grade12 !== undefined && scoreObj.grade12 !== null ? String(scoreObj.grade12) : '',
          };
        });
      }
      if (localDraft?.grades) {
        Object.entries(localDraft.grades).forEach(([sub, g]) => {
          initialGrades[sub] = {
            grade10: g.grade10 !== '' && g.grade10 !== undefined ? g.grade10 : (initialGrades[sub]?.grade10 || ''),
            grade11: g.grade11 !== '' && g.grade11 !== undefined ? g.grade11 : (initialGrades[sub]?.grade11 || ''),
            grade12: g.grade12 !== '' && g.grade12 !== undefined ? g.grade12 : (initialGrades[sub]?.grade12 || ''),
          };
        });
      }
      setGrades(initialGrades);

      // 3. Môn thi & Điểm thi tốt nghiệp THPT
      let initialThptElectives = localDraft?.thptElectives || [];
      if (initialThptElectives.length === 0) {
        if (Array.isArray(thpt.electiveSubjects) && thpt.electiveSubjects.length > 0) {
          initialThptElectives = thpt.electiveSubjects;
        } else if (Array.isArray(thpt.thptElectives) && thpt.thptElectives.length > 0) {
          initialThptElectives = thpt.thptElectives;
        } else {
          const systemKeys = ['Toán', 'Ngữ văn', 'examMethod', 'compulsorySubjects', 'electiveSubjects', 'registeredSubjects', 'scores', 'totalScore', 'averageScore'];
          const candidateKeys = Object.keys(thpt).filter(
            (k) => !systemKeys.includes(k) && (typeof thpt[k] === 'number' || typeof thpt[k] === 'string')
          );
          if (candidateKeys.length > 0) {
            initialThptElectives = candidateKeys.slice(0, MAX_GRADUATION_ELECTIVES);
          }
        }
      }
      setThptElectives(initialThptElectives);

      const initialThptGrades = {};
      if (thpt.scores && typeof thpt.scores === 'object') {
        Object.entries(thpt.scores).forEach(([sub, val]) => {
          if (val !== undefined && val !== null) {
            initialThptGrades[sub] = String(val);
          }
        });
      }
      if (thpt['Toán'] !== undefined && initialThptGrades['Toán'] === undefined) {
        initialThptGrades['Toán'] = String(thpt['Toán']);
      }
      if (thpt['Ngữ văn'] !== undefined && initialThptGrades['Ngữ văn'] === undefined) {
        initialThptGrades['Ngữ văn'] = String(thpt['Ngữ văn']);
      }
      if (localDraft?.thptGrades) {
        Object.entries(localDraft.thptGrades).forEach(([sub, val]) => {
          if (val !== '' && val !== undefined) initialThptGrades[sub] = val;
        });
      }
      setThptGrades(initialThptGrades);

      // 4. Vị trí, Ưu tiên & chứng chỉ
      setProvinceCity(localDraft?.provinceCity || myProfile.provinceCity || '');
      setRegion(localDraft?.region || myProfile.region || '');
      setPriorityArea(localDraft?.priorityArea || myProfile.priorityArea || 'KV3');
      setPriorityGroup(localDraft?.priorityGroup || myProfile.priorityGroup || 'NONE');
      setIelts(localDraft?.ielts !== undefined ? localDraft.ielts : (certs['IELTS'] || ''));

      setInitialized(true);
      if (localDraft?.savedAt) {
        setSyncStatus('saved');
        setLastSavedTime(localDraft.savedAt);
      }
    } else if (!myProfile && !loading && localDraft && !initialized) {
      // Khi chưa có profile trên DB nhưng đã có bản nháp local
      setSelectedElectives(localDraft.selectedElectives || []);
      setDraftElectives(localDraft.draftElectives || []);
      setIsElectivesLocked(localDraft.selectedElectives?.length === MAX_ELECTIVE_COUNT);
      setIsEditingElectives(localDraft.selectedElectives?.length !== MAX_ELECTIVE_COUNT);
      setGrades(localDraft.grades || {});
      setThptElectives(localDraft.thptElectives || []);
      setThptGrades(localDraft.thptGrades || {});
      setProvinceCity(localDraft.provinceCity || '');
      setRegion(localDraft.region || '');
      setPriorityArea(localDraft.priorityArea || 'KV3');
      setPriorityGroup(localDraft.priorityGroup || 'NONE');
      setIelts(localDraft.ielts || '');
      setInitialized(true);
      setSyncStatus('cached');
      setLastSavedTime(localDraft.savedAt || 'bản nháp');
    }
  }, [myProfile, loading, initialized, userId]);

  // Auto-Save Effect (Real-time LocalStorage + Debounced 1500ms Background DB Sync)
  useEffect(() => {
    if (!initialized || !userId) return;

    const draftKey = `admission_profile_draft_${userId}`;
    const nowTimeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. Lưu tức thời vào LocalStorage
    const draftData = {
      selectedElectives,
      draftElectives,
      grades,
      thptElectives,
      thptGrades,
      provinceCity,
      region,
      priorityArea,
      priorityGroup,
      ielts,
      savedAt: nowTimeStr,
    };
    try {
      localStorage.setItem(draftKey, JSON.stringify(draftData));
      setSyncStatus((prev) => (prev === 'syncing' ? 'syncing' : 'cached'));
      setLastSavedTime(nowTimeStr);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // 2. Debounced background auto-sync to backend
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      const activeSubs = [...COMPULSORY_SUBJECTS];
      const electivesList = selectedElectives.length > 0 ? selectedElectives : draftElectives;
      electivesList.forEach((eName) => {
        const eInfo = ELECTIVE_SUBJECTS.find((e) => e.name === eName);
        activeSubs.push({ id: eInfo?.id || eName, name: eName, category: eInfo?.group || 'Môn Tự chọn', isCompulsory: false });
      });

      const formattedScores = {};
      activeSubs.forEach((sub) => {
        const g = grades[sub.name] || {};
        const g10 = g.grade10 !== '' && g.grade10 !== undefined && !isNaN(parseFloat(g.grade10)) ? parseFloat(g.grade10) : null;
        const g11 = g.grade11 !== '' && g.grade11 !== undefined && !isNaN(parseFloat(g.grade11)) ? parseFloat(g.grade11) : null;
        const g12 = g.grade12 !== '' && g.grade12 !== undefined && !isNaN(parseFloat(g.grade12)) ? parseFloat(g.grade12) : null;
        const valid = [g10, g11, g12].filter((v) => v !== null);
        const avg = valid.length > 0 ? parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)) : null;
        formattedScores[sub.name] = { grade10: g10, grade11: g11, grade12: g12, average: avg };
      });

      const thptPayload = {
        examMethod: '2_PLUS_2',
        compulsorySubjects: GRADUATION_COMPULSORY_SUBJECTS,
        electiveSubjects: thptElectives,
        registeredSubjects: ['Toán', 'Ngữ văn', ...thptElectives],
        scores: {},
      };

      ['Toán', 'Ngữ văn', ...thptElectives].forEach((sub) => {
        const rawVal = thptGrades[sub];
        if (rawVal !== undefined && rawVal !== '' && !isNaN(parseFloat(rawVal))) {
          const scoreNum = parseFloat(rawVal);
          thptPayload.scores[sub] = scoreNum;
          thptPayload[sub] = scoreNum;
        }
      });

      // Bảng điểm các tổ hợp tính toán tự động
      const hocbaComboDict = {};
      calculatedCombinations.hocbaResults.forEach((c) => {
        hocbaComboDict[c.code] = {
          rawScore: c.rawScore,
          baseBonus: c.baseBonus,
          effectiveBonus: c.effectiveBonus,
          totalScore: c.totalScore,
          subjects: c.subjects,
          subjectScores: c.subjectScores,
        };
      });

      const thptComboDict = {};
      calculatedCombinations.thptResults.forEach((c) => {
        thptComboDict[c.code] = {
          rawScore: c.rawScore,
          baseBonus: c.baseBonus,
          effectiveBonus: c.effectiveBonus,
          totalScore: c.totalScore,
          subjects: c.subjects,
          subjectScores: c.subjectScores,
        };
      });

      const payload = {
        userId,
        hocbaScores: {
          curriculum: 'GDPT_2018',
          electivesLocked: isElectivesLocked,
          compulsorySubjects: COMPULSORY_SUBJECTS.map((s) => s.name),
          electiveSubjects: electivesList,
          scores: formattedScores,
          gpa: summaryGpa,
          combinationScores: hocbaComboDict,
        },
        thptScores: {
          ...thptPayload,
          combinationScores: thptComboDict,
        },
        internationalCertificates: ielts ? { IELTS: ielts } : {},
        priorityArea,
        priorityGroup,
        provinceCity,
        region,
      };

      try {
        setSyncStatus('syncing');
        if (myProfile?.id) {
          await academicProfilesApi.update(myProfile.id, payload);
        } else {
          await academicProfilesApi.create(payload);
        }
        setSyncStatus('saved');
        setLastSavedTime(nowTimeStr);
      } catch (err) {
        console.warn('Background auto-sync fallback to local cache:', err);
        setSyncStatus('cached');
      }
    }, 1500);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [
    grades, thptGrades, selectedElectives, draftElectives, isElectivesLocked,
    thptElectives, priorityArea, priorityGroup, provinceCity, region, ielts, initialized, userId, myProfile?.id
  ]);

  // Handler: Chọn / bỏ chọn môn tự chọn trong draft
  const handleToggleElective = (subName) => {
    setFeedbackMsg(null);
    if (draftElectives.includes(subName)) {
      setDraftElectives(draftElectives.filter((s) => s !== subName));
    } else {
      if (draftElectives.length >= MAX_ELECTIVE_COUNT) {
        setFeedbackMsg({
          type: 'warning',
          text: `Bạn đã chọn đủ ${MAX_ELECTIVE_COUNT} môn tự chọn. Hãy bỏ chọn bớt một môn trước khi chọn môn "${subName}".`,
        });
        return;
      }
      setDraftElectives([...draftElectives, subName]);
    }
  };

  const handleStartEditElectives = () => {
    setDraftElectives([...selectedElectives]);
    setIsEditingElectives(true);
    setFeedbackMsg({
      type: 'info',
      text: 'Đang mở chế độ đổi môn tự chọn. Hãy chọn lại 4 môn và nhấn "Lưu 4 Môn Tự Chọn".',
    });
  };

  const handleCancelEditElectives = () => {
    setDraftElectives([...selectedElectives]);
    setIsEditingElectives(false);
    setFeedbackMsg(null);
  };

  const handleSaveElectivesToDb = async () => {
    if (draftElectives.length !== MAX_ELECTIVE_COUNT) {
      setFeedbackMsg({
        type: 'warning',
        text: `Vui lòng chọn đúng đủ ${MAX_ELECTIVE_COUNT} môn tự chọn trước khi lưu. Hiện tại bạn đã chọn ${draftElectives.length}/${MAX_ELECTIVE_COUNT} môn.`,
      });
      return;
    }

    setSavingElectives(true);
    setFeedbackMsg(null);

    const existingScores = myProfile?.hocbaScores?.scores || {};
    const updatedScores = {};
    [...COMPULSORY_SUBJECTS.map((s) => s.name), ...draftElectives].forEach((subName) => {
      if (existingScores[subName]) {
        updatedScores[subName] = existingScores[subName];
      }
    });

    const updatedHocba = {
      curriculum: 'GDPT_2018',
      electivesLocked: true,
      compulsorySubjects: COMPULSORY_SUBJECTS.map((s) => s.name),
      electiveSubjects: draftElectives,
      scores: updatedScores,
      gpa: myProfile?.hocbaScores?.gpa || null,
    };

    const payload = {
      userId,
      thptScores: myProfile?.thptScores || {},
      hocbaScores: updatedHocba,
      internationalCertificates: myProfile?.internationalCertificates || (ielts ? { IELTS: ielts } : {}),
      priorityArea: myProfile?.priorityArea || priorityArea,
      priorityGroup: myProfile?.priorityGroup || priorityGroup,
    };

    try {
      if (myProfile?.id) {
        await academicProfilesApi.update(myProfile.id, payload);
      } else {
        await academicProfilesApi.create(payload);
      }

      const removedElectives = selectedElectives.filter((s) => !draftElectives.includes(s));
      if (removedElectives.length > 0) {
        setGrades((prev) => {
          const next = { ...prev };
          removedElectives.forEach((sub) => delete next[sub]);
          return next;
        });
      }

      setSelectedElectives([...draftElectives]);
      setIsElectivesLocked(true);
      setIsEditingElectives(false);

      const validThptElectives = thptElectives.filter(
        (sub) =>
          NATIONAL_GRADUATION_EXAM_SUBJECTS.includes(sub) &&
          (COMPULSORY_SUBJECTS.some((c) => c.name === sub) || draftElectives.includes(sub))
      );
      setThptElectives(validThptElectives);
      setThptGrades((prev) => {
        const next = { ...prev };
        removedElectives.forEach((sub) => {
          if (!validThptElectives.includes(sub)) delete next[sub];
        });
        return next;
      });

      setFeedbackMsg({
        type: 'success',
        text: 'Đã lưu thành công 4 môn tự chọn vào CSDL! Bảng điểm học bạ đã sẵn sàng.',
      });
      reload();
    } catch (err) {
      setFeedbackMsg({
        type: 'error',
        text: err.userMessage || 'Lưu môn tự chọn thất bại. Vui lòng thử lại.',
      });
    } finally {
      setSavingElectives(false);
    }
  };

  // Mảng 12 môn học bạ chính thức
  const allActiveSubjects = useMemo(() => {
    const list = [...COMPULSORY_SUBJECTS];
    selectedElectives.forEach((eName) => {
      const eInfo = ELECTIVE_SUBJECTS.find((e) => e.name === eName);
      list.push({
        id: eInfo?.id || eName,
        name: eName,
        category: eInfo?.group || 'Môn Tự chọn',
        isCompulsory: false,
      });
    });
    return list;
  }, [selectedElectives]);

  // Danh mục môn thi tự chọn tốt nghiệp THPT khả dụng
  const availableGraduationElectives = useMemo(() => {
    const candidateSubjects = [];
    COMPULSORY_SUBJECTS.forEach((sub) => {
      if (!GRADUATION_COMPULSORY_SUBJECTS.includes(sub.name) && NATIONAL_GRADUATION_EXAM_SUBJECTS.includes(sub.name)) {
        candidateSubjects.push({
          name: sub.name,
          category: 'Môn bắt buộc THPT',
          isFromCompulsory: true,
        });
      }
    });
    selectedElectives.forEach((eName) => {
      if (NATIONAL_GRADUATION_EXAM_SUBJECTS.includes(eName)) {
        const info = ELECTIVE_SUBJECTS.find((e) => e.name === eName);
        candidateSubjects.push({
          name: eName,
          category: info?.group || 'Môn tự chọn THPT',
          isFromCompulsory: false,
        });
      }
    });
    return candidateSubjects;
  }, [selectedElectives]);

  // Handler: Thay đổi điểm học bạ
  const handleGradeChange = (subName, yearKey, val) => {
    if (val !== '' && (parseFloat(val) < 0 || parseFloat(val) > 10)) return;
    setGrades((prev) => ({
      ...prev,
      [subName]: {
        ...(prev[subName] || { grade10: '', grade11: '', grade12: '' }),
        [yearKey]: val,
      },
    }));
  };

  // Handler: Toggle môn thi tự chọn tốt nghiệp
  const handleToggleThptElective = (subName) => {
    setFeedbackMsg(null);
    if (thptElectives.includes(subName)) {
      setThptElectives((prev) => prev.filter((s) => s !== subName));
      setThptGrades((prev) => {
        const next = { ...prev };
        delete next[subName];
        return next;
      });
    } else {
      if (thptElectives.length >= MAX_GRADUATION_ELECTIVES) {
        setFeedbackMsg({
          type: 'warning',
          text: `Đã chọn đủ ${MAX_GRADUATION_ELECTIVES} môn thi tự chọn. Hãy bỏ chọn bớt một môn trước khi chọn "${subName}".`,
        });
        return;
      }
      setThptElectives([...thptElectives, subName]);
    }
  };

  // Handler: Thay đổi điểm thi tốt nghiệp
  const handleThptGradeChange = (subName, val) => {
    if (val !== '' && (parseFloat(val) < 0 || parseFloat(val) > 10)) return;
    setThptGrades((prev) => ({
      ...prev,
      [subName]: val,
    }));
  };


  // Thống kê kết quả thi tốt nghiệp THPT
  const thptExamSummary = useMemo(() => {
    const registered = ['Toán', 'Ngữ văn', ...thptElectives];
    const scoredList = registered
      .map((subName) => {
        const val = parseFloat(thptGrades[subName]);
        return !isNaN(val) && val >= 0 && val <= 10 ? { name: subName, score: val } : null;
      })
      .filter(Boolean);

    const total = scoredList.length > 0 ? scoredList.reduce((acc, item) => acc + item.score, 0).toFixed(2) : null;
    const average = scoredList.length > 0 ? (scoredList.reduce((acc, item) => acc + item.score, 0) / scoredList.length).toFixed(2) : null;
    const paralyzedSubjects = scoredList.filter((item) => item.score <= 1.0).map((item) => item.name);

    return {
      registeredCount: registered.length,
      scoredCount: scoredList.length,
      total,
      average,
      hasParalyzed: paralyzedSubjects.length > 0,
      paralyzedSubjects,
    };
  }, [thptElectives, thptGrades]);

  // Tính trung bình 3 năm của 1 môn
  const getSubjectAverage = (subName) => {
    const sub = grades[subName];
    if (!sub) return null;
    const scores = [parseFloat(sub.grade10), parseFloat(sub.grade11), parseFloat(sub.grade12)].filter(
      (s) => !isNaN(s) && s >= 0 && s <= 10
    );
    if (scores.length === 0) return null;
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  };

  // Tính GPA từng năm và GPA toàn khóa 3 năm
  const summaryGpa = useMemo(() => {
    const calcYearGpa = (yearKey) => {
      const validScores = allActiveSubjects
        .map((sub) => {
          const val = parseFloat(grades[sub.name]?.[yearKey]);
          return !isNaN(val) && val >= 0 && val <= 10 ? val : null;
        })
        .filter((v) => v !== null);

      if (validScores.length === 0) return null;
      return (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(2);
    };

    const gpa10 = calcYearGpa('grade10');
    const gpa11 = calcYearGpa('grade11');
    const gpa12 = calcYearGpa('grade12');

    const validYears = [parseFloat(gpa10), parseFloat(gpa11), parseFloat(gpa12)].filter((v) => !isNaN(v));
    const overall = validYears.length > 0 ? (validYears.reduce((a, b) => a + b, 0) / validYears.length).toFixed(2) : null;

    return { gpa10, gpa11, gpa12, overall };
  }, [allActiveSubjects, grades]);

  // Đếm số môn học bạ đã nhập điểm
  const scoredSubjectsCount = useMemo(() => {
    return allActiveSubjects.filter((sub) => {
      const g = grades[sub.name];
      if (!g) return false;
      return [g.grade10, g.grade11, g.grade12].some(
        (v) => v !== '' && v !== undefined && !isNaN(parseFloat(v))
      );
    }).length;
  }, [allActiveSubjects, grades]);

  // Điểm cộng ưu tiên
  const priorityBonus = useMemo(() => {
    let bonus = 0;
    if (priorityArea === 'KV1') bonus += 0.75;
    else if (priorityArea === 'KV2-NT') bonus += 0.5;
    else if (priorityArea === 'KV2') bonus += 0.25;

    if (priorityGroup === 'DT01') bonus += 2.0;
    else if (priorityGroup === 'DT06') bonus += 1.0;

    return bonus;
  }, [priorityArea, priorityGroup]);

  // Lưu toàn bộ bảng điểm và hồ sơ xuống CSDL
  const handleSave = async () => {
    if (saving) return;

    if (!isElectivesLocked) {
      setFeedbackMsg({
        type: 'warning',
        text: 'Vui lòng chọn đủ và lưu 4 môn tự chọn ở Bước 1 trước khi lưu hồ sơ.',
      });
      return;
    }

    if (thptElectives.length < MAX_GRADUATION_ELECTIVES) {
      setFeedbackMsg({
        type: 'warning',
        text: `Vui lòng chọn đủ ${MAX_GRADUATION_ELECTIVES} môn thi tốt nghiệp THPT tự chọn ở Bước 3.`,
      });
      return;
    }

    setSaving(true);
    setFeedbackMsg(null);

    const formattedScores = {};
    allActiveSubjects.forEach((sub) => {
      const g = grades[sub.name] || {};
      const g10 = g.grade10 !== '' && g.grade10 !== undefined ? parseFloat(g.grade10) : null;
      const g11 = g.grade11 !== '' && g.grade11 !== undefined ? parseFloat(g.grade11) : null;
      const g12 = g.grade12 !== '' && g.grade12 !== undefined ? parseFloat(g.grade12) : null;
      const valid = [g10, g11, g12].filter((v) => v !== null);
      const avg = valid.length > 0 ? parseFloat((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)) : null;

      formattedScores[sub.name] = {
        grade10: g10,
        grade11: g11,
        grade12: g12,
        average: avg,
      };
    });

    const thptPayload = {
      examMethod: '2_PLUS_2',
      compulsorySubjects: GRADUATION_COMPULSORY_SUBJECTS,
      electiveSubjects: thptElectives,
      registeredSubjects: ['Toán', 'Ngữ văn', ...thptElectives],
      scores: {},
      totalScore: thptExamSummary.total ? parseFloat(thptExamSummary.total) : null,
      averageScore: thptExamSummary.average ? parseFloat(thptExamSummary.average) : null,
    };

    ['Toán', 'Ngữ văn', ...thptElectives].forEach((sub) => {
      const rawVal = thptGrades[sub];
      if (rawVal !== undefined && rawVal !== '' && !isNaN(parseFloat(rawVal))) {
        const scoreNum = parseFloat(rawVal);
        thptPayload.scores[sub] = scoreNum;
        thptPayload[sub] = scoreNum;
      }
    });

    allActiveSubjects.forEach((sub) => {
      if (thptPayload[sub.name] === undefined && formattedScores[sub.name]?.grade12 !== null) {
        thptPayload[sub.name] = formattedScores[sub.name].grade12;
      }
    });

    // Bảng điểm các tổ hợp tính toán tự động
    const hocbaComboDict = {};
    calculatedCombinations.hocbaResults.forEach((c) => {
      hocbaComboDict[c.code] = {
        rawScore: c.rawScore,
        baseBonus: c.baseBonus,
        effectiveBonus: c.effectiveBonus,
        totalScore: c.totalScore,
        subjects: c.subjects,
        subjectScores: c.subjectScores,
      };
    });

    const thptComboDict = {};
    calculatedCombinations.thptResults.forEach((c) => {
      thptComboDict[c.code] = {
        rawScore: c.rawScore,
        baseBonus: c.baseBonus,
        effectiveBonus: c.effectiveBonus,
        totalScore: c.totalScore,
        subjects: c.subjects,
        subjectScores: c.subjectScores,
      };
    });

    const payload = {
      userId,
      hocbaScores: {
        curriculum: 'GDPT_2018',
        electivesLocked: true,
        compulsorySubjects: COMPULSORY_SUBJECTS.map((s) => s.name),
        electiveSubjects: selectedElectives,
        scores: formattedScores,
        gpa: summaryGpa,
        combinationScores: hocbaComboDict,
      },
      thptScores: {
        ...thptPayload,
        combinationScores: thptComboDict,
      },
      internationalCertificates: ielts ? { IELTS: ielts } : {},
      priorityArea,
      priorityGroup,
      provinceCity,
      region,
    };

    try {
      if (myProfile?.id) {
        await academicProfilesApi.update(myProfile.id, payload);
      } else {
        await academicProfilesApi.create(payload);
      }
      setFeedbackMsg({
        type: 'success',
        text: 'Đã lưu thành công toàn bộ hồ sơ học bạ 3 năm, điểm thi tốt nghiệp và các tổ hợp xét tuyển vào CSDL!',
      });
      reload();
    } catch (err) {
      setFeedbackMsg({
        type: 'error',
        text: err.userMessage || 'Lưu hồ sơ thất bại. Vui lòng thử lại.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="state-block">
          <div className="spinner" />
          <h4>Đang nạp hồ sơ cá nhân và học bạ từ CSDL...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page profile-page-container">
      {/* 1. Profile Hero & KPI ribbon */}
      <ProfileHero
        user={user}
        summaryGpa={summaryGpa}
        thptExamSummary={thptExamSummary}
        allActiveSubjectsCount={allActiveSubjects.length}
        isElectivesLocked={isElectivesLocked}
        priorityBonus={priorityBonus}
        provinceCity={provinceCity}
        region={region}
        saving={saving}
        onSave={handleSave}
      />

      {/* Alert message */}
      {feedbackMsg && (
        <div className={`alert ${feedbackMsg.type === 'success' ? 'alert-success' : feedbackMsg.type === 'warning' ? 'alert-warning' : feedbackMsg.type === 'info' ? 'alert-info' : 'alert-error'} profile-feedback-alert`}>
          {feedbackMsg.type === 'success' ? <CheckCircle2 size={18} /> : feedbackMsg.type === 'info' ? <Info size={18} /> : <AlertCircle size={18} />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* 2. Global Section Stepper & Tab Bar */}
      <ProfileTabNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isElectivesLocked={isElectivesLocked}
        scoredSubjectsCount={scoredSubjectsCount}
        allActiveSubjectsCount={allActiveSubjects.length}
        thptExamSummary={thptExamSummary}
        thptElectivesCount={thptElectives.length}
        priorityArea={priorityArea}
        priorityBonus={priorityBonus}
        bestCombo={bestCombo}
      />

      {/* 3. Main Content Container (Chế độ xem từng phần / Tab Wizard) */}
      <div className="profile-tab-content-wrapper">
        {/* TAB 1: Học bạ 3 năm & Môn tự chọn */}
        {activeTab === 'hocba' && (
          <div className="profile-tab-pane">
            <Step1Curriculum
              isCollapsed={collapsedSections.step1}
              onToggleCollapse={() => toggleSection('step1')}
              isElectivesLocked={isElectivesLocked}
              isEditingElectives={isEditingElectives}
              selectedElectives={selectedElectives}
              draftElectives={draftElectives}
              savingElectives={savingElectives}
              onToggleElective={handleToggleElective}
              onStartEditElectives={handleStartEditElectives}
              onCancelEditElectives={handleCancelEditElectives}
              onSaveElectivesToDb={handleSaveElectivesToDb}
            />

            <Step2GradesTable
              isCollapsed={collapsedSections.step2}
              onToggleCollapse={() => toggleSection('step2')}
              isElectivesLocked={isElectivesLocked}
              allActiveSubjects={allActiveSubjects}
              grades={grades}
              onGradeChange={handleGradeChange}
              getSubjectAverage={getSubjectAverage}
              summaryGpa={summaryGpa}
              scoredSubjectsCount={scoredSubjectsCount}
            />
          </div>
        )}

        {/* TAB 2: Thi Tốt Nghiệp THPT (2+2) */}
        {activeTab === 'thpt' && (
          <div className="profile-tab-pane">
            <Step3GraduationExam
              isCollapsed={collapsedSections.step3}
              onToggleCollapse={() => toggleSection('step3')}
              isElectivesLocked={isElectivesLocked}
              thptElectives={thptElectives}
              availableGraduationElectives={availableGraduationElectives}
              onToggleThptElective={handleToggleThptElective}
              thptGrades={thptGrades}
              onThptGradeChange={handleThptGradeChange}
              thptExamSummary={thptExamSummary}
            />
          </div>
        )}

        {/* TAB 3: Ưu Tiên & Chứng Chỉ */}
        {activeTab === 'priority' && (
          <div className="profile-tab-pane">
            <Step4Priorities
              isCollapsed={collapsedSections.step4}
              onToggleCollapse={() => toggleSection('step4')}
              provinceCity={provinceCity}
              setProvinceCity={setProvinceCity}
              region={region}
              setRegion={setRegion}
              priorityArea={priorityArea}
              setPriorityArea={setPriorityArea}
              priorityGroup={priorityGroup}
              setPriorityGroup={setPriorityGroup}
              ielts={ielts}
              setIelts={setIelts}
              priorityBonus={priorityBonus}
              saving={saving}
              onSave={handleSave}
              syncStatus={syncStatus}
            />
          </div>
        )}


        {/* TAB 4: Tổ Hợp Môn Xét Tuyển */}
        {activeTab === 'combos' && (
          <div className="profile-tab-pane">
            <Step5CombinationScores
              isCollapsed={collapsedSections.step5}
              onToggleCollapse={() => toggleSection('step5')}
              calculatedCombinations={calculatedCombinations}
              priorityArea={priorityArea}
              priorityGroup={priorityGroup}
              ielts={ielts}
            />
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <ProfileWizardFooter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isElectivesLocked={isElectivesLocked}
          saving={saving}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
