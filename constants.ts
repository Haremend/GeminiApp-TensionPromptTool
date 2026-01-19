import { PromptSection, PresetScenario, Language, TheoryContent } from './types';

const KEYWORDS_PERSPECTIVE = {
  angle: [
    'from below', 'worm\'s eye view', 'low angle shot', 
    'from above', 'bird\'s eye view', 'high angle shot',
    'dutch angle', 'tilted frame', 'dynamic angle'
  ],
  lens: [
    'fisheye lens', 'ultra-wide angle', 'extreme foreshortening',
    'panoramic view', 'telephoto lens', 'depth of field'
  ],
  focus: [
    'focus on hand', 'focus on foot', 'focus on eyes',
    'blurred background', 'motion blur', 'foreground blur'
  ]
};

const KEYWORDS_FX = {
  energy: [
    'glowing aura', 'speed lines', 'impact frames',
    'wind effects', 'energy swirling', 'flying debris',
    'motion trails', 'distortion waves'
  ],
  light: [
    'rim lighting', 'chiaroscuro', 'cinematic lighting',
    'volumetric lighting', 'backlighting', 'harsh shadows'
  ]
};

const KEYWORDS_STYLE = [
  'anime style', 'sakuga', 'manga style', 
  'detailed lineage', 'cel shaded', 'hyper detailed'
];

export const UI_TEXT = {
  en: {
    title: "Visual Tension Architect",
    subtitle: "Sakuga-style AI Perspective Tool",
    nav: { theory: "Theory", builder: "Builder", gallery: "Gallery", favorites: "Favorites" },
    builder: {
      presetsTitle: "Load \"Tension\" Presets",
      subjectLabel: "Subject (Character/Object)",
      subjectPlaceholder: "e.g. 1boy, cyborg ninja",
      actionLabel: "Action (The Movement)",
      actionPlaceholder: "e.g. high kick, stretching arm",
      compiledLabel: "COMPILED PROMPT",
      modelLabel: "Generative Model",
      generateBtn: "GENERATE IMAGE",
      generatingBtn: "GENERATING TENSION...",
      tip: "Tip: If using SDXL locally, copy the prompt above. If using this web app, the Generate button uses Gemini."
    },
    gallery: {
      emptyTitle: "No images generated yet.",
      emptyDesc: "Use the Builder to create your first visual tension masterpiece."
    },
    favorites: {
      title: "Recommended Prompts",
      apply: "Apply to Builder"
    }
  },
  zh: {
    title: "视觉张力构建器",
    subtitle: "作画风格 AI 透视辅助工具",
    nav: { theory: "理论规范", builder: "提示词构建", gallery: "生成画廊", favorites: "收藏夹" },
    builder: {
      presetsTitle: "加载“张力”预设",
      subjectLabel: "主体 (角色/物体)",
      subjectPlaceholder: "例如：1boy, cyborg ninja (建议使用英文)",
      actionLabel: "动作 (画面动态)",
      actionPlaceholder: "例如：high kick, stretching arm",
      compiledLabel: "生成的提示词 (PROMPT)",
      modelLabel: "生成模型",
      generateBtn: "生成图像",
      generatingBtn: "张力注入中...",
      tip: "提示：生成的 Prompt 可直接复制用于 Stable Diffusion XL。本网页直接生成使用的是 Gemini 模型。"
    },
    gallery: {
      emptyTitle: "暂无生成图片",
      emptyDesc: "请使用“构建”功能制作您的第一张张力大作。"
    },
    favorites: {
      title: "推荐提示词 (收藏夹)",
      apply: "应用到构建器"
    }
  }
};

export const getTheoryContent = (lang: Language): TheoryContent[] => {
  if (lang === 'zh') {
    return [
      {
        title: "1. 视角与畸变 (Perspective & Distortion)",
        desc: "要实现“张力”，必须抛弃人眼的正常焦段（如50mm）。你需要强迫 AI 打破物理常规。",
        points: [
          { label: "短缩法 (Foreshortening)", text: "极度夸大近处物体（手/脚）的大小，同时缩小远处物体（头/身），制造强烈的空间拉伸感。" },
          { label: "鱼眼/广角 (Fisheye/Wide)", text: "弯曲直线，产生速度感或眩晕感，增强画面的冲击力。" }
        ]
      },
      {
        title: "2. 构图流向 (Composition Flow)",
        desc: "如你所述：镜头语言需要“顺着突出部分向主体延伸”。视线必须被迫移动。",
        points: [
          { label: "引导线", text: "脚 (前景占50%) -> 腿 (中景) -> 头 (远景)。" },
          { label: "景深 (Depth of Field)", text: "使用模糊来锁定视线路径，强制观众关注你想要突出的夸张部位。" }
        ]
      },
      {
        title: "3. 气场可视化 (Visualizing Aura)",
        desc: "二次元（作画）中，不可见的力量（风、压迫感、速度）需要被具象化。",
        points: [
          { label: "速度线 (Speed Lines)", text: "指示运动方向的线条。" },
          { label: "冲击帧 (Impact Frames)", text: "高对比度（黑白）闪烁，表现瞬间的爆发力。" },
          { label: "漂浮物 (Debris)", text: "反重力的碎石或尘埃，表现能量的激荡。" }
        ]
      }
    ];
  }
  return [
    {
      title: "1. Perspective & Distortion",
      desc: "To achieve \"Tension\" (張力), you must abandon realistic focal lengths. Standard 50mm lenses are flat. AI needs explicit instructions to break physics.",
      points: [
        { label: "Foreshortening", text: "Makes the closest object huge (Hand/Foot) and the furthest object tiny (Head/Body)." },
        { label: "Fisheye", text: "Bends straight lines to create a sense of speed or dizziness." }
      ]
    },
    {
      title: "2. Composition Flow",
      desc: "As you described: \"Following the protruding part to the subject\". The eye must travel.",
      points: [
        { label: "Flow", text: "Foot (Foreground 50%) -> Leg (Midground) -> Head (Background)." },
        { label: "Depth of Field", text: "Force the AI to blur irrelevant parts, locking the viewer's path." }
      ]
    },
    {
      title: "3. Visualizing \"Aura\"",
      desc: "In 2D animation (Sakuga), invisible forces (wind, pressure, speed) are drawn as lines or warping.",
      points: [
        { label: "Speed Lines", text: "Directional lines indicating fast movement." },
        { label: "Impact Frames", text: "High contrast (black/white) flashes." },
        { label: "Debris", text: "Floating rocks/dust to show gravity defiance." }
      ]
    }
  ];
};

export const getData = (lang: Language) => {
  const isZh = lang === 'zh';
  
  const PERSPECTIVE_MODIFIERS: PromptSection[] = [
    {
      id: 'camera_angle',
      name: isZh ? '运镜角度 (Camera Angle)' : 'Camera Angle',
      description: isZh ? '张力的关键。仰视/俯视创造压迫感或脆弱感。' : 'Crucial for tension. Low/High angles create dominance or vulnerability.',
      keywords: KEYWORDS_PERSPECTIVE.angle
    },
    {
      id: 'lens_distortion',
      name: isZh ? '镜头畸变 (Lens & Distortion)' : 'Lens & Distortion',
      description: isZh ? '夸张肢体和距离感。' : 'Use these to exaggerate limbs and distance.',
      keywords: KEYWORDS_PERSPECTIVE.lens
    },
    {
      id: 'focus',
      name: isZh ? '视觉焦点 (Focal Point)' : 'Focal Point',
      description: isZh ? '强行引导观众视线。' : 'Direct the viewer\'s eye aggressively.',
      keywords: KEYWORDS_PERSPECTIVE.focus
    }
  ];

  const VISUAL_FX: PromptSection[] = [
    {
      id: 'energy',
      name: isZh ? '能量与气场 (Energy & Aura)' : 'Energy & Aura',
      description: isZh ? '将“气”可视化。' : 'Visualizing the "Qi" or atmosphere.',
      keywords: KEYWORDS_FX.energy
    },
    {
      id: 'lighting',
      name: isZh ? '戏剧光影 (Dramatic Lighting)' : 'Dramatic Lighting',
      description: isZh ? '通过高对比度创造深度。' : 'Contrast creates depth and drama.',
      keywords: KEYWORDS_FX.light
    }
  ];

  const STYLES: PromptSection[] = [
    {
      id: 'art_style',
      name: isZh ? '艺术风格 (Art Style)' : 'Art Style',
      description: isZh ? '支持夸张表现的风格。' : 'Styles that support exaggeration.',
      keywords: KEYWORDS_STYLE
    }
  ];

  const PRESETS: PresetScenario[] = [
    {
      title: isZh ? "无限拉伸 (长镜头感)" : "The Infinite Stretch (Example 1)",
      description: isZh ? "一镜到底感。手臂->腋下->身体->腿部。视觉上的极度延展。" : "A one-shot long take feeling. Arm -> Body -> Leg.",
      technicalNotes: isZh ? "使用“极度短缩”和“鱼眼”扭曲解剖结构。" : "Uses 'extreme foreshortening' and 'wide angle' to distort anatomy.",
      basePrompt: "(masterpiece, best quality), anime style, 1girl, stretching exercise, arms reaching up, extreme foreshortening, fisheye lens, from below, worm's eye view, focus on hands, hands huge in foreground, body receding into distance, long legs, sweat, sportswear, gym background, speed lines, cinematic lighting, aggressive perspective"
    },
    {
      title: isZh ? "战斗姿态 (透视踢击)" : "The Combat Crouch (Example 2)",
      description: isZh ? "横向张力。脚部占据50%画面 -> 身体。强烈的近大远小。" : "Lateral tension. Foot takes up 50% of screen -> Body.",
      technicalNotes: isZh ? "依赖“焦点在脚”和“景深”制造巨大尺寸差异。" : "Relies on 'focus on foot' and 'depth of field' to create a massive size difference.",
      basePrompt: "(masterpiece, best quality), anime style, 1boy, combat stance, crouching, side view, kicking towards camera, focus on shoe sole, shoe sole massive in foreground, extreme foreshortening, depth of field, dutch angle, aggressive energy, motion blur on background, street fight, dynamic composition, rim lighting"
    }
  ];

  return { PERSPECTIVE_MODIFIERS, VISUAL_FX, STYLES, PRESETS };
};