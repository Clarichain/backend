const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarizeContract(content) {
  console.log("Model: gpt-3.5-turbo"); // Debug log
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarize this contract in simple terms:\n\n${content}`,
      },
    ],
  });

  return res.choices[0].message.content;
}

async function explainClause(clause) {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Explain this clause simply:\n\n${clause}`,
      },
    ],
  });

  return res.choices[0].message.content;
}

async function draftContract(inputFields) {
  const prompt = `Draft a professional contract with the following details:\n${JSON.stringify(
    inputFields,
    null,
    2
  )}`;
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}

module.exports = { summarizeContract, explainClause, draftContract };
