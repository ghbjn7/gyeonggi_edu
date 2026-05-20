import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini
  app.post("/api/report", async (req, res) => {
    try {
      const { summary } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `당신은 수원시 도시 계획, 비즈니스 상권 분석, 대중교통 최적화 전략을 연구하는 일류 빅데이터 인구 공학 전문가입니다.
제공된 인구 통계 요약 데이터를 깊이 있게 분석하고 전문가 수준의 '수원 스마트 인구 공간 진단 보고서'를 한국어로 작성해 주세요.
가독성을 극대화하기 위해 적당한 마크다운 헤더, 서블릿, 불릿, 이모티콘을 사용하여 전문적인 외형으로 정교하게 리포팅해 주십시오.`;

      const userQuery = `다음은 수원시의 실시간 필터링된 인구 분석 통계 요약 데이터입니다:
${summary}

보고서에 꼭 포함해야 할 전문 내용:
1. 요약된 데이터 분포와 최강 인구 밀집도 해석 (지리적, 성별, 연령대 기반 종합적 분석)
2. 도시 인프라 및 대중교통 조정을 위한 데이터 기반 구체적 전략 제언 (특히 수원역, 광교, 영통, 인계동 등 수원의 지역성을 고려해 주세요)
3. 해당 핵심 타겟 세그먼트를 공략하기 위한 로컬 비즈니스 소상공인 마케팅 및 단기 상권 활성화 아이디어
4. 전반적인 도시 관리/행정 개선점 가이드`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userQuery,
        config: { systemInstruction: systemPrompt }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate report" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
