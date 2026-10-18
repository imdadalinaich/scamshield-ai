# 360 ScamShield AI - Benchmark Test Report

Generated: 2026-10-18T08:41:26.894Z
Environment: Node.js / Linux (Rule Engine + Known Hash Near-Match Signals)

## 1. Executive Summary

- **Total Test Cases**: 64
- **Overall Accuracy**: **100.0%** (64 passed out of 64)
- **Precision**: **100.0%**
- **Recall (Sensitivity)**: **100.0%**
- **True Positives (Scams correctly flagged)**: 40
- **True Negatives (Genuine messages verified safe)**: 24
- **False Positives (Legitimate messages over-flagged)**: 0
- **False Negatives (Scams missed)**: 0

> **Accuracy Note**: Per user instruction and responsible AI design, 360 ScamShield AI **never claims "99.9% accuracy" or guarantees**. Real world scam variants constantly evolve, and AI-assisted guidance requires users to verify with official organizations.

---

## 2. Breakdown by Language

| Language | Total Samples | Correct | Accuracy |
| :--- | :---: | :---: | :---: |
| **Roman Urdu** | 19 | 19 | 100.0% |
| **English** | 35 | 35 | 100.0% |
| **Urdu** | 10 | 10 | 100.0% |

---

## 3. Breakdown by Scam Threat Category

| Category | Total Samples | Correct | Accuracy |
| :--- | :---: | :---: | :---: |
| **SMS** | 8 | 8 | 100.0% |
| **WHATSAPP** | 8 | 8 | 100.0% |
| **CALL** | 6 | 6 | 100.0% |
| **EMAIL** | 4 | 4 | 100.0% |
| **WEBSITE** | 6 | 6 | 100.0% |
| **JOB** | 7 | 7 | 100.0% |
| **BANK** | 6 | 6 | 100.0% |
| **PRIZE** | 5 | 5 | 100.0% |
| **SHOPPING** | 5 | 5 | 100.0% |
| **CRYPTO** | 5 | 5 | 100.0% |
| **IMPERSONATION** | 4 | 4 | 100.0% |

---

## 4. Signal Integration Analysis

The benchmark validates our multi-signal defense layer:
1. **Rule Engine**: Evaluates high-risk tokens (e.g., OTP, MPIN, unmasked mobile bank SMS, registration fee, advance payment only).
2. **Viral Scam Hash Registry**: Exact SHA-256 and word-level Jaccard similarity (>0.55) to detect variations of widespread Pakistani scams (BISP 25k, Easypaisa reversal, YouTube task scam).
3. **URL & Domain Analysis**: Identifies suspicious TLDs (.xyz, .top, .buzz, .click) and raw IP addresses without resolving or visiting the sites.
4. **Phone Call Checklist**: Assesses behavioral urgency, remote software requests (AnyDesk), and credentials harvesting.

---

## 5. False Negatives / False Positives Audit

✅ All 64 benchmark scenarios passed criteria without critical classification failures.

---

## 6. Recommendations & Model Upgrades
- Maintain regular hash updates for trending BISP / Ramadan / Eid relief scams.
- Keep strict PII redaction on all community submissions.
- Always display the mandatory guidance disclaimer below every result.
