import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Hourglass,
  ListOrdered,
  Dice5,
  Coins,
  Disc3,
  Waypoints,
  Brain,
  Timer,
  Watch,
  CalendarClock,
  QrCode,
  StickyNote,
  Palette,
  Ruler,
} from "lucide-react";

import BoardGameTimer from "./BoardGameTimer";
import ScoreCounter from "./ScoreCounter";
import RandomTool from "./RandomTool";
import CoinFlip from "./CoinFlip";
import Roulette from "./Roulette";
import Ladder from "./Ladder";
import Pomodoro from "./Pomodoro";
import MultiTimer from "./MultiTimer";
import Stopwatch from "./Stopwatch";
import DDay from "./DDay";
import QrGenerator from "./QrGenerator";
import QuickMemo from "./QuickMemo";
import ColorPalette from "./ColorPalette";
import UnitConverter from "./UnitConverter";

export type ToolCategory = "board" | "timer" | "utility";

export type ToolDef = {
  id: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  category: ToolCategory;
  size?: string;
  component: ComponentType;
};

export const CATEGORIES: { id: ToolCategory; label: string; emoji: string }[] = [
  { id: "board", label: "보드게임", emoji: "🎲" },
  { id: "timer", label: "타이머 & 시간", emoji: "⏱️" },
  { id: "utility", label: "유틸리티", emoji: "🛠️" },
];

export const tools: ToolDef[] = [
  {
    id: "board-timer",
    name: "보드게임 타이머",
    desc: "5·10·30초 프리셋, 휴식 텀, 자동 반복",
    icon: Hourglass,
    category: "board",
    size: "max-w-3xl",
    component: BoardGameTimer,
  },
  {
    id: "score-counter",
    name: "점수 카운터",
    desc: "플레이어별 점수 집계 · 리더 표시",
    icon: ListOrdered,
    category: "board",
    size: "max-w-xl",
    component: ScoreCounter,
  },
  {
    id: "random",
    name: "주사위 & 랜덤",
    desc: "주사위, 랜덤 뽑기, 숫자 추첨",
    icon: Dice5,
    category: "board",
    size: "max-w-lg",
    component: RandomTool,
  },
  {
    id: "ladder",
    name: "사다리타기",
    desc: "순서·벌칙 정하기 사다리 게임",
    icon: Waypoints,
    category: "board",
    size: "max-w-2xl",
    component: Ladder,
  },
  {
    id: "roulette",
    name: "룰렛",
    desc: "돌림판으로 메뉴·순서 정하기",
    icon: Disc3,
    category: "board",
    size: "max-w-3xl",
    component: Roulette,
  },
  {
    id: "coin",
    name: "동전 던지기",
    desc: "앞/뒤 결정 · 통계 기록",
    icon: Coins,
    category: "board",
    size: "max-w-md",
    component: CoinFlip,
  },
  {
    id: "pomodoro",
    name: "뽀모도로",
    desc: "집중·휴식 사이클 타이머",
    icon: Brain,
    category: "timer",
    size: "max-w-lg",
    component: Pomodoro,
  },
  {
    id: "multi-timer",
    name: "멀티 타이머",
    desc: "여러 타이머 동시 실행",
    icon: Timer,
    category: "timer",
    size: "max-w-xl",
    component: MultiTimer,
  },
  {
    id: "stopwatch",
    name: "스톱워치",
    desc: "랩 타임 기록",
    icon: Watch,
    category: "timer",
    size: "max-w-md",
    component: Stopwatch,
  },
  {
    id: "dday",
    name: "D-day",
    desc: "기념일·마감일 카운트다운",
    icon: CalendarClock,
    category: "timer",
    size: "max-w-xl",
    component: DDay,
  },
  {
    id: "qr",
    name: "QR 코드 생성",
    desc: "URL·텍스트를 QR로 · PNG 저장",
    icon: QrCode,
    category: "utility",
    size: "max-w-2xl",
    component: QrGenerator,
  },
  {
    id: "memo",
    name: "빠른 메모",
    desc: "자동 저장 스크래치패드",
    icon: StickyNote,
    category: "utility",
    size: "max-w-2xl",
    component: QuickMemo,
  },
  {
    id: "color",
    name: "컬러 팔레트",
    desc: "팔레트 생성 · HEX 복사",
    icon: Palette,
    category: "utility",
    size: "max-w-2xl",
    component: ColorPalette,
  },
  {
    id: "converter",
    name: "단위 변환기",
    desc: "길이·무게·온도 변환",
    icon: Ruler,
    category: "utility",
    size: "max-w-xl",
    component: UnitConverter,
  },
];
