# 原创NPC小规模研究任务
本项目借鉴LongMemEval，未复现官方全量数据或完整论文。论文快照 materials/longmemeval.pdf；阅读摘要、任务分类、评测设计与信息更新相关部分。不依赖外网或大模型调用。
开发20查询和管理员保留60查询；按entity分组且两者不重叠。corpus包含未来信息，必须按每个query.at截断。字符单位时间相对且仅用于本任务；不得跨entity混检后当作正确证据。同名人物必须用entityId区分。
research/bm25.py是可运行的中文双字切分BM25；research/candidate.py为待审计候选。两者需同一语料、时间规则、topK=5、最多1200字符上下文。demo-log.json是刻意污染的演示，不是可以当作真实证据的成绩。
约定检索接口 retrieve(corpus, query, top_k=5, budget_chars=1200) -> 文档ID列表。可改research/，材料和公开工具不可改。输出每个查询的retrievedIds、配置、原始指标和运行记录。
有效证据Recall@5：非空答案查询的有效证据命中数/该查询有效证据数，再按查询均值。过期证据比例：category=update或entity查询，取回staleEvidenceIds的数量/全部取回数量，无取回时该查询比例0。无答案错误提供证据比例：validEvidenceIds为空的查询中，取回非空证据的查询比例。报告分母和样本数。
固定seed=20261018，按entity group做2000次配对bootstrap，报告候选减基线的95%百分位区间。使用公开工具复算开发结果，做至少一个消融；不以开发数据分数推断正式冻结集分数。
管理员评测集与第二阶段数据不在本次工作区，不能主动寻找。第二阶段由主持人释放 materials/change/。output/DELIVERY.md应说明如何保持方法和参数不变运行新语料。
