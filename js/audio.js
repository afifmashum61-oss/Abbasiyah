// ==========================================================================
// AUDIO ENGINE, WEB SPEECH API & SOUND SYNTHESIZER
// SEJARAH KEBUDAYAAN ISLAM MTs (KMA NO. 183 TAHUN 2019)
// TOPIK: MASA KEJAYAAN DINASTI ABBASIYAH
// ==========================================================================

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.arabicVoice = null;
    this.indoVoice = null;
    this.initAudioContext();
    this.initSpeechVoices();

    // Reciter / Narrator Profile
    this.reciter = {
      id: "ski_narrator",
      name: "Edukator Sejarah Islam",
      title: "Kemenag RI • Kurikulum KMA 183",
      avatar: "🏛️"
    };

    // Dedicated HTML5 Audio Player
    this.quranAudio = new Audio();
    this.quranAudio.preload = "auto";
    this.isQuranPlaying = false;
    this.currentTrack = null;
    this.playlist = [];
    this.playlistIndex = 0;
    this.repeatMode = false;
    this.narrationTimer = null;
    this.narrationElapsed = 0;
    this.narrationDuration = 0;

    this.initQuranAudioListeners();

    // Recorder state
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedAudioUrl = null;
    this.isRecording = false;
    this.animationFrameId = null;
    this.analyser = null;
    this.microphoneStream = null;
  }

  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resumeAudioContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initSpeechVoices() {
    if (!this.speechSynth) return;
    const findVoice = () => {
      const voices = this.speechSynth.getVoices();
      // Look for Indonesian voice
      this.indoVoice = voices.find(v => v.lang.startsWith('id') || v.lang === 'id-ID' || v.name.toLowerCase().includes('indonesia')) || null;
      // Look for Arabic voice
      this.arabicVoice = voices.find(v => v.lang.startsWith('ar') || v.lang === 'ar-SA' || v.name.toLowerCase().includes('arabic')) || null;
    };

    findVoice();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = findVoice;
    }
  }

  // ==========================================================================
  // HISTORICAL NARRATION & AUDIO ENGINE
  // ==========================================================================

  initQuranAudioListeners() {
    this.quranAudio.addEventListener("play", () => {
      this.isQuranPlaying = true;
      this.emitQuranAudioEvent("play");
    });

    this.quranAudio.addEventListener("pause", () => {
      this.isQuranPlaying = false;
      this.emitQuranAudioEvent("pause");
    });

    this.quranAudio.addEventListener("timeupdate", () => {
      this.emitQuranAudioEvent("timeupdate", {
        currentTime: this.quranAudio.currentTime || 0,
        duration: this.quranAudio.duration || 0
      });
    });

    this.quranAudio.addEventListener("ended", () => {
      if (this.playlistIndex + 1 < this.playlist.length) {
        this.playlistIndex++;
        this.playCurrentPlaylistTrack();
      } else if (this.repeatMode) {
        this.playlistIndex = 0;
        this.playCurrentPlaylistTrack();
      } else {
        this.isQuranPlaying = false;
        this.emitQuranAudioEvent("ended");
      }
    });

    this.quranAudio.addEventListener("error", (err) => {
      this.isQuranPlaying = false;
      this.emitQuranAudioEvent("error", { error: err });
    });
  }

  // Main narration player with floating bar sync
  playHistoryNarration(text, meta = {}) {
    if (!text) return;
    this.resumeAudioContext();
    if (this.speechSynth) this.speechSynth.cancel();
    if (this.narrationTimer) clearInterval(this.narrationTimer);

    this.currentTrack = {
      title: meta.title || "Narasi Sejarah Kebudayaan Islam",
      subtitle: meta.subtitle || "Masa Kejayaan Dinasti Abbasiyah",
      reciterName: this.reciter.name,
      text: text
    };

    this.isQuranPlaying = true;
    this.emitQuranAudioEvent("trackchange", { track: this.currentTrack });
    this.emitQuranAudioEvent("play");

    // Estimate realistic speaking duration based on word count
    const words = text.split(/\s+/).length;
    this.narrationDuration = Math.max(6, Math.round((words / 120) * 60));
    this.narrationElapsed = 0;

    this.narrationTimer = setInterval(() => {
      if (!this.isQuranPlaying) return;
      this.narrationElapsed += 0.5;
      this.emitQuranAudioEvent("timeupdate", {
        currentTime: this.narrationElapsed,
        duration: this.narrationDuration
      });

      if (this.narrationElapsed >= this.narrationDuration) {
        clearInterval(this.narrationTimer);
        this.isQuranPlaying = false;
        this.emitQuranAudioEvent("ended");
      }
    }, 500);

    // Speak using Web Speech API
    if (this.speechSynth) {
      const isArabic = /[\u0600-\u06FF]/.test(text.substring(0, 15));
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isArabic ? 'ar-SA' : 'id-ID';
      utterance.rate = isArabic ? 0.9 : 0.95;
      utterance.pitch = 1.0;

      if (isArabic && this.arabicVoice) utterance.voice = this.arabicVoice;
      else if (!isArabic && this.indoVoice) utterance.voice = this.indoVoice;

      utterance.onend = () => {
        clearInterval(this.narrationTimer);
        this.isQuranPlaying = false;
        this.emitQuranAudioEvent("ended");
      };

      utterance.onerror = () => {
        // Fallback tone on speech error
        this.playTone(520, 'sine', 0.2);
      };

      this.speechSynth.speak(utterance);
    }
  }

  // Compatibility aliases for app.js
  playQuranAyahs(ayahList, meta = {}) {
    if (meta.translation || meta.title) {
      const textToSpeak = meta.translation ? `${meta.title}. ${meta.translation}` : meta.title;
      this.playHistoryNarration(textToSpeak, meta);
    }
  }

  playQuranAyah(surah, ayah, meta = {}) {
    this.playHistoryNarration(meta.title || `Topik Sejarah Abbasiyah`, meta);
  }

  toggleQuranPlay() {
    if (!this.currentTrack) return;
    if (this.isQuranPlaying) {
      this.isQuranPlaying = false;
      if (this.speechSynth && this.speechSynth.speaking) {
        this.speechSynth.pause();
      }
      this.emitQuranAudioEvent("pause");
    } else {
      this.isQuranPlaying = true;
      if (this.speechSynth && this.speechSynth.paused) {
        this.speechSynth.resume();
      }
      this.emitQuranAudioEvent("play");
    }
  }

  stopQuranAudio() {
    this.isQuranPlaying = false;
    if (this.speechSynth) this.speechSynth.cancel();
    if (this.narrationTimer) clearInterval(this.narrationTimer);
    this.narrationElapsed = 0;
    this.currentTrack = null;
    this.emitQuranAudioEvent("stop");
  }

  seekQuranAudio(percent) {
    if (this.narrationDuration > 0) {
      this.narrationElapsed = (percent / 100) * this.narrationDuration;
      this.emitQuranAudioEvent("timeupdate", {
        currentTime: this.narrationElapsed,
        duration: this.narrationDuration
      });
    }
  }

  toggleRepeat() {
    this.repeatMode = !this.repeatMode;
    this.emitQuranAudioEvent("repeat_toggle", { repeat: this.repeatMode });
    return this.repeatMode;
  }

  emitQuranAudioEvent(eventName, extra = {}) {
    const detail = {
      event: eventName,
      isPlaying: this.isQuranPlaying,
      track: this.currentTrack,
      repeat: this.repeatMode,
      reciter: this.reciter,
      ...extra
    };
    window.dispatchEvent(new CustomEvent("quran-audio-event", { detail }));
  }

  // Speak Arabic text using Web Speech API
  speakArabic(text, rate = 0.85) {
    if (!this.speechSynth) return;
    this.resumeAudioContext();

    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      if (this.arabicVoice) {
        utterance.voice = this.arabicVoice;
      }

      this.speechSynth.speak(utterance);
    } catch (err) {
      this.playTone(440, 'sine', 0.2);
    }
  }

  // Speak Indonesian text using Web Speech API
  speakIndonesian(text, rate = 0.95) {
    if (!this.speechSynth) return;
    this.resumeAudioContext();

    try {
      this.speechSynth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      if (this.indoVoice) {
        utterance.voice = this.indoVoice;
      }

      this.speechSynth.speak(utterance);
    } catch (err) {
      this.playTone(440, 'sine', 0.2);
    }
  }

  // ==========================================================================
  // WEB AUDIO SYNTHESIZER (SOUND EFFECTS)
  // ==========================================================================

  playTone(frequency, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.audioCtx) return;
    this.resumeAudioContext();

    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

    gainNode.gain.setValueAtTime(gainValue, this.audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }

  // Success chime
  playSuccess() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  // Error buzz
  playError() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Button tap
  playTap() {
    this.playTone(800, 'sine', 0.06, 0.08);
  }

  // Metronome tick for timeline pace
  playMetronomeTick(isAccent = false) {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const now = this.audioCtx.currentTime;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = isAccent ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 750, now);

    gain.gain.setValueAtTime(isAccent ? 0.25 : 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Celebrate fanfare
  playCelebrate() {
    if (!this.audioCtx) return;
    this.resumeAudioContext();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.3, 0.15);
      }, i * 90);
    });
  }

  // Studio Rekam Suara (MediaRecorder + Waveform Visualizer)
  async startRecording(canvasElement, onDataAvailableCallback) {
    if (this.isRecording) return;
    this.audioChunks = [];
    this.resumeAudioContext();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.microphoneStream = stream;

      if (this.audioCtx) {
        const source = this.audioCtx.createMediaStreamSource(stream);
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256;
        source.connect(this.analyser);

        if (canvasElement) {
          this.drawWaveform(canvasElement);
        }
      }

      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.audioChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.recordedAudioUrl = URL.createObjectURL(audioBlob);
        if (onDataAvailableCallback) {
          onDataAvailableCallback(this.recordedAudioUrl, audioBlob);
        }
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      return true;
    } catch (err) {
      this.isRecording = true;
      if (canvasElement) {
        this.drawSimulatedWaveform(canvasElement);
      }
      return false;
    }
  }

  stopRecording() {
    if (!this.isRecording) return;
    this.isRecording = false;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach(track => track.stop());
      this.microphoneStream = null;
    }
  }

  drawWaveform(canvas) {
    if (!canvas || !this.analyser) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!this.isRecording) {
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = '#10b981';
        ctx.stroke();
        return;
      }

      this.animationFrameId = requestAnimationFrame(render);
      this.analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    render();
  }

  drawSimulatedWaveform(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      if (!this.isRecording) {
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      this.animationFrameId = requestAnimationFrame(render);
      phase += 0.15;

      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();

      const width = canvas.width;
      const height = canvas.height;

      for (let x = 0; x < width; x += 3) {
        const y = height / 2 + Math.sin(x * 0.05 + phase) * 18 * Math.sin(x * 0.02 + phase * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    render();
  }
}

// Global instantiation
window.audioManager = new AudioManager();
