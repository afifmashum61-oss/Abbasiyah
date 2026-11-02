// ==========================================================================
// MEDIA PEMBELAJARAN INTERAKTIF SEJARAH KEBUDAYAAN ISLAM (SKI) MTs
// KELAS VIII MADRASAH TSANAWIYAH (KMA NO. 183 TAHUN 2019)
// TOPIK: MASA KEJAYAAN DINASTI ABBASIYAH (THE GOLDEN AGE OF ISLAM)
// CORE APPLICATION LOGIC & SPA CONTROLLER
// ==========================================================================

class QuranApp {
  constructor() {
    this.student = {
      name: "Fatih Al-Ayyubi",
      grade: "Kelas VIII-A MTs",
      score: 185,
      tajwidScore: 60,
      tahfidzScore: 50,
      hotsScore: 75,
      assessments: [
        {
          id: 1,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Galeri Kejayaan - Ibnu Sina (Al-Qanun)",
          score: 60,
          notes: "Tuntas menganalisis biografi dan mahakarya kedokteran Ibnu Sina"
        },
        {
          id: 2,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Arena Sejarah - Tokoh & Penemuan Abbasiyah",
          score: 50,
          notes: "Menyusun puzzle urutan 4 Khalifah Era Keemasan dengan tepat"
        },
        {
          id: 3,
          date: new Date().toLocaleDateString('id-ID'),
          module: "Simulator AI - Anggaran Riset Bayt al-Hikmah",
          score: 75,
          notes: "Refleksi HOTS kebijakan Khalifah Al-Ma'mun Sangat Baik"
        }
      ]
    };

    // Active UI states
    this.activeTab = "beranda";
    this.activeTajwidSub = "visual";
    this.activeLightboxItem = null;
    this.activeTajwidTopicIndex = 0;
    this.activeGharibTopicIndex = 0;
    this.isWidescreen = false;
    
    // 5 Milestones Linimasa Sejarah Abbasiyah
    this.timelineSteps = [
      { year: "750 M", title: "Berdirinya Dinasti Abbasiyah", desc: "Runtuhnya Dinasti Umayyah di Damaskus, Abu Abbas As-Saffah dibaiat sebagai khalifah pertama di Kufah." },
      { year: "762 M", title: "Pembangunan Kota Baghdad", desc: "Khalifah Abu Ja'far Al-Mansur membangun Madinatussalam (Kota Bundar Baghdad) di tepi Sungai Tigris." },
      { year: "786 M", title: "Puncak Kemakmuran Harun Ar-Rasyid", desc: "Baitul Mal surplus makmur, pembangunan rumah sakit Bimaristan Al-Adudi, & diplomasi jam air dengan Charlemagne." },
      { year: "813 M", title: "Era Emas Bayt al-Hikmah Al-Ma'mun", desc: "Gerakan penerjemahan karya dunia berimbalan emas seberat buku, observatorium Syammasiyyah, & pengukuran bumi." },
      { year: "1258 M", title: "Invasi Pasukan Mongol", desc: "Serbuan pasukan Mongol di bawah pimpinan Hulagu Khan yang meluluhlantakkan peradaban kota Baghdad." }
    ];

    // Timeline state
    this.metronomeInterval = null;
    this.metronomeBeats = 5;
    this.metronomeCurrentStep = 0;
    this.isMetronomeRunning = false;

    // Speed Match Game state
    this.activeMatchSetIndex = 0;
    this.selectedArabCard = null;
    this.selectedIndoCard = null;
    this.matchTimerInterval = null;
    this.matchTimeLeft = 60;
    this.matchedPairsCount = 0;

    // Puzzle State
    this.activePuzzleIndex = 0;
    this.puzzleAnswerList = [];
    this.puzzlePoolList = [];

    // AI Simulator State
    this.activeScenarioIndex = 0;
    this.selectedDecisionKey = null;

    // Load persisted state if exists
    this.loadState();

    // DOM Ready initialization
    document.addEventListener("DOMContentLoaded", () => {
      this.initDOMElements();
      this.bindEvents();
      this.renderAll();
    });
  }

  // State Persistence
  loadState() {
    try {
      const saved = localStorage.getItem("ski_abbasiyah_app_state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.student) this.student = parsed.student;
      }
    } catch (e) {
      console.warn("Could not load local state", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem("ski_abbasiyah_app_state", JSON.stringify({
        student: this.student
      }));
    } catch (e) {
      console.warn("Could not save state", e);
    }
  }

  addPoints(category, amount, reason) {
    this.student.score += amount;
    if (category === "tajwid") this.student.tajwidScore += amount;
    else if (category === "tahfidz") this.student.tahfidzScore += amount;
    else if (category === "hots") this.student.hotsScore += amount;

    this.student.assessments.push({
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID') + " " + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      module: reason,
      score: amount,
      notes: `Penambahan skor ${amount} poin pada modul ${category}`
    });

    this.saveState();
    this.updateHeaderStats();
    this.renderLeaderboard();
    this.renderTeacherPanel();
  }

  initDOMElements() {
    // Navigation tabs
    this.navTabBtns = document.querySelectorAll(".nav-tab-btn");
    this.tabPanes = document.querySelectorAll(".tab-pane");

    // Header elements
    this.totalScoreElem = document.getElementById("headerTotalScore");
    this.studentNameElem = document.getElementById("headerStudentName");
    this.studentClassElem = document.getElementById("headerStudentClass");

    // Galeri Kejayaan (formerly Tajwid) elements
    this.tajwidSubTabBtns = document.querySelectorAll(".tajwid-sub-btn");
    this.tajwidTopicsContainer = document.getElementById("tajwidTopicsPills");
    this.visualGalleryView = document.getElementById("visualGalleryView");
    this.visualGalleryGrid = document.getElementById("visualGalleryGrid");
    this.tajwidContentGrid = document.querySelector(".tajwid-content-grid");
    this.verseTokensContainer = document.getElementById("verseTokensContainer");
    this.verseTitleElem = document.getElementById("verseTitle");
    this.verseSubtitleElem = document.getElementById("verseSubtitle");
    this.verseMissionElem = document.getElementById("verseMission");
    this.verseTranslationElem = document.getElementById("verseTranslation");
    this.versePhoneticElem = document.getElementById("versePhonetic");
    this.fullVerseArabicText = document.getElementById("fullVerseArabicText");
    this.fullVerseSurahRef = document.getElementById("fullVerseSurahRef");
    this.fullVersePhonetic = document.getElementById("fullVersePhonetic");
    this.fullVerseTranslation = document.getElementById("fullVerseTranslation");
    this.explanationCard = document.getElementById("tajwidExplanationCard");
    this.explanationTitle = document.getElementById("explanationTitle");
    this.explanationContent = document.getElementById("explanationContent");

    // Timeline / Metronome elements
    this.beatButtons = document.querySelectorAll(".beat-btn");
    this.beadContainer = document.getElementById("metronomeBeads");
    this.btnToggleMetronome = document.getElementById("btnToggleMetronome");

    // Guide elements
    this.gharibGuideCard = document.getElementById("gharibGuideCard");
    this.gharibGuideTitle = document.getElementById("gharibGuideTitle");
    this.gharibGuideRule = document.getElementById("gharibGuideRule");
    this.gharibGuideMouth = document.getElementById("gharibGuideMouth");

    // Audio Recorder elements
    this.recordCanvas = document.getElementById("audioWaveCanvas");
    this.btnStartRecord = document.getElementById("btnStartRecord");
    this.btnStopRecord = document.getElementById("btnStopRecord");
    this.recDot = document.getElementById("recDot");
    this.recStatusText = document.getElementById("recStatusText");
    this.userAudioPlayer = document.getElementById("userAudioPlayer");
    this.btnSaveSelfEval = document.getElementById("btnSaveSelfEval");

    // Arena Sejarah (formerly Tahfidz) Matching elements
    this.matchSetSelect = document.getElementById("matchSetSelect");
    this.matchArabCol = document.getElementById("matchArabCol");
    this.matchIndoCol = document.getElementById("matchIndoCol");
    this.matchTimerElem = document.getElementById("matchTimer");
    this.matchScoreElem = document.getElementById("matchScore");
    this.btnRestartMatch = document.getElementById("btnRestartMatch");

    // Puzzle elements
    this.puzzleLevelSelect = document.getElementById("puzzleLevelSelect");
    this.puzzleClueText = document.getElementById("puzzleClueText");
    this.puzzleAnswerBox = document.getElementById("puzzleAnswerBox");
    this.puzzlePoolBox = document.getElementById("puzzlePoolBox");
    this.btnCheckPuzzle = document.getElementById("btnCheckPuzzle");
    this.btnResetPuzzle = document.getElementById("btnResetPuzzle");

    // Leaderboard elements
    this.leaderboardBody = document.getElementById("leaderboardBody");

    // AI Simulator elements
    this.scenarioCards = document.querySelectorAll(".scenario-card-select");
    this.scenarioDalilRef = document.getElementById("scenarioDalilRef");
    this.scenarioArabicDalil = document.getElementById("scenarioArabicDalil");
    this.scenarioNarrative = document.getElementById("scenarioNarrative");
    this.scenarioQuestion = document.getElementById("scenarioQuestion");
    this.decisionOptionsContainer = document.getElementById("decisionOptionsContainer");
    this.argumentTextarea = document.getElementById("argumentTextarea");
    this.btnFillIdeal = document.getElementById("btnFillIdeal");
    this.btnSubmitAi = document.getElementById("btnSubmitAi");
    this.aiResultCard = document.getElementById("aiResultCard");

    // Teacher Panel elements
    this.teacherStudentName = document.getElementById("teacherStudentName");
    this.teacherStudentClass = document.getElementById("teacherStudentClass");
    this.teacherTotalScore = document.getElementById("teacherTotalScore");
    this.teacherPredikat = document.getElementById("teacherPredikat");
    this.teacherTajwidScore = document.getElementById("teacherTajwidScore");
    this.teacherTahfidzScore = document.getElementById("teacherTahfidzScore");
    this.teacherHotsScore = document.getElementById("teacherHotsScore");
    this.teacherAssessmentsBody = document.getElementById("teacherAssessmentsBody");
    this.btnDownloadCsv = document.getElementById("btnDownloadCsv");
    this.apiKeyInput = document.getElementById("apiKeyInput");
    this.btnSaveApiKey = document.getElementById("btnSaveApiKey");
    this.btnTestApiKey = document.getElementById("btnTestApiKey");
    this.apiStatusBadge = document.getElementById("apiStatusBadge");
    this.btnResetSession = document.getElementById("btnResetSession");

    // Modals
    this.curriculumModal = document.getElementById("curriculumModal");
    this.profileModal = document.getElementById("profileModal");
    this.modalInputName = document.getElementById("modalInputName");
    this.modalInputClass = document.getElementById("modalInputClass");
  }

  bindEvents() {
    // Header Menu button -> Open curriculum
    const btnHeaderMenu = document.getElementById("btnHeaderMenu");
    if (btnHeaderMenu) {
      btnHeaderMenu.addEventListener("click", () => this.openCurriculumModal());
    }

    // Navigation Tabs & Bottom Nav Items
    this.navTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.switchTab(targetTab);
      });
    });

    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const navTarget = btn.getAttribute("data-nav");
        if (navTarget) this.switchTab(navTarget);
      });
    });

    // Desktop Header Navigation Buttons
    document.querySelectorAll(".desktop-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const navTarget = btn.getAttribute("data-nav");
        if (navTarget) this.switchTab(navTarget);
      });
    });

    // Profile Trigger
    const profileTrigger = document.getElementById("profileTrigger");
    if (profileTrigger) {
      profileTrigger.addEventListener("click", () => this.openProfileModal());
    }

    // Modal Close buttons
    document.querySelectorAll(".modal-close-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        this.closeModals();
      });
    });

    // Save Profile button
    const btnSaveProfile = document.getElementById("btnSaveProfile");
    if (btnSaveProfile) {
      btnSaveProfile.addEventListener("click", () => {
        const newName = this.modalInputName.value.trim();
        const newClass = this.modalInputClass.value.trim();
        if (newName) this.student.name = newName;
        if (newClass) this.student.grade = newClass;
        this.saveState();
        this.updateHeaderStats();
        this.renderLeaderboard();
        this.renderTeacherPanel();
        this.closeModals();
        this.showToast("Profil siswa berhasil diperbarui!", "success");
      });
    }

    // Sub-tab switch (Cendekiawan vs Pusat Peradaban)
    this.tajwidSubTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        this.tajwidSubTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTajwidSub = btn.getAttribute("data-sub");
        this.renderTajwidTopics();
      });
    });

    // Timeline / Metronome Beat Buttons
    this.beatButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.beatButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.metronomeBeats = parseInt(btn.getAttribute("data-beats"));
        this.resetMetronomeBeads();
      });
    });

    // Timeline / Metronome Start/Stop
    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.addEventListener("click", () => {
        this.toggleMetronome();
      });
    }

    // Audio Recorder
    if (this.btnStartRecord) {
      this.btnStartRecord.addEventListener("click", () => this.startAudioRecord());
    }
    if (this.btnStopRecord) {
      this.btnStopRecord.addEventListener("click", () => this.stopAudioRecord());
    }
    if (this.btnSaveSelfEval) {
      this.btnSaveSelfEval.addEventListener("click", () => {
        const checks = document.querySelectorAll(".eval-check:checked");
        if (checks.length === 0) {
          this.showToast("Pilih minimal 1 kriteria evaluasi diri terlebih dahulu.", "error");
          return;
        }
        window.audioManager.playCelebrate();
        this.addPoints("tajwid", 10, "Evaluasi Mandiri Studio Presentasi Sejarah");
        this.showToast(`✨ Luar biasa! +10 Poin evaluasi mandiri sejarah berhasil dicatat!`, "gold");
      });
    }

    // Speed Match Restart & Set Change
    if (this.matchSetSelect) {
      this.matchSetSelect.addEventListener("change", (e) => {
        this.activeMatchSetIndex = parseInt(e.target.value);
        this.startSpeedMatchGame();
      });
    }
    if (this.btnRestartMatch) {
      this.btnRestartMatch.addEventListener("click", () => {
        this.startSpeedMatchGame();
      });
    }

    // Puzzle Level Change & Actions
    if (this.puzzleLevelSelect) {
      this.puzzleLevelSelect.addEventListener("change", (e) => {
        this.activePuzzleIndex = parseInt(e.target.value);
        this.setupPuzzle();
      });
    }
    if (this.btnCheckPuzzle) {
      this.btnCheckPuzzle.addEventListener("click", () => this.checkPuzzleAnswer());
    }
    if (this.btnResetPuzzle) {
      this.btnResetPuzzle.addEventListener("click", () => this.setupPuzzle());
    }

    // AI Simulator Scenarios
    this.scenarioCards.forEach((card, idx) => {
      card.addEventListener("click", () => {
        this.scenarioCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        this.activeScenarioIndex = idx;
        this.renderActiveScenario();
      });
    });

    // Fill Ideal Answer button
    if (this.btnFillIdeal) {
      this.btnFillIdeal.addEventListener("click", () => {
        this.fillIdealHotsAnswer();
      });
    }

    // Submit AI Evaluation button
    if (this.btnSubmitAi) {
      this.btnSubmitAi.addEventListener("click", () => {
        this.evaluateHotsAnswer();
      });
    }

    // Teacher Panel CSV Download
    if (this.btnDownloadCsv) {
      this.btnDownloadCsv.addEventListener("click", () => {
        this.exportCsv();
      });
    }

    // API Key Save & Test
    if (this.btnSaveApiKey) {
      this.btnSaveApiKey.addEventListener("click", () => {
        const key = this.apiKeyInput.value.trim();
        localStorage.setItem("gemini_api_key", key);
        this.updateApiStatus();
    this.initLearningFlow();
        this.showToast("API Key berhasil disimpan di peramban!", "success");
      });
    }
    if (this.btnTestApiKey) {
      this.btnTestApiKey.addEventListener("click", () => {
        this.testGeminiConnection();
      });
    }

    // Reset Session
    if (this.btnResetSession) {
      this.btnResetSession.addEventListener("click", () => {
        if (confirm("Reset seluruh data sesi siswa saat ini untuk memulai pembelajaran baru?")) {
          this.student = {
            name: "Siswa Baru MTs",
            grade: "Kelas VIII MTs",
            score: 0,
            tajwidScore: 0,
            tahfidzScore: 0,
            hotsScore: 0,
            assessments: []
          };
          this.saveState();
          this.updateHeaderStats();
          this.renderLeaderboard();
          this.renderTeacherPanel();
          this.showToast("Sesi berhasil direset!", "success");
        }
      });
    }

    // ==========================================================================
    // HISTORICAL AUDIO & NARRATION HANDLERS
    // ==========================================================================

    // 1. Play Full Item Narration in Galeri Kejayaan
    const btnPlayFullVerse = document.getElementById("btnPlayFullVerse");
    if (btnPlayFullVerse) {
      btnPlayFullVerse.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          if (window.audioManager.isQuranPlaying) {
            window.audioManager.toggleQuranPlay();
          } else {
            const narrationText = `${item.title}. ${item.subtitle}. ${item.ruleGuide} ${item.translation}`;
            window.audioManager.playHistoryNarration(narrationText, {
              title: item.title,
              subtitle: `${item.subtitle} • SKI Kelas 8`
            });
            this.showToast(`🏛️ Memutar Narasi: ${item.title}`, "gold");
          }
        }
      });
    }

    // Quick Play Narration button
    const btnListenAyatQuick = document.getElementById("btnListenAyatQuick");
    if (btnListenAyatQuick) {
      btnListenAyatQuick.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          if (window.audioManager.isQuranPlaying) {
            window.audioManager.toggleQuranPlay();
          } else {
            const narrationText = `${item.title}. ${item.subtitle}. ${item.translation}`;
            window.audioManager.playHistoryNarration(narrationText, {
              title: item.title,
              subtitle: item.subtitle
            });
            this.showToast(`🏛️ Memutar Narasi: ${item.title}`, "gold");
          }
        }
      });
    }

    // Copy Citation / Summary button
    const btnCopyAyat = document.getElementById("btnCopyAyat");
    if (btnCopyAyat) {
      btnCopyAyat.addEventListener("click", () => {
        const item = this.getCurrentTajwidItem();
        if (item) {
          const textToCopy = `${item.title} (${item.subtitle})\n\n"${item.translation}"\n\nSumber: ${item.surahName} (KMA 183 SKI Kelas 8)`;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
              this.showToast("📋 Catatan sejarah berhasil disalin!", "success");
            }).catch(() => {
              this.showToast("📋 Berhasil memilih teks materi", "success");
            });
          }
        }
      });
    }

    // 2. Play Featured Topic Narration on Home
    const btnPlayLastRead = document.getElementById("btnPlayLastRead");
    if (btnPlayLastRead) {
      btnPlayLastRead.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = "Puncak Masa Keemasan Dinasti Abbasiyah dipimpin oleh Khalifah Harun Ar-Rasyid dan Khalifah Al-Ma'mun. Berpusat di Kota Baghdad, peradaban Islam memimpin kemajuan sains dunia melalui lembaga Bayt al-Hikmah, gerakan penerjemahan massal, pembangunan rumah sakit modern Bimaristan, serta diplomasi global tingkat tinggi.";
        window.audioManager.playHistoryNarration(text, {
          title: "Era Keemasan Harun Ar-Rasyid & Al-Ma'mun",
          subtitle: "Pusat Peradaban Baghdad (786–833 M)"
        });
        this.showToast("🏛️ Memutar Narasi: Era Keemasan Harun Ar-Rasyid & Al-Ma'mun", "gold");
      });
    }

    // 3. Play Scenario Dalil on AI Simulator
    const btnPlayScenarioDalil = document.getElementById("btnPlayScenarioDalil");
    if (btnPlayScenarioDalil) {
      btnPlayScenarioDalil.addEventListener("click", () => {
        const scen = window.APP_DATA.scenarios[this.activeScenarioIndex];
        if (scen) {
          const narrationText = `${scen.title}. Landasan: ${scen.dalilRef}. ${scen.background}`;
          window.audioManager.playHistoryNarration(narrationText, {
            title: scen.title,
            subtitle: scen.dalilRef
          });
          this.showToast(`🏛️ Memutar Narasi: ${scen.title}`, "gold");
        }
      });
    }

    // 4. Play History Puzzle Audio
    const btnListenPuzzleAudio = document.getElementById("btnListenPuzzleAudio");
    if (btnListenPuzzleAudio) {
      btnListenPuzzleAudio.addEventListener("click", () => {
        const curPuz = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex];
        if (curPuz && curPuz.correctSequence) {
          const seqText = curPuz.correctSequence.join(", ");
          window.audioManager.playHistoryNarration(`${curPuz.title}. Urutan: ${seqText}`, {
            title: curPuz.title,
            subtitle: "Tantangan Sejarah Abbasiyah"
          });
          this.showToast("🔊 Memutar penjelasan urutan sejarah...", "gold");
        }
      });
    }

    // 5. Global Floating Player Bar Controls
    const gapBtnPlayPause = document.getElementById("gapBtnPlayPause");
    if (gapBtnPlayPause) {
      gapBtnPlayPause.addEventListener("click", () => {
        window.audioManager.toggleQuranPlay();
      });
    }

    const gapBtnRepeat = document.getElementById("gapBtnRepeat");
    if (gapBtnRepeat) {
      gapBtnRepeat.addEventListener("click", () => {
        const isRepeat = window.audioManager.toggleRepeat();
        gapBtnRepeat.classList.toggle("active", isRepeat);
        this.showToast(isRepeat ? "🔁 Pengulangan aktif (Repeat On)" : "➡️ Pengulangan nonaktif", "success");
      });
    }

    const gapBtnStop = document.getElementById("gapBtnStop");
    if (gapBtnStop) {
      gapBtnStop.addEventListener("click", () => {
        window.audioManager.stopQuranAudio();
      });
    }

    const gapProgressBar = document.getElementById("gapProgressBar");
    if (gapProgressBar) {
      gapProgressBar.addEventListener("click", (e) => {
        const rect = gapProgressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        window.audioManager.seekQuranAudio(pct);
      });
    }

    // 6. Global Audio Event Listener
    window.addEventListener("quran-audio-event", (e) => {
      this.handleQuranAudioStateChange(e.detail);
    });
  }

  // ==========================================================================
  // SPA ROUTING & RENDERING
  // ==========================================================================
  switchTab(tabId) {
    this.activeTab = tabId;

    this.navTabBtns.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update bottom nav items
    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      if (btn.getAttribute("data-nav") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update desktop header nav items
    document.querySelectorAll(".desktop-nav-btn").forEach(btn => {
      if (btn.getAttribute("data-nav") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });

    const bodyEl = document.querySelector(".app-content-body");
    if (bodyEl) {
      bodyEl.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Refresh tab-specific states
    if (tabId === "tajwid") {
      this.renderTajwidTopics();
    } else if (tabId === "tahfidz") {
      this.startSpeedMatchGame();
      this.setupPuzzle();
      this.renderLeaderboard();
    } else if (tabId === "ai_simulator") {
      this.renderActiveScenario();
    } else if (tabId === "guru") {
      this.renderTeacherPanel();
    }
  }

  switchTajwidSub(subKey) {
    this.activeTajwidSub = subKey;
    document.querySelectorAll(".tajwid-sub-btn").forEach(btn => {
      if (btn.getAttribute("data-sub") === subKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    this.renderTajwidTopics();
  }

  renderAll() {
    this.updateHeaderStats();
    this.renderTajwidTopics();
    this.resetMetronomeBeads();
    this.startSpeedMatchGame();
    this.setupPuzzle();
    this.renderLeaderboard();
    this.renderActiveScenario();
    this.renderTeacherPanel();
    this.updateApiStatus();
  }

  updateHeaderStats() {
    if (this.totalScoreElem) {
      this.totalScoreElem.textContent = `${this.student.score} XP`;
    }
    if (this.studentNameElem) {
      this.studentNameElem.textContent = this.student.name;
    }
    if (this.studentClassElem) {
      this.studentClassElem.textContent = this.student.grade;
    }
    const homeTotal = document.getElementById("homeTotalScore");
    if (homeTotal) homeTotal.textContent = `${this.student.score} XP`;
    const homeTaj = document.getElementById("homeTajwidScore");
    if (homeTaj) homeTaj.textContent = `${this.student.tajwidScore} XP`;
    const homeTah = document.getElementById("homeTahfidzScore");
    if (homeTah) homeTah.textContent = `${this.student.tahfidzScore} XP`;
    const homeHots = document.getElementById("homeHotsScore");
    if (homeHots) homeHots.textContent = `${this.student.hotsScore} XP`;
  }

  // ==========================================================================
  // TAB 1: GALERI KEJAYAAN: ILMUWAN & PERADABAN ABBASIYAH
  // ==========================================================================
  renderTajwidTopics() {
    if (!this.tajwidTopicsContainer) return;
    this.tajwidTopicsContainer.innerHTML = "";

    const isMad = this.activeTajwidSub === "mad";
    const topics = isMad ? window.APP_DATA.tajwid.mad : window.APP_DATA.tajwid.gharib;
    const activeIdx = isMad ? this.activeTajwidTopicIndex : this.activeGharibTopicIndex;

    topics.forEach((item, idx) => {
      const pill = document.createElement("button");
      pill.className = `topic-pill ${idx === activeIdx ? "active" : ""}`;
      pill.innerHTML = `<span class="pill-dot"></span><span>${item.title}</span>`;
      pill.addEventListener("click", () => {
        if (isMad) this.activeTajwidTopicIndex = idx;
        else this.activeGharibTopicIndex = idx;
        this.renderTajwidTopics();
      });
      this.tajwidTopicsContainer.appendChild(pill);
    });

    this.renderActiveTajwidItem();
  }

  getCurrentTajwidItem() {
    const isMad = this.activeTajwidSub === "mad";
    const topics = isMad ? window.APP_DATA.tajwid.mad : window.APP_DATA.tajwid.gharib;
    const idx = isMad ? this.activeTajwidTopicIndex : this.activeGharibTopicIndex;
    return topics[idx] || topics[0];
  }

  renderActiveTajwidItem() {
    const item = this.getCurrentTajwidItem();
    if (!item) return;

    // Header & metadata
    if (this.verseTitleElem) this.verseTitleElem.textContent = item.title;
    if (this.verseSubtitleElem) this.verseSubtitleElem.textContent = item.subtitle;
    if (this.verseMissionElem) this.verseMissionElem.textContent = item.mission;
    if (this.verseTranslationElem) this.verseTranslationElem.textContent = `"${item.translation}"`;
    if (this.versePhoneticElem) this.versePhoneticElem.textContent = item.audioPhonetic;

    // Topic Illustration Update
    const topicImg = document.getElementById("topicIllustrationImg");
    const topicCap = document.getElementById("topicIllustrationCaption");
    if (topicImg && topicCap) {
      if (item.illustration) {
        topicImg.src = item.illustration;
        topicCap.textContent = item.illustrationCaption || item.title;
      } else {
        // Fallback matching
        if (item.title && item.title.includes("Sina")) {
          topicImg.src = "images/gambar_6.jpg";
          topicCap.textContent = "Ilustrasi: Bimaristan & Riset Kedokteran Ibnu Sina";
        } else if (item.title && item.title.includes("Khawarizmi")) {
          topicImg.src = "images/gambar_5.jpg";
          topicCap.textContent = "Ilustrasi: Observatorium Astronomi & Astrolab Al-Khawarizmi";
        } else if (item.title && (item.title.includes("Hikmah") || item.title.includes("Ma'mun"))) {
          topicImg.src = "images/gambar_1.jpg";
          topicCap.textContent = "Ilustrasi: Bayt al-Hikmah & Riset Peradaban Dunia";
        } else if (item.title && (item.title.includes("Harun") || item.title.includes("Baghdad"))) {
          topicImg.src = "images/gambar_2.jpg";
          topicCap.textContent = "Ilustrasi: Istana Khilafah & Diplomasi Era Harun Ar-Rasyid";
        } else if (item.title && item.title.includes("Bukhari")) {
          topicImg.src = "images/gambar_1.jpg";
          topicCap.textContent = "Ilustrasi: Tradisi Kodifikasi Hadits & Manuskrip";
        } else {
          topicImg.src = "images/gambar_4.jpg";
          topicCap.textContent = "Ilustrasi: Perekonomian & Peradaban Emas Abbasiyah";
        }
      }
    }

    // Full Card Display
    if (this.fullVerseArabicText) this.fullVerseArabicText.textContent = item.fullArabic;
    if (this.fullVerseSurahRef) this.fullVerseSurahRef.textContent = item.subtitle || item.surahName || item.title;
    if (this.fullVersePhonetic) this.fullVersePhonetic.textContent = item.audioPhonetic || "";
    if (this.fullVerseTranslation) this.fullVerseTranslation.textContent = `"${item.translation}"`;

    // Hide previous explanation
    if (this.explanationCard) {
      this.explanationCard.classList.remove("active");
      this.explanationCard.style.display = "none";
    }

    // Set timeline beats to match rule
    this.metronomeBeats = item.ketukan || 3;
    this.resetMetronomeBeads();

    // Guide visibility
    if (this.gharibGuideCard) {
      if (this.activeTajwidSub === "gharib") {
        this.gharibGuideCard.style.display = "block";
        if (this.gharibGuideTitle) this.gharibGuideTitle.textContent = `Karakteristik: ${item.hukumName}`;
        if (this.gharibGuideRule) this.gharibGuideRule.textContent = item.ruleGuide;
        if (this.gharibGuideMouth) this.gharibGuideMouth.textContent = item.mouthGuide;
      } else {
        this.gharibGuideCard.style.display = "none";
      }
    }

    // Render Clickable Chips (Bedah Sejarah)
    if (!this.verseTokensContainer) return;
    this.verseTokensContainer.innerHTML = "";

    item.verseTokens.forEach((token, index) => {
      const tokenBtn = document.createElement("button");
      tokenBtn.className = "word-token-btn";
      tokenBtn.textContent = token.word;
      tokenBtn.setAttribute("data-index", index);

      tokenBtn.addEventListener("click", () => {
        this.handleVerseTokenClick(token, tokenBtn, item);
      });

      this.verseTokensContainer.appendChild(tokenBtn);
    });
  }

  handleVerseTokenClick(token, buttonElement, currentItem) {
    if (buttonElement.classList.contains("correct-identified")) {
      window.audioManager.speakIndonesian(token.word);
      return;
    }

    if (token.isTarget) {
      // SUCCESS! Correct historical fact identified
      buttonElement.classList.add("correct-identified");
      window.audioManager.playSuccess();
      window.audioManager.speakIndonesian(token.word);

      this.addPoints("tajwid", 20, `Bedah Sejarah: ${currentItem.title} (${token.word})`);
      this.showToast(`🎯 Tepat! +20 Poin! Anda menemukan fakta penting: ${token.word}`, "gold");

      // Show Detailed Explanation
      if (this.explanationCard) {
        this.explanationCard.style.display = "block";
        this.explanationCard.classList.add("active");
        if (this.explanationTitle) {
          this.explanationTitle.innerHTML = `<span>✅ Analisis Fakta Sejarah:</span> <strong>${token.word}</strong>`;
        }
        if (this.explanationContent) {
          this.explanationContent.innerHTML = `
            <p><strong>Spesialisasi & Bidang:</strong> ${currentItem.hukumName} (${currentItem.beatsText})</p>
            <p style="margin-top: 0.35rem;"><strong>Penjelasan Historis:</strong> ${token.reason}</p>
            <p style="margin-top: 0.35rem; color: var(--primary-dark);"><strong>Kaidah KMA 183:</strong> ${currentItem.ruleGuide}</p>
          `;
        }
      }
    } else {
      // INCORRECT!
      buttonElement.classList.add("wrong-shake");
      window.audioManager.playError();
      this.showToast(`Bukan tokoh/penemuan ini. ${token.reason}`, "error");

      setTimeout(() => {
        buttonElement.classList.remove("wrong-shake");
      }, 500);
    }
  }

  // Timeline Visualizer: 5 Tonggak Sejarah Abbasiyah
  resetMetronomeBeads() {
    if (!this.beadContainer) return;
    this.beadContainer.innerHTML = "";
    this.timelineSteps.forEach((st, i) => {
      const bead = document.createElement("div");
      bead.className = `beat-bead ${i === 0 ? "active" : ""}`;
      bead.id = `bead-${i}`;
      bead.title = `${st.year}: ${st.title}`;
      bead.addEventListener("click", () => {
        this.selectTimelineStep(i);
      });
      this.beadContainer.appendChild(bead);
    });
    this.updateTimelineGuideInfo(0);
  }

  selectTimelineStep(index) {
    this.metronomeCurrentStep = index;
    const beads = this.beadContainer ? this.beadContainer.querySelectorAll(".beat-bead") : [];
    beads.forEach((b, idx) => {
      b.classList.toggle("active", idx === index);
    });
    window.audioManager.playMetronomeTick(true);
    this.updateTimelineGuideInfo(index);
  }

  updateTimelineGuideInfo(index) {
    const st = this.timelineSteps[index] || this.timelineSteps[0];
    if (this.gharibGuideCard) {
      this.gharibGuideCard.style.display = "block";
      if (this.gharibGuideTitle) this.gharibGuideTitle.textContent = `${st.year} • ${st.title}`;
      if (this.gharibGuideRule) this.gharibGuideRule.textContent = st.desc;
      if (this.gharibGuideMouth) this.gharibGuideMouth.textContent = `Tonggak Sejarah #${index + 1} dari 5 Periode Kejayaan Abbasiyah`;
    }
  }

  toggleMetronome() {
    if (this.isMetronomeRunning) {
      this.stopMetronome();
    } else {
      this.startMetronome();
    }
  }

  startMetronome() {
    this.isMetronomeRunning = true;
    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.innerHTML = `<span>⏹</span> Hentikan`;
      this.btnToggleMetronome.classList.add("btn-subtle");
      this.btnToggleMetronome.classList.remove("btn-emerald");
    }

    const intervalMs = 2000;
    this.metronomeInterval = setInterval(() => {
      this.selectTimelineStep(this.metronomeCurrentStep);
      this.metronomeCurrentStep = (this.metronomeCurrentStep + 1) % this.timelineSteps.length;
    }, intervalMs);
  }

  stopMetronome() {
    this.isMetronomeRunning = false;
    if (this.metronomeInterval) {
      clearInterval(this.metronomeInterval);
      this.metronomeInterval = null;
    }
    if (this.btnToggleMetronome) {
      this.btnToggleMetronome.innerHTML = `<span>▶</span> Jalankan Linimasa`;
      this.btnToggleMetronome.classList.remove("btn-subtle");
      this.btnToggleMetronome.classList.add("btn-emerald");
    }
  }

  // Studio Rekam Suara Mandiri
  async startAudioRecord() {
    if (this.btnStartRecord) this.btnStartRecord.disabled = true;
    if (this.btnStopRecord) this.btnStopRecord.disabled = false;
    if (this.recDot) this.recDot.classList.add("active");
    if (this.recStatusText) this.recStatusText.textContent = "Merekam Presentasi Sejarah...";

    window.audioManager.playTap();
    await window.audioManager.startRecording(this.recordCanvas, (audioUrl) => {
      if (this.userAudioPlayer) {
        this.userAudioPlayer.src = audioUrl;
        this.userAudioPlayer.style.display = "block";
      }
      this.showToast("Rekaman selesai! Anda dapat memutar ulang presentasi sejarah Anda.", "success");
    });
  }

  stopAudioRecord() {
    if (this.btnStartRecord) this.btnStartRecord.disabled = false;
    if (this.btnStopRecord) this.btnStopRecord.disabled = true;
    if (this.recDot) this.recDot.classList.remove("active");
    if (this.recStatusText) this.recStatusText.textContent = "Rekaman Disimpan. Silakan Evaluasi Diri.";

    window.audioManager.stopRecording();
    window.audioManager.playTap();
  }

  // ==========================================================================
  // TAB 2: ARENA SEJARAH: SPEED MATCHING & PUZZLE KRONOLOGI
  // ==========================================================================
  startSpeedMatchGame() {
    const currentSet = window.APP_DATA.tahfidz.matchingSets[this.activeMatchSetIndex] || window.APP_DATA.tahfidz.matchingSets[0];
    this.selectedArabCard = null;
    this.selectedIndoCard = null;
    this.matchedPairsCount = 0;
    this.matchTimeLeft = 60;

    if (this.matchScoreElem) this.matchScoreElem.textContent = "0/6";
    if (this.matchTimerElem) this.matchTimerElem.textContent = `${this.matchTimeLeft}s`;

    if (this.matchTimerInterval) clearInterval(this.matchTimerInterval);

    // Shuffle cards
    const arabCards = [...currentSet.pairs];
    const indoCards = [...currentSet.pairs].sort(() => Math.random() - 0.5);

    if (this.matchArabCol) {
      this.matchArabCol.innerHTML = "";
      arabCards.forEach(pair => {
        const card = document.createElement("div");
        card.className = "match-card arabic-card";
        card.textContent = pair.ar;
        card.setAttribute("data-pair-id", pair.id);
        card.addEventListener("click", () => this.handleMatchCardClick(card, "arab", pair));
        this.matchArabCol.appendChild(card);
      });
    }

    if (this.matchIndoCol) {
      this.matchIndoCol.innerHTML = "";
      indoCards.forEach(pair => {
        const card = document.createElement("div");
        card.className = "match-card";
        card.textContent = pair.id_txt;
        card.setAttribute("data-pair-id", pair.id);
        card.addEventListener("click", () => this.handleMatchCardClick(card, "indo", pair));
        this.matchIndoCol.appendChild(card);
      });
    }

    // Countdown
    this.matchTimerInterval = setInterval(() => {
      this.matchTimeLeft--;
      if (this.matchTimerElem) this.matchTimerElem.textContent = `${this.matchTimeLeft}s`;

      if (this.matchTimeLeft <= 0) {
        clearInterval(this.matchTimerInterval);
        this.showToast("Waktu habis! Coba lagi untuk melatih kecepatan ingatan sejarahmu.", "error");
      }
    }, 1000);
  }

  handleMatchCardClick(cardElement, colType, pairData) {
    if (cardElement.classList.contains("matched")) return;
    window.audioManager.playTap();

    if (colType === "arab") {
      if (this.selectedArabCard) this.selectedArabCard.elem.classList.remove("selected");
      this.selectedArabCard = { elem: cardElement, pairId: pairData.id, arText: pairData.ar };
      cardElement.classList.add("selected");
      window.audioManager.speakIndonesian(pairData.ar);
    } else {
      if (this.selectedIndoCard) this.selectedIndoCard.elem.classList.remove("selected");
      this.selectedIndoCard = { elem: cardElement, pairId: pairData.id };
      cardElement.classList.add("selected");
    }

    // Check if both selected
    if (this.selectedArabCard && this.selectedIndoCard) {
      if (this.selectedArabCard.pairId === this.selectedIndoCard.pairId) {
        // MATCH!
        this.selectedArabCard.elem.classList.add("matched");
        this.selectedIndoCard.elem.classList.add("matched");
        this.selectedArabCard.elem.classList.remove("selected");
        this.selectedIndoCard.elem.classList.remove("selected");

        window.audioManager.playSuccess();
        this.matchedPairsCount++;
        this.addPoints("tahfidz", 15, `Matching Sejarah: ${this.selectedArabCard.arText}`);

        if (this.matchScoreElem) this.matchScoreElem.textContent = `${this.matchedPairsCount}/6`;

        this.selectedArabCard = null;
        this.selectedIndoCard = null;

        if (this.matchedPairsCount === 6) {
          clearInterval(this.matchTimerInterval);
          window.audioManager.playCelebrate();
          const bonus = Math.max(10, Math.floor(this.matchTimeLeft / 2));
          this.addPoints("tahfidz", bonus, `Bonus Kecepatan Matching Sejarah`);
          this.showToast(`🎉 Sempurna! Semua istilah sejarah cocok! +${bonus} Poin Bonus Waktu!`, "gold");
        }
      } else {
        // MISMATCH
        window.audioManager.playError();
        const arabEl = this.selectedArabCard.elem;
        const indoEl = this.selectedIndoCard.elem;

        setTimeout(() => {
          arabEl.classList.remove("selected");
          indoEl.classList.remove("selected");
        }, 350);

        this.selectedArabCard = null;
        this.selectedIndoCard = null;
      }
    }
  }

  // Puzzle Susun Kronologi & Kutipan Sejarah
  setupPuzzle() {
    const currentPuzzle = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex] || window.APP_DATA.tahfidz.puzzles[0];
    this.puzzleAnswerList = [];
    this.puzzlePoolList = [...currentPuzzle.wordsScrambled];

    if (this.puzzleClueText) this.puzzleClueText.textContent = currentPuzzle.translation;
    this.renderPuzzleBoxes();
  }

  renderPuzzleBoxes() {
    if (!this.puzzleAnswerBox || !this.puzzlePoolBox) return;

    this.puzzleAnswerBox.innerHTML = "";
    if (this.puzzleAnswerList.length === 0) {
      this.puzzleAnswerBox.innerHTML = `<span style="color: var(--text-light); font-size: 0.9rem; font-style: italic;">Klik kepingan di bawah untuk menyusun di sini...</span>`;
    } else {
      this.puzzleAnswerList.forEach((word, idx) => {
        const chip = document.createElement("button");
        chip.className = "puzzle-chip in-answer";
        chip.textContent = word;
        chip.addEventListener("click", () => {
          this.puzzleAnswerList.splice(idx, 1);
          this.puzzlePoolList.push(word);
          window.audioManager.playTap();
          this.renderPuzzleBoxes();
        });
        this.puzzleAnswerBox.appendChild(chip);
      });
    }

    this.puzzlePoolBox.innerHTML = "";
    this.puzzlePoolList.forEach((word, idx) => {
      const chip = document.createElement("button");
      chip.className = "puzzle-chip";
      chip.textContent = word;
      chip.addEventListener("click", () => {
        this.puzzlePoolList.splice(idx, 1);
        this.puzzleAnswerList.push(word);
        window.audioManager.speakIndonesian(word);
        window.audioManager.playTap();
        this.renderPuzzleBoxes();
      });
      this.puzzlePoolBox.appendChild(chip);
    });
  }

  checkPuzzleAnswer() {
    const currentPuzzle = window.APP_DATA.tahfidz.puzzles[this.activePuzzleIndex] || window.APP_DATA.tahfidz.puzzles[0];
    const correctSeq = currentPuzzle.correctSequence;

    if (this.puzzleAnswerList.length !== correctSeq.length) {
      this.showToast("Susun seluruh kepingan sebelum memeriksa.", "error");
      window.audioManager.playError();
      return;
    }

    let isCorrect = true;
    for (let i = 0; i < correctSeq.length; i++) {
      if (this.puzzleAnswerList[i] !== correctSeq[i]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      window.audioManager.playCelebrate();
      const narrationText = `${currentPuzzle.title}. ${currentPuzzle.hukumNotes}`;
      window.audioManager.playHistoryNarration(narrationText, {
        title: currentPuzzle.title,
        subtitle: "Tantangan Sejarah Selesai"
      });
      this.showToast(`🏆 Masya Allah, Tepat Sekali! Susunan sejarah benar (+25 Poin)`, "gold");
      this.addPoints("tahfidz", 25, `Puzzle Susun: ${currentPuzzle.title}`);
    } else {
      window.audioManager.playError();
      this.showToast("Susunan kepingan belum tepat. Perhatikan kaidah urutan waktu dan logikanya.", "error");
    }
  }

  // Live Leaderboard
  renderLeaderboard() {
    if (!this.leaderboardBody) return;
    this.leaderboardBody.innerHTML = "";

    const allStudents = [
      ...window.APP_DATA.tahfidz.classmates,
      {
        name: `${this.student.name} (Kamu)`,
        grade: this.student.grade,
        score: this.student.score,
        avatar: "⭐",
        badge: "Peserta Aktif",
        isUser: true
      }
    ];

    allStudents.sort((a, b) => b.score - a.score);

    allStudents.forEach((st, idx) => {
      const tr = document.createElement("tr");
      if (st.isUser) tr.className = "current-user-row";

      let rankHtml = `<span class="rank-badge">${idx + 1}</span>`;
      if (idx === 0) rankHtml = `<span class="rank-badge rank-1">🥇</span>`;
      else if (idx === 1) rankHtml = `<span class="rank-badge rank-2">🥈</span>`;
      else if (idx === 2) rankHtml = `<span class="rank-badge rank-3">🥉</span>`;

      tr.innerHTML = `
        <td>${rankHtml}</td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.25rem;">${st.avatar}</span>
            <div>
              <div style="font-weight: 700; color: ${st.isUser ? 'var(--primary-dark)' : 'inherit'};">${st.name}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${st.grade}</div>
            </div>
          </div>
        </td>
        <td><span style="font-size: 0.75rem; background: var(--surface-subtle); padding: 0.2rem 0.5rem; border-radius: 4px;">${st.badge}</span></td>
        <td style="font-weight: 800; color: var(--gold-600); text-align: right;">${st.score} XP</td>
      `;

      this.leaderboardBody.appendChild(tr);
    });
  }

  // ==========================================================================
  // TAB 3: SIMULATOR KONTEKSTUAL AI: DILEMA KEBIJAKAN ABBASIYAH (HOTS)
  // ==========================================================================
  renderActiveScenario() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    this.selectedDecisionKey = null;

    if (this.scenarioDalilRef) this.scenarioDalilRef.textContent = `Landasan Nilai: ${scen.dalilRef}`;
    if (this.scenarioArabicDalil) this.scenarioArabicDalil.textContent = scen.arabicDalil;
    if (this.scenarioNarrative) this.scenarioNarrative.textContent = scen.background;
    if (this.scenarioQuestion) this.scenarioQuestion.textContent = scen.question;

    if (this.argumentTextarea) this.argumentTextarea.value = "";
    if (this.aiResultCard) {
      this.aiResultCard.classList.remove("active");
      this.aiResultCard.style.display = "none";
    }

    // Render Options A, B, C
    if (this.decisionOptionsContainer) {
      this.decisionOptionsContainer.innerHTML = "";
      scen.options.forEach(opt => {
        const optCard = document.createElement("div");
        optCard.className = "option-radio-card";
        optCard.innerHTML = `
          <input type="radio" name="scenarioOption" id="opt_${opt.key}" value="${opt.key}">
          <div class="option-text-content">
            <h5>${opt.title}</h5>
            <p>${opt.text}</p>
          </div>
        `;

        optCard.addEventListener("click", () => {
          this.decisionOptionsContainer.querySelectorAll(".option-radio-card").forEach(c => c.classList.remove("selected"));
          optCard.classList.add("selected");
          optCard.querySelector("input").checked = true;
          this.selectedDecisionKey = opt.key;
          window.audioManager.playTap();
        });

        this.decisionOptionsContainer.appendChild(optCard);
      });
    }
  }

  fillIdealHotsAnswer() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    
    // Auto-select Option B (Ideal)
    const optBCard = this.decisionOptionsContainer.querySelector("input[value='B']")?.closest(".option-radio-card");
    if (optBCard) {
      this.decisionOptionsContainer.querySelectorAll(".option-radio-card").forEach(c => c.classList.remove("selected"));
      optBCard.classList.add("selected");
      optBCard.querySelector("input").checked = true;
      this.selectedDecisionKey = "B";
    }

    if (this.argumentTextarea) {
      this.argumentTextarea.value = scen.idealAnswer;
    }

    window.audioManager.playTap();
    this.showToast("✨ Contoh Analisis Kebijakan Ideal Dimuat!", "gold");
  }

  async evaluateHotsAnswer() {
    const scen = window.APP_DATA.scenarios[this.activeScenarioIndex] || window.APP_DATA.scenarios[0];
    const argumentText = this.argumentTextarea ? this.argumentTextarea.value.trim() : "";

    if (!this.selectedDecisionKey) {
      this.showToast("Silakan pilih opsi keputusan tindakan (A, B, atau C) terlebih dahulu.", "error");
      window.audioManager.playError();
      return;
    }

    if (argumentText.length < 15) {
      this.showToast("Tuliskan argumen analisis sejarah lebih lengkap (minimal 15 karakter).", "error");
      window.audioManager.playError();
      return;
    }

    if (this.btnSubmitAi) {
      this.btnSubmitAi.disabled = true;
      this.btnSubmitAi.innerHTML = `<span>⏳</span> Menganalisis dengan AI...`;
    }

    const apiKey = localStorage.getItem("gemini_api_key")?.trim();

    try {
      let evaluationResult = null;

      if (apiKey) {
        try {
          evaluationResult = await this.callGeminiApi(apiKey, scen, this.selectedDecisionKey, argumentText);
        } catch (apiErr) {
          console.warn("Gemini API call failed, falling back to smart heuristic evaluator:", apiErr);
          evaluationResult = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
        }
      } else {
        await new Promise(r => setTimeout(r, 700));
        evaluationResult = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
      }

      this.displayAiEvaluationResult(evaluationResult);
    } catch (e) {
      console.error(e);
      const fallback = this.runSmartHeuristicEvaluator(scen, this.selectedDecisionKey, argumentText);
      this.displayAiEvaluationResult(fallback);
    } finally {
      if (this.btnSubmitAi) {
        this.btnSubmitAi.disabled = false;
        this.btnSubmitAi.innerHTML = `<span>🤖</span> Kirim & Analisis dengan AI`;
      }
    }
  }

  // Google Gemini API Integration (gemini-2.5-flash)
  async callGeminiApi(apiKey, scenario, decisionKey, userArgument) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `Anda adalah seorang Guru dan Pakar Kurikulum Sejarah Kebudayaan Islam (SKI) MTs berdasarkan KMA No. 183 Tahun 2019.
Evaluasilah respons penalaran HOTS dan wawasan kepemimpinan siswa MTs terhadap studi kasus sejarah Dinasti Abbasiyah berikut:
Skenario: ${scenario.title} (${scenario.dalilRef})
Pilihan Keputusan Siswa: Pilihan ${decisionKey}
Argumen Siswa: "${userArgument}"

Berikan evaluasi dalam format JSON murni tanpa markdown blok kode tambahan dengan skema:
{
  "score": number (0-100),
  "attitudeEvaluation": string (penilaian sikap kepemimpinan siswa),
  "dalilEvaluation": string (analisis kekuatan fakta dan hikmah sejarah),
  "hotsReflection": string (analisis kedalaman refleksi abad ke-21 / HOTS),
  "ustadzFeedback": string (pesan apresiasi dan penguatan materi dari Guru Sejarah AI)
}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("Empty response from Gemini");

    const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedJson);
  }

  // Smart Heuristic Evaluator (100% offline ready)
  runSmartHeuristicEvaluator(scenario, decisionKey, userArgument) {
    let score = 0;
    const lowerArg = userArgument.toLowerCase();

    if (decisionKey === "B") {
      score += 50;
    } else {
      score += 20;
    }

    if (userArgument.length > 250) score += 20;
    else if (userArgument.length > 100) score += 12;
    else score += 6;

    let matchedKeywords = 0;
    scenario.keywords.forEach(kw => {
      if (lowerArg.includes(kw.toLowerCase())) {
        matchedKeywords++;
      }
    });

    score += Math.min(30, matchedKeywords * 6);
    score = Math.min(100, Math.max(40, score));

    let attitudeEvaluation = "Baik";
    let dalilEvaluation = "Relevan dan Cukup Mendalam";
    let hotsReflection = "Menunjukkan Penalaran Historis Konseptual yang Baik";
    let ustadzFeedback = "Alhamdulillah, pemahaman antum terhadap sejarah kepemimpinan Abbasiyah sudah sangat baik. Terus teladani spirit kecintaan terhadap ilmu pengetahuan ini.";

    if (score >= 85) {
      attitudeEvaluation = "Sangat Baik (Bervisi Peradaban Islami & Intelektual)";
      dalilEvaluation = `Sangat Kuat: Mengaitkan hikmah ${scenario.dalilRef} secara akurat dan kontekstual.`;
      hotsReflection = "Penalaran HOTS Unggul: Mampu menghubungkan peristiwa abad keemasan Islam dengan tantangan generasi muda era modern.";
      ustadzFeedback = `Barakallahu fiik, ananda! Analisis antum menunjukkan kedewasaan berpikir sejarah yang matang dan selaras dengan target KMA 183 Tahun 2019.`;
    } else if (score < 70) {
      attitudeEvaluation = "Cukup (Perlu Penguatan Visi Peradaban)";
      dalilEvaluation = `Masih Perlu Penguatan: Sertakan fakta sejarah tentang Bayt al-Hikmah dan peranan para khalifah.`;
      hotsReflection = "Perlu memperdalam refleksi agar tidak terpaku pada pilihan pragmatis jangka pendek.";
      ustadzFeedback = `Terus semangat belajar, ananda. Coba cermati kembali modul Galeri Kejayaan tentang kebijakan para khalifah Abbasiyah.`;
    }

    return {
      score,
      attitudeEvaluation,
      dalilEvaluation,
      hotsReflection,
      ustadzFeedback
    };
  }

  displayAiEvaluationResult(result) {
    if (!this.aiResultCard) return;

    const scoreNum = document.getElementById("aiScoreNum");
    const evalAttitude = document.getElementById("evalAttitude");
    const evalDalil = document.getElementById("evalDalil");
    const evalHots = document.getElementById("evalHots");
    const ustadzNotes = document.getElementById("ustadzNotes");

    if (scoreNum) scoreNum.textContent = result.score;
    if (evalAttitude) evalAttitude.textContent = result.attitudeEvaluation;
    if (evalDalil) evalDalil.textContent = result.dalilEvaluation;
    if (evalHots) evalHots.textContent = result.hotsReflection;
    if (ustadzNotes) ustadzNotes.textContent = `"${result.ustadzFeedback}"`;

    this.aiResultCard.style.display = "block";
    this.aiResultCard.classList.add("active");
    this.aiResultCard.scrollIntoView({ behavior: 'smooth' });

    window.audioManager.playCelebrate();
    this.addPoints("hots", result.score, `Studi Kasus HOTS: ${window.APP_DATA.scenarios[this.activeScenarioIndex].title}`);
    this.showToast(`✨ Evaluasi AI Selesai! Skor HOTS: ${result.score}/100`, "gold");
  }

  // ==========================================================================
  // TAB 4: PANEL GURU & REKAP NILAI SISWA
  // ==========================================================================
  renderTeacherPanel() {
    if (this.teacherStudentName) this.teacherStudentName.textContent = this.student.name;
    if (this.teacherStudentClass) this.teacherStudentClass.textContent = this.student.grade;
    if (this.teacherTotalScore) this.teacherTotalScore.textContent = `${this.student.score} XP`;

    let predikat = "Jayyid (Baik)";
    if (this.student.score >= 250) predikat = "Mumtaz (Sangat Baik / Istimewa)";
    else if (this.student.score >= 150) predikat = "Jayyid Jiddan (Amat Baik)";
    else if (this.student.score < 80) predikat = "Maqbul (Perlu Bimbingan)";

    if (this.teacherPredikat) this.teacherPredikat.textContent = predikat;

    if (this.teacherTajwidScore) this.teacherTajwidScore.textContent = `${this.student.tajwidScore} Pts`;
    if (this.teacherTahfidzScore) this.teacherTahfidzScore.textContent = `${this.student.tahfidzScore} Pts`;
    if (this.teacherHotsScore) this.teacherHotsScore.textContent = `${this.student.hotsScore} Pts`;

    if (this.teacherAssessmentsBody) {
      this.teacherAssessmentsBody.innerHTML = "";
      if (this.student.assessments.length === 0) {
        this.teacherAssessmentsBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Belum ada rekap aktivitas siswa.</td></tr>`;
      } else {
        this.student.assessments.forEach((item, idx) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><div style="font-weight: 700;">${item.module}</div><div style="font-size: 0.72rem; color: var(--text-muted);">${item.date}</div></td>
            <td><span style="font-weight: 700; color: var(--primary);">${item.score} Pts</span></td>
            <td><span style="font-size: 0.8rem; color: var(--text-muted);">${item.notes}</span></td>
          `;
          this.teacherAssessmentsBody.appendChild(tr);
        });
      }
    }
  }

  // Export to CSV / Excel
  exportCsv() {
    const bom = "\uFEFF";
    let csv = `${bom}No,Nama Siswa,Kelas,Modul / Aktivitas,Poin,Waktu Asesmen,Keterangan\n`;

    this.student.assessments.forEach((item, idx) => {
      csv += `"${idx + 1}","${this.student.name}","${this.student.grade}","${item.module}","${item.score}","${item.date}","${item.notes}"\n`;
    });

    csv += `\n"TOTAL","${this.student.name}","${this.student.grade}","Akumulasi Nilai","${this.student.score}","","Predikat: ${this.teacherPredikat ? this.teacherPredikat.textContent : 'Mumtaz'}"\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Rekap_Nilai_SKI_Kelas8_Dinasti_Abbasiyah_${this.student.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("📄 File Rekap CSV/Excel SKI berhasil diunduh!", "success");
  }

  // API Status & Connection Test
  updateApiStatus() {
    const key = localStorage.getItem("gemini_api_key");
    if (this.apiKeyInput && key) this.apiKeyInput.value = key;

    if (this.apiStatusBadge) {
      if (key && key.length > 10) {
        this.apiStatusBadge.className = "api-status-badge api-status-live";
        this.apiStatusBadge.innerHTML = `<span>🟢</span> Mode Live: Gemini 2.5 Flash Aktif`;
      } else {
        this.apiStatusBadge.className = "api-status-badge api-status-heuristic";
        this.apiStatusBadge.innerHTML = `<span>⚡</span> Mode Mandiri: Smart Heuristic Fallback Aktif (100% Offline Ready)`;
      }
    }
  }

  async testGeminiConnection() {
    const key = this.apiKeyInput ? this.apiKeyInput.value.trim() : "";
    if (!key) {
      this.showToast("Masukkan Google Gemini API Key terlebih dahulu.", "error");
      return;
    }

    this.showToast("Menguji koneksi ke endpoint Google Gemini...", "warning");
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Tes koneksi. Jawab 'OK'." }] }]
        })
      });

      if (res.ok) {
        localStorage.setItem("gemini_api_key", key);
        this.updateApiStatus();
        window.audioManager.playSuccess();
        this.showToast("✅ Berhasil! Koneksi Google Gemini API 2.5 Flash Valid!", "success");
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (e) {
      this.showToast("Koneksi gagal atau API Key tidak valid. Sistem tetap siap menggunakan Smart Heuristic Fallback.", "error");
    }
  }

  // Modals
  openCurriculumModal() {
    if (this.curriculumModal) {
      this.renderCurriculumModalContent();
      this.curriculumModal.classList.add("active");
    }
  }

  openProfileModal() {
    if (this.profileModal) {
      if (this.modalInputName) this.modalInputName.value = this.student.name;
      if (this.modalInputClass) this.modalInputClass.value = this.student.grade;
      this.profileModal.classList.add("active");
    }
  }

  closeModals() {
    if (this.curriculumModal) this.curriculumModal.classList.remove("active");
    if (this.profileModal) this.profileModal.classList.remove("active");
  }

  renderCurriculumModalContent() {
    const modalBody = document.getElementById("curriculumModalBody");
    if (!modalBody) return;

    const lvl = window.APP_DATA.curriculum.levels.find(l => l.grade.includes("VIII")) || window.APP_DATA.curriculum.levels[0];

    let html = `
      <div class="curriculum-content-list">
        <div class="curriculum-level-card is-focus-level">
          <div class="curriculum-card-header">
            <div class="curriculum-level-badge">
              <span>📜</span>
              <h4>Kelas VIII MTs (Masa Kejayaan Dinasti Abbasiyah)</h4>
            </div>
          </div>
    `;

    lvl.semesters.forEach(sem => {
      html += `
        <div class="curriculum-semester-box">
          <div class="semester-header-title">
            <span class="semester-dot"></span>
            <h5>${sem.semester}</h5>
          </div>
      `;

      if (sem.ki && sem.ki.length > 0) {
        html += `
          <div class="competency-section">
            <div class="competency-header ki-header">
              <span class="competency-icon">🎯</span>
              <span class="competency-title">Kompetensi Inti (KI)</span>
            </div>
            <div class="competency-items-grid">
        `;
        sem.ki.forEach(k => {
          const splitIdx = k.indexOf(":");
          let code = "";
          let text = k;
          if (splitIdx > 0 && splitIdx < 10) {
            code = k.substring(0, splitIdx).trim();
            text = k.substring(splitIdx + 1).trim();
          }
          html += `
            <div class="competency-item-card ki-card">
              ${code ? `<span class="competency-code-badge ki-badge">${code}</span>` : ''}
              <p class="competency-desc-text">${text}</p>
            </div>
          `;
        });
        html += `</div></div>`;
      }

      if (sem.kd && sem.kd.length > 0) {
        html += `
          <div class="competency-section" style="margin-top: 0.85rem;">
            <div class="competency-header kd-header">
              <span class="competency-icon">📚</span>
              <span class="competency-title">Kompetensi Dasar (KD)</span>
            </div>
            <div class="competency-items-grid">
        `;
        sem.kd.forEach(k => {
          const splitIdx = k.indexOf(":");
          let code = "";
          let text = k;
          if (splitIdx > 0 && splitIdx < 10) {
            code = k.substring(0, splitIdx).trim();
            text = k.substring(splitIdx + 1).trim();
          }
          html += `
            <div class="competency-item-card kd-card">
              ${code ? `<span class="competency-code-badge kd-badge">${code}</span>` : ''}
              <p class="competency-desc-text">${text}</p>
            </div>
          `;
        });
        html += `</div></div>`;
      }

      html += `</div>`;
    });

    html += `</div></div>`;
    modalBody.innerHTML = html;
  }

  // Toast Notification
  showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "🔔";
    if (type === "success") icon = "✅";
    else if (type === "error") icon = "⚠️";
    else if (type === "gold") icon = "⭐";

    toast.innerHTML = `<span style="font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Play audio from Focus Topic list on Home

  // Alur Belajar (Learning Flow) Interactive Handler
  initLearningFlow() {
    try {
      this.learningSteps = JSON.parse(localStorage.getItem("mySKI_learning_steps") || "[true, false, false, false, false]");
    } catch (e) {
      this.learningSteps = [true, false, false, false, false];
    }
    this.updateLearningFlowUI();
  }

  toggleLearningStep(stepNum) {
    if (!this.learningSteps) this.learningSteps = [true, false, false, false, false];
    const index = stepNum - 1;
    this.learningSteps[index] = !this.learningSteps[index];
    localStorage.setItem("mySKI_learning_steps", JSON.stringify(this.learningSteps));
    this.updateLearningFlowUI();

    if (this.audioManager) {
      if (this.learningSteps[index]) {
        this.audioManager.playTone(660, "sine", 0.12);
        this.showToast(`Langkah ${stepNum} ditandai selesai! ✓`, "success");
      } else {
        this.audioManager.playTone(440, "sine", 0.08);
      }
    }
  }

  updateLearningFlowUI() {
    if (!this.learningSteps) return;
    const btns = document.querySelectorAll(".learning-step-btn");
    let completedCount = 0;

    btns.forEach((btn, idx) => {
      const isDone = !!this.learningSteps[idx];
      const badge = btn.querySelector(".step-badge");
      if (isDone) {
        completedCount++;
        btn.classList.add("completed");
        if (badge) {
          badge.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        }
      } else {
        btn.classList.remove("completed");
        if (badge) {
          badge.textContent = (idx + 1).toString();
        }
      }
    });

    const fill = document.getElementById("learningProgressFill");
    if (fill && btns.length > 0) {
      const percent = Math.round((completedCount / btns.length) * 100);
      fill.style.width = `${percent}%`;
    }
  }

  playSurahAudio(surahId) {
    const list = window.APP_DATA.surahList || [];
    const found = list.find(s => s.id === surahId);
    if (found) {
      const narrationText = `${found.title}. ${found.subtitle}. Dinasti Abbasiyah mencatatkan sejarah emas kemajuan peradaban Islam di pentas dunia.`;
      window.audioManager.playHistoryNarration(narrationText, {
        title: found.title,
        subtitle: found.subtitle
      });
      this.showToast(`🏛️ Memutar Narasi: ${found.title}`, "gold");
    }
  }

  handleQuranAudioStateChange(detail) {
    const globalPlayer = document.getElementById("globalAudioPlayer");
    const gapTrackTitle = document.getElementById("gapTrackTitle");
    const gapReciterName = document.getElementById("gapReciterName");
    const gapBtnPlayPause = document.getElementById("gapBtnPlayPause");
    const gapCurrentTime = document.getElementById("gapCurrentTime");
    const gapTotalTime = document.getElementById("gapTotalTime");
    const gapProgressFill = document.getElementById("gapProgressFill");

    const btnPlayFullVerse = document.getElementById("btnPlayFullVerse");
    const playIconSpan = document.getElementById("playIconSpan");
    const playTextSpan = document.getElementById("playTextSpan");

    if (detail.event === "play" || detail.event === "trackchange") {
      if (globalPlayer) globalPlayer.style.display = "flex";
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "⏸️";

      if (detail.track) {
        if (gapTrackTitle) gapTrackTitle.textContent = detail.track.title || "Narasi Sejarah Islam";
        if (gapReciterName) {
          gapReciterName.textContent = detail.reciter ? detail.reciter.name : "Edukator Sejarah Islam";
        }
      }

      if (btnPlayFullVerse) btnPlayFullVerse.classList.add("playing");
      if (playIconSpan) playIconSpan.textContent = "⏸️";
      if (playTextSpan) playTextSpan.textContent = "Jeda Narasi";

      document.querySelectorAll(".btn-surah-play").forEach(btn => btn.classList.remove("playing"));
    } else if (detail.event === "pause") {
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "▶";
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
      if (playIconSpan) playIconSpan.textContent = "▶";
      if (playTextSpan) playTextSpan.textContent = "Lanjutkan Narasi";
    } else if (detail.event === "timeupdate") {
      const cur = detail.currentTime || 0;
      const dur = detail.duration || 0;
      if (gapCurrentTime) gapCurrentTime.textContent = this.formatTime(cur);
      if (gapTotalTime && dur > 0) gapTotalTime.textContent = this.formatTime(dur);
      if (gapProgressFill && dur > 0) {
        const pct = Math.min(100, (cur / dur) * 100);
        gapProgressFill.style.width = `${pct}%`;
      }
    } else if (detail.event === "ended" || detail.event === "stop") {
      if (gapBtnPlayPause) gapBtnPlayPause.textContent = "▶";
      if (gapProgressFill) gapProgressFill.style.width = "0%";
      if (gapCurrentTime) gapCurrentTime.textContent = "00:00";
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
      if (playIconSpan) playIconSpan.textContent = "▶";
      if (playTextSpan) playTextSpan.textContent = "Putar Narasi Sejarah";

      if (detail.event === "stop" && globalPlayer) {
        globalPlayer.style.display = "none";
      }

      document.querySelectorAll(".btn-surah-play").forEach(btn => btn.classList.remove("playing"));
    } else if (detail.event === "error") {
      this.showToast("Pemberitahuan pemutaran audio edukasi.", "warning");
      if (btnPlayFullVerse) btnPlayFullVerse.classList.remove("playing");
    }
  }


  // ==========================================================================
  // TAB 1 (VISUAL): 7 POTRET MAHAKARYA KEJAYAAN DINASTI ABBASIYAH
  // ==========================================================================
  renderVisualGallery() {
    if (!this.visualGalleryGrid) {
      this.visualGalleryGrid = document.getElementById("visualGalleryGrid");
    }
    if (!this.visualGalleryGrid) return;

    this.visualGalleryGrid.innerHTML = "";
    const items = window.APP_DATA.gallery || [];

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-item-card";
      card.innerHTML = `
        <div class="gallery-img-wrapper" onclick="window.quranApp.openLightbox(${item.id})" title="Klik untuk memperbesar gambar">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="gallery-img-overlay"></div>
          <div class="gallery-num-badge">
            <span>${item.icon}</span>
            <span>Potret #${item.id}</span>
          </div>
          <div class="gallery-zoom-badge">
            <span>🔍</span>
            <span>Perbesar</span>
          </div>
        </div>
        <div class="gallery-card-body">
          <div class="gallery-category-tag">
            <span>${item.icon}</span>
            <span>${item.category}</span>
          </div>
          <h3 class="gallery-card-title">${item.title}</h3>
          <div class="gallery-card-era">📍 ${item.era}</div>
          <p class="gallery-card-desc">${item.desc}</p>
          <div class="gallery-card-actions">
            <button type="button" class="gallery-btn-action btn-subtle" onclick="window.quranApp.openLightbox(${item.id})">
              <span>🔍</span> Detail Gambar
            </button>
            <button type="button" class="gallery-btn-action btn-primary" onclick="window.quranApp.playGalleryNarration(${item.id})" id="btnNarration-${item.id}">
              <span>🔊</span> Putar Narasi
            </button>
          </div>
        </div>
      `;
      this.visualGalleryGrid.appendChild(card);
    });
  }

  openTopicLightbox() {
    const topicImg = document.getElementById("topicIllustrationImg");
    const topicCap = document.getElementById("topicIllustrationCaption");
    if (!topicImg) return;
    const modal = document.getElementById("galleryLightboxModal");
    const img = document.getElementById("lightboxImg");
    const title = document.getElementById("lightboxTitle");
    const era = document.getElementById("lightboxEra");
    const desc = document.getElementById("lightboxDesc");
    const badge = document.getElementById("lightboxBadge");

    if (img) img.src = topicImg.src;
    if (title) title.textContent = this.getCurrentTajwidItem() ? this.getCurrentTajwidItem().title : "Ilustrasi Peradaban";
    if (era) era.textContent = topicCap ? topicCap.textContent : "";
    if (desc) desc.textContent = this.getCurrentTajwidItem() ? this.getCurrentTajwidItem().translation : "";
    if (badge) badge.textContent = "Ilustrasi Materi";

    if (modal) modal.classList.add("active");
  }

  openLightbox(id) {
    const item = (window.APP_DATA.gallery || []).find(g => g.id === id);
    if (!item) return;

    this.activeLightboxItem = item;
    const modal = document.getElementById("galleryLightboxModal");
    const img = document.getElementById("lightboxImg");
    const title = document.getElementById("lightboxTitle");
    const era = document.getElementById("lightboxEra");
    const desc = document.getElementById("lightboxDesc");
    const badge = document.getElementById("lightboxBadge");

    if (img) img.src = item.image;
    if (title) title.textContent = item.title;
    if (era) era.textContent = `📍 ${item.era} • ${item.category}`;
    if (desc) desc.textContent = item.desc;
    if (badge) badge.textContent = `Potret #${item.id} • ${item.category}`;

    if (modal) modal.classList.add("active");
    if (window.audioManager) window.audioManager.playTap();
  }

  closeLightbox() {
    const modal = document.getElementById("galleryLightboxModal");
    if (modal) modal.classList.remove("active");
  }

  playLightboxAudio() {
    if (!this.activeLightboxItem) return;
    this.playGalleryNarration(this.activeLightboxItem.id);
  }

  playGalleryNarration(id) {
    const item = (window.APP_DATA.gallery || []).find(g => g.id === id);
    if (!item) return;

    if (window.audioManager) {
      window.audioManager.playHistoryNarration(item.desc, {
        title: item.title,
        subtitle: item.era
      });
      this.showToast(`🔊 Memutar Narasi Potret #${item.id}: ${item.title}`, "gold");
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// Instantiate App
window.quranApp = new QuranApp();
