const express = require('express');
const router = express.Router();
const AiResult = require('../models/AiResult');
const { summarizeContract, explainClause, draftContract } = require('../services/aiService');

router.post('/summarize', async (req, res) => {
  try {
    const summary = await summarizeContract(req.body.content);
    await AiResult.create({ type: "summary", input: req.body.content, output: summary });
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/explain', async (req, res) => {
  try {
    const explanation = await explainClause(req.body.clause);
    await AiResult.create({ type: "explanation", input: req.body.clause, output: explanation });
    res.json({ explanation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/draft', async (req, res) => {
  try {
    const draft = await draftContract(req.body.fields);
    await AiResult.create({ type: "draft", input: req.body.fields, output: draft });
    res.json({ draft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
