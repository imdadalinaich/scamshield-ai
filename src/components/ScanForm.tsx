import React, { useState, useRef } from 'react';
import {
  ShieldAlert,
  Camera,
  Mic,
  MicOff,
  CheckSquare,
  Square,
  AlertCircle,
  Lightbulb,
  X
} from 'lucide-react';
import { ScamCategory, SupportedLanguage } from '../lib/types';
import { CallChecklistAnswers } from '../lib/scam_rules';
import { TRANSLATIONS } from '../lib/translations';

interface ScanFormProps {
  category: ScamCategory;
  inputText: string;
  setInputText: (val: string) => void;
  callAnswers: CallChecklistAnswers;
  setCallAnswers: (ans: CallChecklistAnswers) => void;
  onSubmit: () => void;
  loading: boolean;
  lang: SupportedLanguage;
}

export const ScanForm: React.FC<ScanFormProps> = ({
  category,
  inputText,
  setInputText,
  callAnswers,
  setCallAnswers,
  onSubmit,
  loading,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const catInfo = t.categories[category];

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Screenshot OCR upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setOcrError('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    setOcrLoading(true);
    setOcrError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      try {
        const res = await fetch('/api/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type
          })
        });

        const data = await res.json();
        if (data.success && data.text) {
          setInputText(data.text);
        } else {
          setOcrError(data.error || 'Could not extract text. Please paste manually.');
        }
      } catch (err) {
        console.warn('OCR error:', err);
        setOcrError('OCR request timed out. Please type or paste the message text.');
      } finally {
        setOcrLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Voice Input (Web Speech API)
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechNotice('Speech Recognition is not supported by your current browser. You can type or paste the message directly.');
      setTimeout(() => setSpeechNotice(null), 5000);
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'ur' ? 'ur-PK' : lang === 'roman' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setSpeechNotice(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(inputText ? `${inputText} ${transcript}` : transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      setIsRecording(false);
      setSpeechNotice('Could not start microphone. Please check your browser permissions.');
      setTimeout(() => setSpeechNotice(null), 5000);
    }
  };

  const handleCheckboxToggle = (key: keyof CallChecklistAnswers) => {
    setCallAnswers({
      ...callAnswers,
      [key]: !callAnswers[key]
    });
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 transition-colors">
      
      {/* Radar scanning animation line when loading */}
      {loading && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-radar" />
          <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-[1px]" />
        </div>
      )}

      {/* Header and Category Tip Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Selected Threat Domain
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {catInfo.title}
          </h3>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto">
          AI & Rule Engine Active
        </span>
      </div>

      {/* Domain Specific Tip Box */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-bold">Security Tip:</strong> {catInfo.tip}
        </p>
      </div>

      {/* Speech recognition notice if unsupported or error */}
      {speechNotice && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2">
          <span>{speechNotice}</span>
          <button onClick={() => setSpeechNotice(null)} className="text-amber-600 hover:text-amber-800">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Special Questionnaire for Phone Call Category */}
      {category === 'call' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.callChecklistTitle}</span>
            </h4>
            <span className="text-[11px] font-medium text-slate-500">
              Check all behaviors that occurred
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Q1: Demanded Credentials */}
            <div
              onClick={() => handleCheckboxToggle('demandedCredentials')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.demandedCredentials
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.demandedCredentials ? (
                  <CheckSquare className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Asked for OTP, PIN, or CVV</strong>
                <span className="text-[11px] opacity-80">Caller demanded secret authorization codes</span>
              </div>
            </div>

            {/* Q2: Remote App Installation */}
            <div
              onClick={() => handleCheckboxToggle('installRemoteApp')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.installRemoteApp
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.installRemoteApp ? (
                  <CheckSquare className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Asked to install AnyDesk/TeamViewer</strong>
                <span className="text-[11px] opacity-80">Attempted remote screen control or phone takeover</span>
              </div>
            </div>

            {/* Q3: Threatened Consequences */}
            <div
              onClick={() => handleCheckboxToggle('threatenedConsequences')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.threatenedConsequences
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.threatenedConsequences ? (
                  <CheckSquare className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Threatened immediate block or police arrest</strong>
                <span className="text-[11px] opacity-80">Fear tactics claiming legal or banking emergencies</span>
              </div>
            </div>

            {/* Q4: Demanded Fund Transfer */}
            <div
              onClick={() => handleCheckboxToggle('demandedFundTransfer')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.demandedFundTransfer
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.demandedFundTransfer ? (
                  <CheckSquare className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Asked to transfer funds to "safety account"</strong>
                <span className="text-[11px] opacity-80">Urged money movement to avoid account freeze</span>
              </div>
            </div>

            {/* Q5: Claimed Official Authority */}
            <div
              onClick={() => handleCheckboxToggle('claimedAuthority')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.claimedAuthority
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.claimedAuthority ? (
                  <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Claimed to be Bank / Army / FIA Officer</strong>
                <span className="text-[11px] opacity-80">Impersonation of state or banking entities</span>
              </div>
            </div>

            {/* Q6: Rushed Urgency */}
            <div
              onClick={() => handleCheckboxToggle('rushedUrgency')}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                callAnswers.rushedUrgency
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {callAnswers.rushedUrgency ? (
                  <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="text-xs">
                <strong className="block font-bold">Refused to let you hang up or verify</strong>
                <span className="text-[11px] opacity-80">Rushed panic tactics to prevent independent checking</span>
              </div>
            </div>

          </div>

          {/* Optional notes for call */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Additional Details or Caller Phone Number (optional):
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. Caller claimed to be calling from State Bank head office..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      ) : (
        /* Standard Text Input Form for all other 10 categories */
        <div className="space-y-3">
          <div className="relative">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, 3000))}
              placeholder={catInfo.placeholder}
              dir={lang === 'ur' ? 'rtl' : 'ltr'}
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm leading-relaxed transition-all resize-y"
            />

            <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 px-1">
              <span>{inputText.length} / 3000 characters</span>
              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => { setInputText(''); setImagePreview(null); }}
                  className="hover:text-rose-500 transition-colors cursor-pointer"
                >
                  Clear text
                </button>
              )}
            </div>
          </div>

          {/* OCR Screenshot Upload & Voice Tools */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={ocrLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>{ocrLoading ? 'Scanning Screenshot...' : t.uploadScreenshot}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleVoice}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{isRecording ? t.listening : t.voiceInput}</span>
            </button>
          </div>

          {/* Image Thumbnail Preview if uploaded */}
          {imagePreview && (
            <div className="relative inline-block mt-2 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-w-[200px]">
              <img src={imagePreview} alt="Screenshot upload" className="max-h-24 w-auto object-cover" />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {ocrError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{ocrError}</span>
            </p>
          )}

        </div>
      )}

      {/* Main Action Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || (category !== 'call' && !inputText.trim())}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>{t.checking}</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-5 h-5" />
              <span>{t.startScan}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
