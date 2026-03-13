import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import {
  alpha,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const metricCards = [
  {
    label: "Sleep",
    score: 4.5,
    change: 62,
    color: "#8b5cf6",
    icon: <BedtimeRoundedIcon fontSize="small" />,
    sparkline: [32, 36, 38, 42, 45, 49, 55],
  },
  {
    label: "Stress",
    score: 5.0,
    change: 47,
    color: "#f97316",
    icon: <PsychologyRoundedIcon fontSize="small" />,
    sparkline: [28, 35, 41, 45, 46, 46, 50],
  },
  {
    label: "Nutrition",
    score: 4.4,
    change: 41,
    color: "#22c55e",
    icon: <SpaRoundedIcon fontSize="small" />,
    sparkline: [25, 27, 30, 33, 38, 40, 44],
  },
  {
    label: "Hydration",
    score: 4.6,
    change: 55,
    color: "#38bdf8",
    icon: <WaterDropRoundedIcon fontSize="small" />,
    sparkline: [18, 21, 24, 30, 35, 39, 46],
  },
  {
    label: "Digestion",
    score: 5.0,
    change: 56,
    color: "#84cc16",
    icon: <TipsAndUpdatesRoundedIcon fontSize="small" />,
    sparkline: [16, 23, 29, 35, 40, 45, 50],
  },
  {
    label: "Activity",
    score: 4.5,
    change: 56,
    color: "#fb923c",
    icon: <FitnessCenterRoundedIcon fontSize="small" />,
    sparkline: [20, 22, 26, 31, 34, 40, 45],
  },
  {
    label: "Pain/Posture",
    score: 4.8,
    change: 45,
    color: "#d946ef",
    icon: <SelfImprovementRoundedIcon fontSize="small" />,
    sparkline: [24, 25, 28, 31, 35, 41, 48],
  },
  {
    label: "Energy",
    score: 4.2,
    change: 35,
    color: "#facc15",
    icon: <BoltRoundedIcon fontSize="small" />,
    sparkline: [17, 20, 21, 24, 30, 34, 39],
  },
  {
    label: "Emotional",
    score: 5.0,
    change: 67,
    color: "#34d399",
    icon: <FavoriteRoundedIcon fontSize="small" />,
    sparkline: [15, 18, 24, 28, 35, 42, 50],
  },
];

const trendData = [
  { name: "wk1", social: 28, hydration: 32, energy: 36, sleep: 30 },
  { name: "wk2", social: 31, hydration: 35, energy: 38, sleep: 34 },
  { name: "wk3", social: 39, hydration: 41, energy: 45, sleep: 37 },
  { name: "wk4", social: 45, hydration: 48, energy: 51, sleep: 42 },
  { name: "wk5", social: 53, hydration: 58, energy: 57, sleep: 49 },
  { name: "wk6", social: 68, hydration: 71, energy: 69, sleep: 63 },
  { name: "wk7", social: 78, hydration: 74, energy: 76, sleep: 72 },
  { name: "wk8", social: 88, hydration: 82, energy: 80, sleep: 76 },
];

const wellnessBreakdown = [
  { name: "Sleep", value: 14, color: "#8b5cf6" },
  { name: "Stress", value: 10, color: "#f97316" },
  { name: "Nutrition", value: 16, color: "#22c55e" },
  { name: "Hydration", value: 12, color: "#38bdf8" },
  { name: "Digestion", value: 11, color: "#84cc16" },
  { name: "Activity", value: 13, color: "#fb923c" },
  { name: "Pain/Posture", value: 9, color: "#d946ef" },
  { name: "Energy", value: 15, color: "#facc15" },
];

const doshaData = [
  { name: "Vata", value: 30, color: "#38bdf8" },
  { name: "Pitta", value: 34, color: "#f97316" },
  { name: "Kapha", value: 36, color: "#22c55e" },
];

const suggestions = [
  {
    title: "Digestion",
    risk: "T2 - 20 flagged",
    accent: "#84cc16",
    prompts: [
      "Do you experience bloating or heaviness after meals?",
      "Do you have irregular bowel movements this week?",
    ],
  },
  {
    title: "Stress",
    risk: "T2 - 30 flagged",
    accent: "#f97316",
    prompts: [
      "How often do you feel overwhelmed during work hours?",
      "Does stress disrupt your sleep or meal timing?",
    ],
  },
  {
    title: "Pain/Posture",
    risk: "T2 - 19 flagged",
    accent: "#d946ef",
    prompts: [
      "Do you experience back or neck discomfort at your desk?",
      "Can you unwind after long sitting periods?",
    ],
  },
];

const moodScale = ["sad", "neutral", "calm", "good", "great"];

function Sparkline({ points, color }) {
  const width = 96;
  const height = 30;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box sx={{ mt: "auto" }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={path}
        />
        <circle
          cx={width}
          cy={Number(path.split(" ").at(-1)?.split(",")[1] || height / 2)}
          r="3.2"
          fill={color}
        />
      </svg>
    </Box>
  );
}

function MetricCard({ item }) {
  return (
    <Box
      sx={{
        minHeight: 128,
        p: 1.75,
        borderRadius: 3,
        border: `1px solid ${alpha(item.color, 0.4)}`,
        background: `linear-gradient(180deg, ${alpha("#0a1e13", 0.88)} 0%, ${alpha("#0c2316", 0.96)} 100%)`,
        boxShadow: `inset 0 0 0 1px ${alpha("#d9f99d", 0.04)}`,
        display: "flex",
        flexDirection: "column",
        gap: 0.65,
      }}
    >
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          bgcolor: alpha(item.color, 0.16),
          color: item.color,
        }}
      >
        {item.icon}
      </Box>
      <Typography sx={{ color: alpha("#f7fee7", 0.72), fontSize: 12 }}>
        {item.label}
      </Typography>
      <Typography sx={{ color: item.color, fontWeight: 800, fontSize: 28, lineHeight: 1 }}>
        {item.score.toFixed(1)}
      </Typography>
      <Typography sx={{ color: item.color, fontWeight: 700, fontSize: 12 }}>
        ▲ {item.change}%
      </Typography>
      <Sparkline points={item.sparkline} color={item.color} />
    </Box>
  );
}

function RingCenterLabel({ value, subtitle }) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography sx={{ color: "#f8fafc", fontWeight: 800, fontSize: 18 }}>
          {value}
        </Typography>
        <Typography sx={{ color: alpha("#d9f99d", 0.65), fontSize: 12 }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(34,197,94,0.15), transparent 28%), radial-gradient(circle at 85% 0%, rgba(250,204,21,0.12), transparent 22%), linear-gradient(180deg, #041109 0%, #07170d 100%)",
        color: "#f8fafc",
        p: { xs: 1.5, md: 2.5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: "auto",
          p: { xs: 1.5, md: 2.25 },
          borderRadius: 5,
          border: "1px solid rgba(96,165,250,0.08)",
          background:
            "linear-gradient(180deg, rgba(4,20,9,0.92) 0%, rgba(5,18,10,0.98) 100%)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(163,230,53,0.04)",
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ pb: 2.5 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 22,
                border: "2px solid #84cc16",
                borderRadius: 999,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 2,
                  left: 2,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #84cc16",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #84cc16",
                },
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 900, letterSpacing: 1.1, color: "#84cc16" }}>
                AYUMONK
              </Typography>
              <Typography sx={{ fontSize: 11, color: alpha("#f7fee7", 0.58), letterSpacing: 1.3 }}>
                WELLNESS INTELLIGENCE PLATFORM
              </Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} alignItems={{ sm: "center" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                p: 0.7,
                borderRadius: 999,
                bgcolor: "rgba(2,12,7,0.88)",
                border: "1px solid rgba(132,204,22,0.12)",
              }}
            >
              <Button
                variant="contained"
                startIcon={<SpaRoundedIcon />}
                sx={{
                  borderRadius: 999,
                  px: 2,
                  bgcolor: "#84cc16",
                  color: "#11230e",
                  fontWeight: 800,
                  boxShadow: "none",
                }}
              >
                My Wellness
              </Button>
              <Button sx={{ color: alpha("#f8fafc", 0.78), borderRadius: 999, px: 2 }}>
                Challenges
              </Button>
              <Button sx={{ color: alpha("#f8fafc", 0.78), borderRadius: 999, px: 2 }}>
                HR Analytics
              </Button>
            </Stack>
            <Typography sx={{ color: alpha("#f8fafc", 0.54), fontSize: 12 }}>
              Sun, 8 Mar, 26
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "rgba(132,204,22,0.08)" }} />

        <Typography sx={{ color: alpha("#a3e635", 0.72), fontSize: 13, py: 2.25 }}>
          Your Personal Wellness Journey - Nutrition - Lifestyle - Wellness - Dosha-aligned Ayurveda
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
              xl: "repeat(9, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          {metricCards.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 2.8fr 1.2fr" },
            gap: 1.75,
          }}
        >
          <Box
            sx={{
              p: 2.2,
              borderRadius: 4,
              border: "1px solid rgba(132,204,22,0.12)",
              bgcolor: "rgba(5, 24, 11, 0.88)",
            }}
          >
            <Typography sx={{ color: alpha("#a3e635", 0.72), fontSize: 12, mb: 2, fontWeight: 700 }}>
              WELLNESS INDEX
            </Typography>
            <Box sx={{ position: "relative", height: 210 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wellnessBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={54}
                    outerRadius={80}
                    stroke="none"
                    paddingAngle={3}
                  >
                    {wellnessBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <RingCenterLabel value="92.5" subtitle="/ 100" />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 1,
                mt: 1,
              }}
            >
              {wellnessBreakdown.map((item) => (
                <Stack key={item.name} direction="row" spacing={0.8} alignItems="center">
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: item.color }} />
                  <Typography sx={{ fontSize: 11, color: alpha("#f8fafc", 0.66) }}>
                    {item.name}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Chip
              label="▲ 43% from baseline"
              sx={{
                mt: 2.25,
                bgcolor: alpha("#22c55e", 0.14),
                color: "#4ade80",
                fontWeight: 800,
              }}
            />
          </Box>

          <Box
            sx={{
              p: 2.2,
              borderRadius: 4,
              border: "1px solid rgba(132,204,22,0.12)",
              bgcolor: "rgba(5, 24, 11, 0.88)",
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 800 }}>Wellness Trends</Typography>
                <Typography sx={{ color: alpha("#a3e635", 0.68), fontSize: 12 }}>
                  Bold line = most improved recently
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.8}>
                <Chip label="Daily" size="small" sx={{ bgcolor: "rgba(15,23,10,0.86)", color: alpha("#f8fafc", 0.52) }} />
                <Chip label="Weekly" size="small" sx={{ bgcolor: "#84cc16", color: "#10210d", fontWeight: 800 }} />
                <Chip label="Monthly" size="small" sx={{ bgcolor: "rgba(15,23,10,0.86)", color: alpha("#f8fafc", 0.52) }} />
              </Stack>
            </Stack>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "rgba(248,250,252,0.48)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a150d",
                      border: "1px solid rgba(132,204,22,0.16)",
                      borderRadius: "12px",
                      color: "#f8fafc",
                    }}
                  />
                  <Line type="monotone" dataKey="social" stroke="#f472b6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="hydration" stroke="#38bdf8" strokeWidth={2.2} dot={false} />
                  <Line type="monotone" dataKey="energy" stroke="#84cc16" strokeWidth={1.8} dot={false} />
                  <Line type="monotone" dataKey="sleep" stroke="#f59e0b" strokeWidth={1.8} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1.25 }}>
              <Chip label="Social ▲17%" sx={{ bgcolor: alpha("#f472b6", 0.14), color: "#f472b6", fontWeight: 700 }} />
              <Chip label="Hydration ▲15%" sx={{ bgcolor: alpha("#38bdf8", 0.14), color: "#38bdf8", fontWeight: 700 }} />
              <Typography sx={{ color: alpha("#f8fafc", 0.46), fontSize: 12, alignSelf: "center" }}>
                tap any KPI tile to see full detail
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              p: 2.2,
              borderRadius: 4,
              border: "1px solid rgba(132,204,22,0.12)",
              bgcolor: "rgba(5, 24, 11, 0.88)",
            }}
          >
            <Typography sx={{ fontWeight: 800, mb: 2 }}>Dosha Profile</Typography>
            <Box sx={{ position: "relative", height: 190 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={doshaData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={72}
                    stroke="none"
                  >
                    {doshaData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Stack spacing={1.1} sx={{ mt: 1 }}>
              {doshaData.map((item) => (
                <Stack key={item.name} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: item.color }} />
                    <Typography sx={{ fontSize: 13, color: alpha("#f8fafc", 0.72) }}>
                      {item.name}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontWeight: 800, color: item.color }}>
                    {item.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 2, borderColor: "rgba(132,204,22,0.08)" }} />

            <Typography sx={{ fontSize: 12, color: alpha("#a3e635", 0.68), mb: 1.25 }}>
              Today&apos;s Mood Check
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              {moodScale.map((mood, index) => (
                <Box
                  key={mood}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 16,
                    bgcolor: index === 2 ? "rgba(250,204,21,0.18)" : "rgba(248,250,252,0.06)",
                    border: "1px solid rgba(250,204,21,0.14)",
                  }}
                >
                  {["☹", "◔", "☺", "☻", "😄"][index]}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            p: 1.75,
            borderRadius: 4,
            border: "1px solid rgba(132,204,22,0.12)",
            bgcolor: "rgba(8, 29, 11, 0.88)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
            <Typography sx={{ color: "#84cc16", fontWeight: 800 }}>
              Ayumonk Lifestyle Suggestions - Focus Areas This Week
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Tier 1 - KPI risk" size="small" sx={{ bgcolor: "rgba(132,204,22,0.12)", color: "#a3e635" }} />
              <Chip label="Tier 2 - Question score" size="small" sx={{ bgcolor: "rgba(245,158,11,0.12)", color: "#fbbf24" }} />
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "repeat(3, minmax(0, 1fr))" },
              gap: 1.5,
            }}
          >
            {suggestions.map((item) => (
              <Box
                key={item.title}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  border: `1px solid ${alpha(item.accent, 0.22)}`,
                  bgcolor: alpha("#0b190d", 0.92),
                  boxShadow: `inset 3px 0 0 ${item.accent}`,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
                  <Typography sx={{ fontWeight: 800, color: item.accent }}>
                    {item.title}
                  </Typography>
                  <Chip
                    label={item.risk}
                    size="small"
                    sx={{
                      bgcolor: alpha("#f59e0b", 0.14),
                      color: "#fbbf24",
                      fontWeight: 700,
                    }}
                  />
                </Stack>
                <Stack spacing={0.9}>
                  {item.prompts.map((prompt) => (
                    <Chip
                      key={prompt}
                      label={prompt}
                      icon={<LocalFireDepartmentRoundedIcon sx={{ color: `${item.accent} !important` }} />}
                      sx={{
                        justifyContent: "flex-start",
                        maxWidth: "100%",
                        color: alpha("#f8fafc", 0.68),
                        bgcolor: alpha("#f59e0b", 0.08),
                        "& .MuiChip-label": {
                          display: "block",
                          whiteSpace: "normal",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
