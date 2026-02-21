import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArrowIcon from '../../Icons/ArrowIcon';

export default function LiveDemo() {
  const [currentCode, setCurrentCode] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const codeSnippets = [
    {
      title: "AI Chatbot with LangChain",
      language: "python",
      code: `from langchain import LLMChain, PromptTemplate
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory

# Initialize OpenAI LLM
llm = OpenAI(temperature=0.7)

# Create conversation memory
memory = ConversationBufferMemory()

# Define prompt template
template = """
You are an AI career assistant helping students with:
- Career path discovery
- Networking strategies  
- Interview preparation
- Resume optimization

Context: {context}
Human: {input}
AI:"""

prompt = PromptTemplate(
    input_variables=["context", "input"], 
    template=template
)

# Create conversation chain
conversation = LLMChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=True
)

# Example usage
response = conversation.predict(
    context="Student interested in AI/ML roles",
    input="How can I prepare for a machine learning engineer interview?"
)`,
      description: "Built intelligent career chatbot using LangChain with conversation memory and context-aware responses."
    },
    {
      title: "SaaS Platform Scaling",
      language: "typescript",
      code: `import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const prisma = new PrismaClient();
const redis = new Redis({ url: process.env.REDIS_URL });
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Rate limiting for API protection
  const { success } = await ratelimit.limit(req.headers['x-forwarded-for'] as string);
  
  if (!success) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  try {
    // Distributed user onboarding with Clerk
    const { userId, email } = req.body;
    
    // Create user in database with transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          id: userId,
          email,
          onboardingComplete: false,
          createdAt: new Date(),
        },
      });
      
      // Send welcome email via Twilio
      await sendWelcomeEmail(email);
      
      return newUser;
    });

    // Track analytics with PostHog
    await trackEvent('user_registered', {
      userId,
      email,
      timestamp: new Date(),
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}`,
      description: "Scaled to 100K+ users with rate limiting, distributed transactions, and real-time analytics."
    },
    {
      title: "Genomic Data Visualization",
      language: "typescript",
      code: `import React, { useMemo } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { Line, Area } from '@visx/visx';
import { GraphQLClient } from 'graphql-request';

interface GenomicData {
  gene: string;
  expression: number[];
  timepoints: number[];
  significance: number;
}

const GenomicVisualization: React.FC<{ data: GenomicData[] }> = ({ data }) => {
  const width = 800;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 40, left: 60 };

  const processedData = useMemo(() => {
    return data.map(gene => ({
      ...gene,
      normalized: gene.expression.map((val, i) => ({
        x: gene.timepoints[i],
        y: val,
        significance: gene.significance
      }))
    }));
  }, [data]);

  const xScale = scaleLinear()
    .domain([0, Math.max(...data.flatMap(d => d.timepoints))])
    .range([margin.left, width - margin.right]);

  const yScale = scaleLinear()
    .domain([0, Math.max(...data.flatMap(d => d.expression))])
    .range([height - margin.bottom, margin.top]);

  return (
    <svg width={width} height={height}>
      {processedData.map((gene, index) => {
        const color = 'hsl(' + (index * 60) + ', 70%, 50%)';
        return (
          <g key={gene.gene}>
            <Area
              data={gene.normalized}
              x={d => xScale(d.x)}
              y0={yScale(0)}
              y1={d => yScale(d.y)}
              fill={color}
              fillOpacity={0.3}
            />
            <Line
              data={gene.normalized}
              x={d => xScale(d.x)}
              y={d => yScale(d.y)}
              stroke={color}
              strokeWidth={2}
            />
          </g>
        );
      })}
    </svg>
  );
};`,
      description: "Interactive genomic data visualization with VISX, boosting researcher engagement by 400%."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
        setIsTyping(false);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSnippet = codeSnippets[currentCode];

  return (
    <div
      id="LiveDemoSection"
      className="flex flex-col bg-AAprimary w-full py-32 px-4 sm:px-16 md:px-16 lg:px-24 2xl:px-72"
    >
      {/* Section Title */}
      <div className="flex flex-row items-center space-x-4 mb-16">
        <ArrowIcon className="h-5 md:h-6 w-5 md:w-5 text-AAsecondary" />
        <span className="text-AAsecondary font-sans text-sm sm:text-xl">
          06.
        </span>
        <h2 className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl">
          Live Code Demo
        </h2>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Code Demo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-900 rounded-lg p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm">{currentSnippet.language}</span>
          </div>
          
          <div className="relative">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{currentSnippet.code}</code>
            </pre>
            {isTyping && (
              <motion.div
                className="absolute bottom-0 right-0 w-2 h-6 bg-AAsecondary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div>
            <h3 className="text-2xl font-bold text-AAsecondary mb-4">
              {currentSnippet.title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {currentSnippet.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {currentSnippet.language === 'python' && (
              <>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">LangChain</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">OpenAI</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Memory</span>
              </>
            )}
            {currentSnippet.language === 'typescript' && currentCode === 1 && (
              <>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Prisma</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">Redis</span>
              </>
            )}
            {currentSnippet.language === 'typescript' && currentCode === 2 && (
              <>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">VISX</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">D3</span>
              </>
            )}
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-AAsecondary">100K+</div>
              <div className="text-gray-400 text-sm">Users Scaled</div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-AAsecondary">99.5%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
