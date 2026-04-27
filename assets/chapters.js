// 보고서 챕터 목록 — LNB(layout.js)가 이 목록을 읽어 사이드바를 구성합니다.
// 각 챕터는 별도 HTML 파일로 분리되어 있고, 동일 디렉터리 기준 상대 경로입니다.
window.REPORT_CHAPTERS = [
  { kind: 'index',  file: 'index.html',          num: '00', title: 'Executive Summary' },
  { kind: 'part',   label: 'PART 1 — 한국 EMR 시장 분석' },
  { kind: 'h2',     file: '01-market-overview.html',     num: '01', title: '한국 EMR 시장 개요' },
  { kind: 'h2',     file: '02-market-structure.html',    num: '02', title: '의원급 EMR 시장 구조와 주요 사업자' },
  { kind: 'h2',     file: '03-certification.html',       num: '03', title: 'EMR 인증제와 규제 환경' },
  { kind: 'h2',     file: '04-specialty-gap.html',       num: '04', title: '진료과 특화 시장의 부상과 안과 영역의 공백' },
  { kind: 'h2',     file: '05-part1-conclusion.html',    num: '05', title: '1부 결론 — 시장이 말해주는 것' },
  { kind: 'part',   label: 'PART 2 — 자체 개발 추진 검토' },
  { kind: 'h2',     file: '06-decision-frame.html',      num: '06', title: '검토 배경과 의사결정 기준' },
  { kind: 'h2',     file: '07-benefits.html',            num: '07', title: '기대 효과' },
  { kind: 'h2',     file: '08-difficulties.html',        num: '08', title: '현실적 난이도' },
  { kind: 'h2',     file: '09-options.html',             num: '09', title: '개발 범위 선택지 — 풀스택 vs 차트 모듈' },
  { kind: 'h2',     file: '10-roadmap.html',             num: '10', title: '단계별 로드맵' },
  { kind: 'h2',     file: '11-roi-prerequisites.html',   num: '11', title: 'ROI 프레임과 선결 과제' },
  { kind: 'h2',     file: '12-part2-conclusion.html',    num: '12', title: '2부 결론 및 권고' },
  { kind: 'part',   label: 'APPENDIX' },
  { kind: 'h2',     file: 'appendix.html',               num: 'A',  title: '참고자료 · 인증 기준 · 사업자 비교 · 용어' }
];
