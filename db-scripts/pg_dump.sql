--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: service_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_notes (
    service_note_id integer NOT NULL,
    service_id integer,
    note text NOT NULL
);


ALTER TABLE public.service_notes OWNER TO postgres;

--
-- Name: service_notes_service_note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.service_notes_service_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_notes_service_note_id_seq OWNER TO postgres;

--
-- Name: service_notes_service_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_notes_service_note_id_seq OWNED BY public.service_notes.service_note_id;


--
-- Name: service_songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_songs (
    service_song_id integer NOT NULL,
    service_id integer,
    song_id integer
);


ALTER TABLE public.service_songs OWNER TO postgres;

--
-- Name: service_songs_service_song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.service_songs_service_song_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.service_songs_service_song_id_seq OWNER TO postgres;

--
-- Name: service_songs_service_song_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.service_songs_service_song_id_seq OWNED BY public.service_songs.service_song_id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    service_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    is_approved boolean DEFAULT false
);


ALTER TABLE public.services OWNER TO postgres;

--
-- Name: services_service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_service_id_seq OWNER TO postgres;

--
-- Name: services_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_service_id_seq OWNED BY public.services.service_id;


--
-- Name: song_notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song_notes (
    song_note_id integer NOT NULL,
    song_id integer,
    note text NOT NULL
);


ALTER TABLE public.song_notes OWNER TO postgres;

--
-- Name: song_notes_song_note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.song_notes_song_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.song_notes_song_note_id_seq OWNER TO postgres;

--
-- Name: song_notes_song_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.song_notes_song_note_id_seq OWNED BY public.song_notes.song_note_id;


--
-- Name: song_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.song_tags (
    song_tag_id integer NOT NULL,
    song_id integer,
    tag text NOT NULL
);


ALTER TABLE public.song_tags OWNER TO postgres;

--
-- Name: song_tags_song_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.song_tags_song_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.song_tags_song_tag_id_seq OWNER TO postgres;

--
-- Name: song_tags_song_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.song_tags_song_tag_id_seq OWNED BY public.song_tags.song_tag_id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    song_id integer NOT NULL,
    title text NOT NULL,
    url text,
    author text,
    key text,
    tempo text,
    song_select_id text,
    is_deleted boolean DEFAULT false,
    is_archived boolean DEFAULT false
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: songs_song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.songs_song_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.songs_song_id_seq OWNER TO postgres;

--
-- Name: songs_song_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.songs_song_id_seq OWNED BY public.songs.song_id;


--
-- Name: service_notes service_note_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_notes ALTER COLUMN service_note_id SET DEFAULT nextval('public.service_notes_service_note_id_seq'::regclass);


--
-- Name: service_songs service_song_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_songs ALTER COLUMN service_song_id SET DEFAULT nextval('public.service_songs_service_song_id_seq'::regclass);


--
-- Name: services service_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.services_service_id_seq'::regclass);


--
-- Name: song_notes song_note_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_notes ALTER COLUMN song_note_id SET DEFAULT nextval('public.song_notes_song_note_id_seq'::regclass);


--
-- Name: song_tags song_tag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_tags ALTER COLUMN song_tag_id SET DEFAULT nextval('public.song_tags_song_tag_id_seq'::regclass);


--
-- Name: songs song_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs ALTER COLUMN song_id SET DEFAULT nextval('public.songs_song_id_seq'::regclass);


--
-- Data for Name: service_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_notes (service_note_id, service_id, note) FROM stdin;
1	1	Communion
2	5	Vision Sunday - Making Disciples
3	5	Luke 24:44-49; Acts 1:8
4	5	Communion
5	6	1st Missionary Journey Part 1
6	6	Acts 13:13-52
7	6	Small band
8	6	cello
9	7	1st Missionary Journey Part 2
10	7	Acts 14:1-28
11	7	Big band
12	8	A watershed moment
13	8	Acts 15:1-35
14	8	Big band
15	9	Missionary principles
16	9	Acts 15:36-16:10
17	9	Communion
18	10	3 Philippian conversions
19	10	Acts 16:11-40
20	11	Thessalonica & Berea
21	11	Acts 17:1-15
22	12	Connecting with a secular world
23	12	Acts 17:16-34
24	14	Easter Sunday
25	15	Acts 18:1-18
26	15	The Gospel Comes to Corinth
27	16	Acts 18:18-28
28	16	The Body at Work
29	17	Acts 19:1-20
30	17	A Powerful Name
31	18	Acts 19:21-41
32	18	Trouble in Ephesus
33	19	Matthew 5:1-6
34	19	The Good Life Pt 1
35	20	Matthew 5:7-12
36	20	The Good Life Pt 2
37	21	Matthew 5:13-16
38	21	Salt & Light
39	22	Matthew 5:17-20
40	22	Jesus fulfils the Law
41	23	Ian to pick
42	28	Lord's Prayer
43	28	Matt 6:9-15
44	29	Treasures in heaven
45	29	Matt 6:19-24
46	30	Seek first God's kingdom
47	30	Matt 6:25-34
48	31	Judgment & hypocrisy
49	31	Matt 7:1-6
50	32	Authentic discipleship
51	32	Matthew 7:12-29
52	33	Faith, love & hope
53	33	1 Thessalonians 1:1-10
54	34	Walk worthily
55	34	1 Thessalonians 2:1-16
56	35	A hope worth having
57	35	1 Corinthians 15
58	36	Standing firm
59	36	1 Thess 2:17-3:13
60	36	Communion?
61	37	Holiness in private & public
62	37	1 Thess 4:1-12
63	38	Hope beyond the grave
64	38	1 Thess 4:13-18
65	39	Living in the Light
66	39	1 Thess 5:1-11
67	40	Comprehensive holiness
68	40	1 Thess 5:12-28
69	40	Kids club service
70	41	Return to God - his love
71	41	Malachi 1:1-5
72	41	Communion - Ian
73	42	Return to God - his honour
74	42	Malachi 1:6-2:9
75	43	Return to God - his faithfulness
76	43	Jeremiah 31:31-34
77	43	Bush service
78	44	Return to God - his faithfulness
79	44	Malachi 2:10-16
80	45	Return to God - his coming
81	45	Malachi 2:17-3:5
82	45	Communion
83	46	Return to God - he does not change
84	46	Malachi 3:6-12
85	47	Return to God - his judgement
86	47	Malachi 3:13-4:6
87	48	Evidence of faith
88	48	2 Thess 1:1-12
89	49	Believing truth, rejecting wickedness
90	49	2 Thess 2:1-17
91	49	Communion
92	50	The dangers of laziness
93	50	2 Thess 3:1-18
94	51	Advent
95	52	Advent
96	53	Advent
97	53	Surprise, surprise!
98	53	Luke 1:26-38
99	54	Ian to pick passage
100	55	Finding true blessing in 2019
101	55	Psalm 1:1-6
102	56	How long, Lord?
103	56	Psalm 13
104	57	Lord, have mercy
105	57	Psalm 51
106	57	2 songs after sermon
107	58	A Besieged Plea
108	58	Psalm 17
109	59	Vision & Mission - Making Disciples
110	59	Matthew 28:16-20
111	59	Communion
112	60	Connect
113	60	Luke 5:27-32
114	61	Grow
115	61	Colossians 1:1-14
116	62	Serve
117	62	1 Corinthians 12:1-31
118	63	The Promised King
119	63	Matthew 1:1-25
120	63	Communion
121	64	The King who Divides
122	64	Matthew 2:1-23
123	65	Preparing for the King
124	65	Matthew 3:1-17
125	66	Induction Service - Guard the Gospel
126	66	2 Timothy 1:13-2:7
127	67	The King under Temptation
128	67	Matthew 4:1-11
129	68	The King of the Light
130	68	Matthew 4:12-17
131	68	Communion
132	69	The King to Follow
133	69	Matthew 4:18-25
134	70	Good Friday
135	70	4 songs
136	71	Easter Sunday
137	72	Unstoppable despite disobedience
138	72	Haggai 1:1-15
139	73	Unstoppable despite inability
140	73	Haggai 2:1-9
141	73	Communion
142	74	Unstoppable despite uncleanness
143	74	Haggai 2:10-19
144	75	Unstoppable despite failed leadership
145	75	Haggai 2:20-23
146	76	Riches of Grace
147	76	Ephesians 1:1-14
148	77	Grace-driven prayer
149	77	Ephesians 1:15-23
150	78	Saved by Grace
151	78	Ephesians 2:1-10
152	79	United by Grace
153	79	Ephesians 2:11-22
154	80	The mystery of grace
155	80	Ephesians 3:1-13
156	81	Praying to the Gracious God
157	81	Ephesians 3:14-21
158	81	Communion
159	83	1 Samuel 17
160	83	David & Goliath
161	84	Why do you allow so much suffering in the world?
162	85	Why can't I be free to live how I want to?
163	86	How can you be loving & send people to Hell?
164	86	Communion
165	87	Can I trust the Bible?
166	88	Ephesians 4:1-16
167	88	The Healthy Body
168	89	Ephesians 4:17-32
169	89	The New You
170	90	Ephesians 6:1-4
171	90	Fatherhood
172	91	Ephesians 5:1-20
173	91	Light & Darkness
174	92	Ephesians 5:21-33
175	92	Marriage
176	93	Ephesians 6:5-9
177	93	Work
178	94	QTC Sunday
179	95	Ephesians 6:10-24
180	95	Armour of God
181	96	Genesis 1
182	96	Creation
183	97	Luke 15:1-7
184	97	Bush Service
185	97	The Lost Sheep
186	98	Genesis 2
187	98	Humanity & Marriage
188	99	Genesis 3
189	99	The Fall
190	100	Genesis 4:1-26
191	100	Cain and Abel
192	101	Genesis 6:1-8:19
193	101	Noah and the Flood
194	102	Genesis 8:20-9:28
195	102	Noah and the Flood Cont.
196	103	Genesis 10:1-11:9
197	103	Glory Theives
198	104	Genesis 11:10-12:9
199	104	Hope of Promise
200	105	Luke 1:39-56
201	105	Mary's Song
202	106	Luke 1:67-80
203	106	Zechariah's Song
204	107	Luke 2:18-40
205	107	The Angels' Song
206	107	Christmas Day Service
207	108	Luke 2:25-35
208	108	A sight for tired eyes
209	109	Jonah 1:1-16
210	109	Running from a relentless God
211	110	Jonah 1:17-2:10
212	111	Jonah 3:1-16
213	112	Jonah 4:1-11
214	113	Matthew 8:1-17
215	113	Jesus Restores
216	114	Matthew 8:18-34
217	114	Jesus Calls
218	115	Matthew 9:1-17
219	115	Jesus Forgives
220	116	Matthew 9:18-34
221	116	Jesus Reverses The Curse
\.


--
-- Data for Name: service_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_songs (service_song_id, service_id, song_id) FROM stdin;
1	1	16
2	1	26
3	1	6
4	1	151
5	1	65
6	2	28
7	2	13
8	2	66
9	2	34
10	3	1
11	3	97
12	3	29
13	3	3
14	4	30
15	4	95
16	4	15
17	4	53
18	5	13
19	5	9
20	5	3
21	5	51
22	6	101
23	6	152
24	6	52
25	6	11
26	7	153
27	7	26
28	7	61
29	7	154
30	8	1
31	8	34
32	8	25
33	8	62
34	9	25
35	9	31
36	9	151
37	9	77
38	10	16
39	10	13
40	10	27
41	10	51
42	11	30
43	11	9
44	11	48
45	11	21
46	12	95
47	12	50
48	12	27
49	12	36
50	13	18
51	13	152
52	13	50
53	13	73
54	14	34
55	14	23
56	14	5
57	14	65
58	15	13
59	15	1
60	15	9
61	15	53
62	16	26
63	16	25
64	16	63
65	16	66
66	17	30
67	17	11
68	17	48
69	17	36
70	18	16
71	18	9
72	18	35
73	18	51
74	19	153
75	19	21
76	19	50
77	19	11
78	20	13
79	20	1
80	20	27
81	20	48
82	21	34
83	21	155
84	21	19
85	21	67
86	22	28
87	22	23
88	22	151
89	22	143
90	23	34
91	23	8
92	23	54
93	23	19
94	24	25
95	24	8
96	24	152
97	24	60
98	25	16
99	25	22
100	25	71
101	25	153
102	26	26
103	26	22
104	26	123
105	26	47
106	27	8
107	27	30
108	27	12
109	27	76
110	28	55
111	28	4
112	28	12
113	28	3
114	29	25
115	29	22
116	29	27
117	29	45
118	30	36
119	30	4
120	30	63
121	30	1
122	31	13
123	31	16
124	31	12
125	31	41
126	32	17
127	32	28
128	32	49
129	32	14
130	33	30
131	33	4
132	33	23
133	33	56
134	34	13
135	34	17
136	34	45
137	34	9
138	35	25
139	35	26
140	35	66
141	35	36
142	36	17
143	36	23
144	36	67
145	36	3
146	37	4
147	37	24
148	37	27
149	37	69
150	38	8
151	38	24
152	38	1
153	38	68
154	39	28
155	39	75
156	39	50
157	39	106
158	40	16
159	40	25
160	40	62
161	40	14
162	41	26
163	41	97
164	41	29
165	41	45
166	42	1
167	42	20
168	42	29
169	42	75
170	43	1
171	43	34
172	43	144
173	43	16
174	44	8
175	44	4
176	44	22
177	44	53
178	45	24
179	45	13
180	45	27
181	45	65
182	46	17
183	46	153
184	46	12
185	46	72
186	47	30
187	47	20
188	47	10
189	47	63
190	48	25
191	48	10
192	48	35
193	48	69
194	49	10
195	49	26
196	49	9
197	49	60
198	50	13
199	50	25
200	50	12
201	50	65
202	51	8
203	51	10
204	51	37
205	51	156
206	52	17
207	52	157
208	52	53
209	52	21
210	53	157
211	53	158
212	53	159
213	53	160
214	54	30
215	54	10
216	54	46
217	54	32
218	55	16
219	55	4
220	55	50
221	55	45
222	56	1
223	56	10
224	56	37
225	56	48
226	57	25
227	57	75
228	57	15
229	57	20
230	58	34
231	58	53
232	58	155
233	58	11
234	59	28
235	59	153
236	59	19
237	59	51
238	60	26
239	60	21
240	60	22
241	60	41
242	61	1
243	61	29
244	61	27
245	61	69
246	62	24
247	62	17
248	62	71
249	62	4
250	63	45
251	63	31
252	63	36
253	63	18
254	64	30
255	64	4
256	64	46
257	64	9
258	65	16
259	65	13
260	65	58
261	65	6
262	66	26
263	66	10
264	66	66
265	66	68
266	67	25
267	67	75
268	67	37
269	67	12
270	68	55
271	68	20
272	68	27
273	68	3
274	69	153
275	69	10
276	69	48
277	69	50
278	70	18
279	70	20
280	70	77
281	70	73
282	71	34
283	71	23
284	71	10
285	71	65
286	72	17
287	72	24
288	72	29
289	72	69
290	73	25
291	73	4
292	73	22
293	74	24
294	74	1
295	74	15
296	74	46
297	75	28
298	75	26
299	75	36
300	75	49
301	76	8
302	76	13
303	76	35
304	76	42
305	77	17
306	77	5
307	77	24
308	77	63
309	78	33
310	78	9
311	78	45
312	78	6
313	79	28
314	79	25
315	79	66
316	79	87
317	80	16
318	80	39
319	80	20
320	80	56
321	81	39
322	81	33
323	81	48
324	81	12
325	82	34
326	82	24
327	82	38
328	82	68
329	83	8
330	83	53
331	83	38
332	83	39
333	84	17
334	84	1
335	84	36
336	84	63
337	85	16
338	85	75
339	85	40
340	85	27
341	86	39
342	86	68
343	86	11
344	86	40
345	87	33
346	87	10
347	87	47
348	87	24
349	88	1
350	88	37
351	88	66
352	88	38
353	89	39
354	89	17
355	89	71
356	89	20
357	90	30
358	90	8
359	90	56
360	90	29
361	91	28
362	91	4
363	91	78
364	91	27
365	92	34
366	92	39
367	92	78
368	92	38
369	93	1
370	93	24
371	93	40
372	93	45
373	94	13
374	94	36
375	94	22
376	94	77
377	95	31
378	95	39
379	95	19
380	95	150
381	96	94
382	96	10
383	96	19
384	96	74
385	97	1
386	97	34
387	97	76
388	97	22
389	98	16
390	98	39
391	98	78
392	98	11
393	99	26
394	99	30
395	99	69
396	99	3
397	100	25
398	100	33
399	100	72
400	100	35
401	101	21
402	101	75
403	101	40
404	101	29
405	102	5
406	102	17
407	102	2
408	102	65
409	103	24
410	103	4
411	103	69
412	103	36
413	104	39
414	104	8
415	104	48
416	104	47
417	105	13
418	105	34
419	105	38
420	105	160
421	106	25
422	106	9
423	106	161
424	106	21
425	107	157
426	107	162
427	107	156
428	107	160
429	108	17
430	108	31
431	108	27
432	108	58
433	109	39
434	109	53
435	109	38
436	109	1
437	110	26
438	110	4
439	110	71
440	110	29
441	111	20
442	111	37
443	111	69
444	111	22
445	112	30
446	112	8
447	112	19
448	112	66
449	113	16
450	113	24
451	113	73
452	113	35
453	114	13
454	114	11
455	114	50
456	114	6
457	115	33
458	115	26
459	115	65
460	115	40
461	116	25
462	116	10
463	116	42
464	116	38
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (service_id, date, is_approved) FROM stdin;
1	2018-01-07 00:00:00	f
2	2018-01-14 00:00:00	f
3	2018-01-21 00:00:00	f
4	2018-01-28 00:00:00	f
5	2018-02-04 00:00:00	f
6	2018-02-11 00:00:00	f
7	2018-02-18 00:00:00	f
8	2018-02-25 00:00:00	f
9	2018-03-04 00:00:00	f
10	2018-03-11 00:00:00	f
11	2018-03-18 00:00:00	f
12	2018-03-25 00:00:00	f
13	2018-03-30 00:00:00	f
14	2018-04-01 00:00:00	f
15	2018-04-08 00:00:00	f
16	2018-04-15 00:00:00	f
17	2018-04-22 00:00:00	f
18	2018-04-29 00:00:00	f
19	2018-05-06 00:00:00	f
20	2018-05-13 00:00:00	f
21	2018-05-20 00:00:00	f
22	2018-05-27 00:00:00	f
23	2018-06-03 00:00:00	f
24	2018-06-10 00:00:00	f
25	2018-06-17 00:00:00	f
26	2018-06-24 00:00:00	f
27	2018-07-01 00:00:00	f
28	2018-07-08 00:00:00	f
29	2018-07-15 00:00:00	f
30	2018-07-22 00:00:00	f
31	2018-07-29 00:00:00	f
32	2018-08-05 00:00:00	f
33	2018-08-12 00:00:00	f
34	2018-08-19 00:00:00	f
35	2018-08-26 00:00:00	f
36	2018-09-02 00:00:00	f
37	2018-09-09 00:00:00	f
38	2018-09-16 00:00:00	f
39	2018-09-23 00:00:00	f
40	2018-09-30 00:00:00	f
41	2018-10-07 00:00:00	f
42	2018-10-14 00:00:00	f
43	2018-10-21 00:00:00	f
44	2018-10-28 00:00:00	f
45	2018-11-04 00:00:00	f
46	2018-11-11 00:00:00	f
47	2018-11-18 00:00:00	f
48	2018-11-25 00:00:00	f
49	2018-12-02 00:00:00	f
50	2018-12-09 00:00:00	f
51	2018-12-16 00:00:00	f
52	2018-12-23 00:00:00	f
53	2018-12-25 00:00:00	f
54	2018-12-30 00:00:00	f
55	2019-01-06 00:00:00	f
56	2019-01-13 00:00:00	f
57	2019-01-20 00:00:00	f
58	2019-01-27 00:00:00	f
59	2019-02-03 00:00:00	f
60	2019-02-10 00:00:00	f
61	2019-02-17 00:00:00	f
62	2019-02-24 00:00:00	f
63	2019-03-03 00:00:00	f
64	2019-03-10 00:00:00	f
65	2019-03-17 00:00:00	f
66	2019-03-24 00:00:00	f
67	2019-03-31 00:00:00	f
68	2019-04-07 00:00:00	f
69	2019-04-14 00:00:00	f
70	2019-04-19 00:00:00	f
71	2019-04-21 00:00:00	f
72	2018-04-28 00:00:00	f
73	2019-05-05 00:00:00	f
74	2019-05-12 00:00:00	f
75	2018-05-19 00:00:00	f
76	2019-05-26 00:00:00	f
77	2019-06-02 00:00:00	f
78	2019-06-09 00:00:00	f
79	2019-06-16 00:00:00	f
80	2019-06-23 00:00:00	f
81	2019-06-30 00:00:00	f
82	2019-07-07 00:00:00	f
83	2019-07-14 00:00:00	f
84	2019-07-21 00:00:00	f
85	2019-07-28 00:00:00	f
86	2019-08-04 00:00:00	f
87	2019-08-11 00:00:00	f
88	2019-08-18 00:00:00	f
89	2019-08-25 00:00:00	f
90	2019-09-01 00:00:00	f
91	2019-09-08 00:00:00	f
92	2019-09-15 00:00:00	f
93	2019-09-22 00:00:00	f
94	2019-09-29 00:00:00	f
95	2019-10-06 00:00:00	f
96	2019-10-13 00:00:00	f
97	2019-10-20 00:00:00	f
98	2019-10-27 00:00:00	f
99	2019-11-03 00:00:00	f
100	2019-11-10 00:00:00	f
101	2019-11-17 00:00:00	f
102	2019-11-27 00:00:00	f
103	2019-12-01 00:00:00	f
104	2019-12-08 00:00:00	f
105	2019-12-15 00:00:00	f
106	2019-12-22 00:00:00	f
107	2019-12-25 00:00:00	f
108	2019-12-29 00:00:00	f
109	2020-01-05 00:00:00	f
110	2020-01-12 00:00:00	f
111	2020-01-19 00:00:00	f
112	2020-01-26 00:00:00	f
113	2020-02-02 00:00:00	f
114	2020-02-09 00:00:00	f
115	2020-02-16 00:00:00	f
116	2020-02-23 00:00:00	f
\.


--
-- Data for Name: song_notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.song_notes (song_note_id, song_id, note) FROM stdin;
1	13	Drop low F# and keep some high Es
2	27	Tempo 120 if driving
3	65	Song has new bridge
4	69	3rd verse key change to D
\.


--
-- Data for Name: song_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.song_tags (song_tag_id, song_id, tag) FROM stdin;
1	1	Opening Placement
2	1	End Placement
3	1	Category A
4	2	Reflective
5	2	Category A
6	3	Any Placement
7	3	Category A
8	4	Opening Placement
9	4	End Placement
10	4	Category A
11	5	Opening Placement
12	5	End Placement
13	5	Category A
14	6	Reflective
15	6	Category A
16	7	Reflective
17	7	Category A
18	8	Opening Placement
19	8	Category A
20	9	Reflective
21	9	End Placement
22	9	Category A
23	10	Any Placement
24	10	Category A
25	11	Opening Placement
26	11	End Placement
27	11	Category A
28	12	Reflective
29	12	Category A
30	13	Opening Placement
31	13	End Placement
32	13	Category A
33	14	Reflective
34	14	End Placement
35	14	Category A
36	15	Reflective
37	15	Category A
38	16	Opening Placement
39	16	End Placement
40	16	Category A
41	17	Opening Placement
42	17	Category A
43	18	Category A
44	19	Reflective
45	19	End Placement
46	19	Category A
47	20	Opening Placement
48	20	End Placement
49	20	Category A
50	21	Category A
51	22	Reflective
52	22	Category A
53	23	Any Placement
54	23	Category A
55	24	Reflective
56	24	Category A
57	25	Opening Placement
58	25	End Placement
59	25	Category A
60	26	Opening Placement
61	26	Category A
62	27	Reflective
63	27	Category A
64	28	Any Placement
65	28	Category A
66	29	Any Placement
67	29	Category A
68	30	Opening Placement
69	30	End Placement
70	30	Category A
71	31	Opening Placement
72	31	Category A
73	32	Any Placement
74	32	Category A
75	33	Opening Placement
76	33	End Placement
77	33	Category A
78	34	Opening Placement
79	34	End Placement
80	34	Category A
81	35	Opening Placement
82	35	Reflective
83	35	Category A
84	36	Reflective
85	36	Category A
86	37	Reflective
87	37	End Placement
88	37	Category A
89	38	Reflective
90	38	End Placement
91	38	Category A
92	39	Opening Placement
93	39	End Placement
94	39	Category A
95	40	Reflective
96	40	End Placement
97	40	Category A
98	41	Reflective
99	41	End Placement
100	41	Category B (Hymn)
101	42	Reflective
102	42	End Placement
103	42	Category B (Hymn)
104	43	Category B (Hymn)
105	44	Category B (Hymn)
106	45	Category B (Hymn)
107	46	Reflective
108	46	End Placement
109	46	Category B (Hymn)
110	47	Opening Placement
111	47	End Placement
112	47	Category B (Hymn)
113	48	Reflective
114	48	End Placement
115	48	Category B (Hymn)
116	49	Category B (Hymn)
117	50	Category B (Hymn)
118	51	End Placement
119	51	Category B (Hymn)
120	52	Category B (Hymn)
121	53	Opening Placement
122	53	End Placement
123	53	Category B (Hymn)
124	54	Category B (Hymn)
125	55	Category B (Hymn)
126	56	Reflective
127	56	Category B (Hymn)
128	57	Category B (Hymn)
129	58	Category B (Hymn)
130	59	Category B (Hymn)
131	60	Reflective
132	60	Category B (Hymn)
133	61	Category B (Hymn)
134	62	Any Placement
135	62	Category B (Hymn)
136	63	Category B (Hymn)
137	64	Opening Placement
138	64	Reflective
139	64	Category B (Hymn)
140	65	Category B (Hymn)
141	66	Reflective
142	66	End Placement
143	66	Category B (Hymn)
144	67	Category B (Hymn)
145	68	Opening Placement
146	68	Reflective
147	68	End Placement
148	68	Category B (Hymn)
149	69	Reflective
150	69	Category B (Hymn)
151	70	End Placement
152	70	Category B (Hymn)
153	71	Reflective
154	71	Category B (Hymn)
155	72	Reflective
156	72	End Placement
157	72	Category B (Hymn)
158	73	Reflective
159	73	Category B (Hymn)
160	74	Category B (Hymn)
161	75	Opening Placement
162	75	End Placement
163	75	Category B (Hymn)
164	76	Category B (Hymn)
165	77	Category B (Hymn)
166	78	Reflective
167	78	End Placement
168	78	Category B (Hymn)
169	79	Category A
171	79	Opening Placement
172	80	Category A
174	80	Reflective
175	81	Category A
177	81	Opening Placement
178	82	Category A
180	82	Christmas
181	83	Category A
183	83	Reflective
184	83	End Placement
185	84	Category A
187	84	Reflective
188	85	Category A
190	85	Opening Placement
191	86	Category A
193	86	Reflective
194	87	Category A
196	87	Reflective
197	87	End Placement
198	88	Category A
200	88	Any Placement
201	89	Category A
203	89	Opening Placement
204	89	Reflective
205	90	Category A
207	90	Opening Placement
208	91	Category A
210	91	End Placement
211	92	Category A
213	92	Reflective
214	92	End Placement
215	93	Category A
217	93	Reflective
218	94	Category A
220	94	Opening Placement
221	95	Category A
223	95	Opening Placement
224	96	Category A
226	96	End Placement
227	97	Category A
229	97	Opening Placement
230	97	End Placement
231	98	Category A
233	98	Reflective
234	99	Category A
236	99	Christmas
237	99	Kids
238	100	Category A
240	100	Reflective
241	101	Category A
243	101	Opening Placement
244	101	End Placement
245	102	Category A
247	102	Reflective
248	103	Category A
250	103	Reflective
251	103	End Placement
252	104	Category A
254	104	Opening Placement
255	105	Category A
257	105	Reflective
258	105	End Placement
259	106	Category A
261	106	End Placement
262	107	Category A
264	107	Reflective
265	107	End Placement
266	108	Category A
268	108	Reflective
269	108	End Placement
270	109	Category A
272	109	Opening Placement
273	109	End Placement
274	110	Category A
276	110	Reflective
277	110	End Placement
278	112	Category B (Hymn)
280	120	Category B (Hymn)
282	120	Opening Placement
283	120	End Placement
289	156	Christmas
290	156	Carol
291	157	Christmas
292	157	Carol
293	158	Christmas
294	158	Carol
295	159	Christmas
296	159	Carol
297	160	Christmas
298	160	Carol
299	161	Christmas
300	161	Carol
301	162	Christmas
302	162	Carol
303	162	Kids
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (song_id, title, url, author, key, tempo, song_select_id, is_deleted, is_archived) FROM stdin;
41	Amazing Grace	\N	John Newton	G	\N	\N	f	f
79	10,000 Reasons	https://www.youtube.com/watch?v=DXDGE_lRI0E	Matt Redman	E	\N	6016351	f	t
80	Amazing Grace (My Chains Are Gone)	http://www.youtube.com/watch?v=Jbe7OruLk8I	Chris Tomlin, John Newton, Louie Giglio	D	\N	\N	f	t
81	Blessed Be Your Name	http://www.youtube.com/watch?v=7Qp11X6LKYY	Matt & Beth Redman	A	\N	3798438	f	t
82	Christmas Carol	http://store.emumusic.com.au/index.php?page=shop.product_details&flypage=flypage.tpl&product_id=273&category_id=2&option=com_virtuemart&Itemid=1&vmcchk=1&Itemid=1	Rob Smith	Eb	\N	\N	f	t
83	Completely Done	http://www.youtube.com/watch?v=cwoqzVXwUjs	J Baird, R Baird, R Gunderlock	A	\N	\N	f	t
84	Cornerstone	https://www.youtube.com/watch?v=QvLxZEU02uI	J Myrin, R Morgan, E Lijero, W Bradbury	D	\N	\N	f	t
85	Everlasting God	http://www.youtube.com/watch?v=PGPTK24hQxc	Ken Riley, Brenton Brown	Bb	\N	\N	f	t
86	From Heaven You Came (The Servant King)	http://www.youtube.com/watch?v=iQ2uGr6r4BQ	Graham Kendrick	Cm	\N	\N	f	t
88	Great Are You Lord	https://www.youtube.com/watch?v=Tf4ChlYjiQM	Jeremy Riddle	F	\N	6460220	f	t
89	Here I Am To Worship	http://www.youtube.com/watch?v=86v2ZEsEKW8	Tim Hughes	E	\N	\N	f	t
90	How Great Is Our God	https://www.youtube.com/watch?v=cKLQ1td3MbE	Chris Tomlin	A	\N	4348399	f	t
91	I Am Not Ashamed	https://www.youtube.com/watch?v=tiPgFWoXY_s	Michael Morrow	E/C#m	\N	\N	f	t
92	I Come By The Blood	http://www.youtube.com/watch?v=qIHW5POUT4M	Cook, Steve & Vikki	G	\N	\N	f	t
93	Immanuel	http://www.youtube.com/watch?v=80n62xs981s	Stuart Townend	D	\N	\N	f	t
94	Indescribable	https://www.youtube.com/watch?v=5IlVfkY5q54	Laura Story, Jesse Reeve	Eb	\N	4403076	f	t
95	Jesus!	https://www.youtube.com/watch?v=5s75VfUe6lg	Citizens	F	\N	Lyrics only	f	t
96	Let Your Kingdom Come	http://www.youtube.com/watch?v=zkKCb6Bmi6o	Sovereign Grace, Bob Kauflin	G	\N	4804046	f	t
97	Made Alive	https://www.youtube.com/watch?v=9dhh6F38kDE	Brian Eichelberger, Zach Bolen	E	\N	6534390	f	t
98	May The Words Of My Mouth	http://www.youtube.com/watch?v=B3slST5bM0Y	Tim Hughes, Rob Hill	Bb	\N	\N	f	t
99	O Come And See	http://store.emumusic.com.au/index.php?page=shop.product_details&flypage=flypage.tpl&product_id=241&category_id=2&option=com_virtuemart&Itemid=15	Nicky Chiswell	A	\N	\N	f	t
100	Perfect Lamb Of God	http://www.sovereigngracestore.com/ProductInfo.aspx?productid=M4130-10-51	Adam Sacks	Am	\N	\N	f	t
101	Rejoice!	https://www.youtube.com/watch?v=_7Qy1iXZU2g	Dustin Kensrue	G	\N	\N	f	t
102	Rejoice With Trembling	\N	Matt Redman	Gm/F	\N	\N	f	t
103	Sweetly Broken	http://www.youtube.com/watch?v=O5_Z3ZZYLDc	J Riddle	A	\N	\N	f	t
104	The Father's Love	https://www.youtube.com/watch?v=nMC0zY21v2U	Joel Sczebel	G	\N	5604537	f	t
105	The Wonder Of The Cross	http://www.youtube.com/watch?v=ZLSwigbVW6g	Vicky Beeching	Ab	\N	\N	f	t
106	We Belong To The Day	http://store.emumusic.com.au/index.php?page=shop.product_details&flypage=flypage.tpl&product_id=424&category_id=2&option=com_virtuemart&Itemid=15	Michael Morrow	C#m	\N	\N	f	t
107	Worthy Is The Lamb	https://www.youtube.com/watch?v=0ukKlS4EBzI	Darlene Zschech	A	\N	\N	f	t
9	Crown Him	https://www.youtube.com/watch?v=HFq96fWBnrs	I am They	A	\N	\N	f	f
8	Counting Every Blessing	https://www.youtube.com/watch?v=s_zwYprUFg0	Rend Collective	E	90	7101176	f	f
10	Death Was Arrested	https://www.youtube.com/watch?v=AwgWbIOt0ko	North Point InsideOut	G	\N	7046448	f	f
11	Even So Come	https://www.youtube.com/watch?v=fBHcvJhc6Pk	Passion, Chris Tomlin	E	\N	7036288	f	f
12	Forgiven	https://www.youtube.com/watch?v=9d4m9f4Saps	Sovereign Grace	D	\N	7096634	f	f
13	From The Day	https://www.youtube.com/watch?v=TUjuRFwwvaw	I am They	A	\N	"7023274\r"	f	f
14	Have It All	https://www.youtube.com/watch?v=Ni1gysspGns	Bethel, Jeremy Riddle	E	\N	7054173	f	f
15	Have Mercy On Me	https://www.youtube.com/watch?v=kbs9wOOkwpM	Sovereign Grace, Sczebel & Bischof	A	\N	6167705	f	f
16	Home	https://www.youtube.com/watch?v=vCRi0W1oZKw&list=PLxFcIkOfqpFzOuGFJM51qbak2bGGm3-he&index=1&nohtml5=False	CityAlight	E	115	7007948	f	f
17	Joy Of The Lord	https://www.youtube.com/watch?v=x3gLeCiMJqI	Rend Collective	A	99	7047091	f	f
18	Man Of Sorrows	https://www.youtube.com/watch?v=C6jXqdtZi10	Hillsong	C	\N	6476063	f	f
19	Mercy	https://www.youtube.com/watch?v=RUQv1mHxc_0	Matt Redman	Bb	\N	7000689	f	f
20	Nailed To The Cross	https://www.youtube.com/watch?v=GFLk6v7US3I	Rend Collective	E	\N	7101180	f	f
21	No Other Name	https://www.youtube.com/watch?v=Ax9r00ovr5g	Trevor Hodge	Bb	\N	5737284	f	f
22	O Come To The Altar	https://www.youtube.com/watch?v=rYQ5yXCc_CA	Elevation worship	E	\N	7051511	f	f
23	O Praise The Name	https://www.youtube.com/watch?v=LqBpifDpNKc	Hillsong	A	\N	7037787	f	f
24	Only A Holy God	https://www.youtube.com/watch?v=7HSdeeCm8_g	CityAlight	D	\N	7073332	f	f
25	Rescuer	https://www.youtube.com/watch?v=sAg7rn7fH3Q&feature=youtu.be	Rend Collective	D	\N	7094920	f	f
26	Saved My Soul	https://www.youtube.com/watch?v=eOh4CLApJe8	CityAlight	A	\N	7073333	f	f
31	The Saving One	http://youtu.be/hx_ybBLrRNg	Starfield	B	\N	5673991	f	f
156	Hark The Herald Angels Sing	\N	Charles Wesley	\N	\N	\N	f	f
157	O Come All Ye Faithful	\N	John Francis Wade	\N	\N	\N	f	f
158	Mary's Boy Child	\N	Boney M.	\N	\N	\N	f	f
159	Silent Night	\N	Franz Xaver Gruber.	\N	\N	\N	f	f
51	Facing A Task Unfinished	https://www.youtube.com/watch?v=zOpt_bulJxY	Keith & Kristyn Getty	C	\N	7002026	f	f
52	God Has Spoken By His Prophets	http://www.youtube.com/watch?v=dA9c4EbNu6o	G.W. Briggs, Beethoven	G	\N	\N	f	f
108	You Are My King	http://www.youtube.com/watch?v=hNousF-YMHo	Billy James Foote	D	\N	\N	f	t
53	Great Is Thy Faithfulness	http://www.youtube.com/watch?v=0k1WhFtVp0o	Thomas O. Chisholm	C	97	\N	f	f
54	Here Is Love	https://www.youtube.com/watch?v=RRXFRRxFlyI	Robert S. Lowry	G	\N	526631	f	f
64	Jerusalem	https://www.youtube.com/watch?v=wX4ZCHRksBA&index=3&list=RDWpArxl4czE8	CityAlight	B	\N	7003218	f	f
65	Jesus Paid It All	https://www.youtube.com/watch?v=j_jAbHkGJRE	John Thomas Grape, Alex Nifong	Bb	\N	4689508	f	f
66	King Of Love	https://www.youtube.com/watch?v=Zs8sjuS0YzA	Emu Youth	C	\N	7081709	f	f
67	May The Mind Of Christ My Saviour	https://www.youtube.com/watch?v=dRTLocMzTvs	K. Wilkinson, A. C. Gould	D	\N	\N	f	f
68	My Hope Is Built	http://www.youtube.com/watch?v=z6tFzOYFZ30	E. Mote, W. Bradbury	F	\N	25417	f	f
69	O Great God	https://www.youtube.com/watch?v=mZut2iA57y8	Sovereign Grace, Bob Kauflin	C	\N	\N	f	f
70	Rock Of Ages	http://www.youtube.com/watch?v=gM7gt_cSxjw	Augustus M. Toplady, Thomas Hastings	A	\N	\N	f	f
71	Speak O Lord	https://www.youtube.com/watch?v=my90e3a_nlM	Townend, Getty	C	\N	4615235	f	f
150	Solid Rock	https://www.youtube.com/watch?v=dGG-s1dmkkw	\N	\N	\N	\N	f	f
109	You Have Won Me	https://www.youtube.com/watch?v=3dX2baT9Ku4	Bethel Music	G	\N	\N	f	t
110	Your Love, O Lord	http://www.youtube.com/watch?v=ZTXP3bSnad0	Powell, Mac and Third Day	D	\N	\N	f	t
112	A Wonderful Saviour Is Jesus My Lord	http://www.youtube.com/watch?v=8VtZjZOpIgU&feature=related	Fanny J. Crosby, William J. Kirkpatrick	C	\N	\N	f	t
120	How Great Thou Art	http://www.youtube.com/watch?v=2Q8ESzK5pCw	Stuart K. Hine	Bb	\N	\N	f	t
27	Shine Into Our Night	https://www.youtube.com/watch?v=mU2FLhNGpjI	Sovereign Grace	E	106	6167688	f	f
28	The Chorus Of The Saved	https://www.youtube.com/watch?v=CYyqRdvLewk	Trevor Hodge	B	\N	\N	f	f
29	The Lord Is My Salvation	https://www.youtube.com/watch?v=NjOGX5zT8KU	Keith & Kristyn Getty	Bb	\N	7063694	f	f
30	The Love Of The Father	https://www.youtube.com/watch?v=QVA5s0w17I8&feature=youtu.be&app=desktop	CityAlight	A	\N	6635756	f	f
32	This I Believe	https://www.youtube.com/watch?v=FtUNQpu2b7Q	Hillsong	G	\N	7018338	f	f
33	This Is Amazing Grace	https://www.youtube.com/watch?v=0iFEOB8Coes	Phil Wickham	E	\N	6333821	f	f
34	Victory	https://www.youtube.com/watch?v=wVo9j_KDmWU	Hillsong College	D	\N	7023460	f	f
35	Washed By The Blood	https://www.youtube.com/watch?v=JCb0OMzAmmM&list=RDWpArxl4czE8&index=4	CityAlight	A	\N	7007945	f	f
36	What A Beautiful Name	https://www.youtube.com/watch?v=nQWFzMvCfLE	Hillsong	D	72	7068424	f	f
37	What Blessed Assurance	https://www.youtube.com/watch?v=LIHwnj8Bbvw	CityAlight	G	\N	7073328	f	f
38	Yet Not I But Through Christ In Me	https://www.youtube.com/watch?v=hwc2d1Xt8gM	CityAlight	D	75	7121852	f	f
39	God Is For Us	https://www.youtube.com/watch?v=xxl1EOhJiRA&frags=pl%2Cwn	CityAlight	C	105	7121853	f	f
40	Clean	https://www.youtube.com/watch?v=pkjyuEUvNOo	Hillsong United	C	70	7125215	f	f
42	And Can It Be	https://www.youtube.com/watch?v=sQeIGbKqiw8	Charles Wesley	F	\N	\N	f	f
43	At The Name Of Jesus	http://www.youtube.com/watch?v=r4d4UXSJXig	Brierley	C	\N	\N	f	f
44	At This Table We Remember	https://www.youtube.com/watch?v=Sj5y-4Ed2Xc	Kevin Mayhew, Martin E. Leckebusch	F	\N	\N	f	f
45	Be Thou My Vision	http://www.youtube.com/watch?v=IQxHvBtR7hs	Eleanor Henrietta Hull, Mary Elizabeth Byrne	Eb	\N	30639	f	f
46	Before The Throne Of God Above	http://www.youtube.com/watch?v=GAwnheLra90&feature=fvst	Sovereign Grace	D	\N	2306412	f	f
47	Blessed Assurance	http://www.youtube.com/watch?v=_5E1gWdW3P8&feature=fvst	Fanny J. Crosby	D	\N	\N	f	f
48	Christ Is Mine Forevermore	https://www.youtube.com/watch?v=roQovDZeAWE	CityAlight	Bb	\N	7036096	f	f
49	Crown Him With Many Crowns	http://www.youtube.com/watch?v=qdK4lzg8gsU	George Elvey	D	\N	\N	f	f
50	Crowns	https://www.youtube.com/watch?v=8fyPQsizgmk	Hillsong	E	\N	7068421	f	f
55	Holy, Holy, Holy!	http://www.youtube.com/watch?v=6iK0Miq2xNo	Reginald Heber	D	\N	1156	f	f
111	A Mighty Fortress Is Our God	http://www.youtube.com/watch?v=-Y-_TsRjm5Y&feature=related	Martin Luther	C	\N	\N	f	f
113	Arise My Soul, Arise	http://www.youtube.com/watch?v=WCZxTNXWnLc	Charles Wesley	G	\N	\N	f	f
114	Christ The Lord Is Risen Today	http://www.youtube.com/watch?v=kMhp8Aqjjgs	Charles Wesley	C	\N	\N	f	f
115	Come Thou Almighty King	http://www.youtube.com/watch?v=CGRBe44AczY	Felice de Giardini	F	\N	\N	f	f
116	Come Thou Fount Of Every Blessing	http://www.youtube.com/watch?v=spjkgMpVDWQ	Robert Robinson, Ashael Nettleton	D	\N	\N	f	f
117	Come Thou Long Expected Jesus	https://www.youtube.com/watch?v=vRAFQCOkjgE	Charles Wesley, Mark E. Hunt	F	\N	\N	f	f
118	God My King, Thy Might Confessing	http://www.youtube.com/watch?v=h6WuCvBqlbs	Richard Mant, Stuttgart	F	\N	\N	f	f
119	God All Nature Sings Thy Glory	http://www.youtube.com/watch?v=r8bN8QMeXbg	David Clowney, Ludwig van Beethoven	G	\N	\N	f	f
121	How Sweet The Name Of Jesus Sounds	http://www.youtube.com/watch?v=NoPlwPUYWaw	John Newton,  Alexander R. Reinagle	D	\N	\N	f	f
56	How Deep The Father's Love	http://www.youtube.com/watch?v=YV2zMZ-nZ7k	Stuart Townend	E	\N	1558110	f	f
57	How Firm A Foundation	http://www.youtube.com/watch?v=o6YH2f7UAew	Anonymous	G	\N	\N	f	f
58	I Cannot Tell	https://www.youtube.com/watch?v=62wk5KvI7-w	Traditional (Londonderry Air tune)	C	\N	\N	f	f
59	I Heard The Voice Of Jesus Say	http://www.youtube.com/watch?v=7RGgS4kyGWI	Horatius Bonar	G/Em	\N	\N	f	f
60	I Surrender All	https://www.youtube.com/watch?v=XR32kHGbrkE	Winfield Scott Weeden	D	\N	\N	f	f
61	I Will Sing The Wondrous Story	https://www.youtube.com/watch?v=zs4nXPOR52w	Pritchard Rawley	F	\N	2328610	f	f
62	In Christ Alone	http://www.youtube.com/watch?v=qLy8ksqGf9w	Keith Getty, Stuart Townend	D	\N	\N	f	f
63	It Is Well With My Soul	https://www.youtube.com/watch?v=AHe_qmo3gX4	Horatio G. Spafford	C	110	25376	f	f
72	Take My Life And Let It Be	http://www.youtube.com/watch?v=HU9Pi4g_3No	Frances R. Havergal, Henri A. Cesar Malan	Eb	\N	\N	f	f
73	The Power Of The Cross	http://www.youtube.com/watch?v=ubGCISQQ7Zo	Keith Getty, Stuart Townend	C	\N	4490766	f	f
74	This Is My Father's World	http://www.youtube.com/watch?v=byIpfEVxhs4	M D Babcock, F L Sheppard, E S  Barnes	D	\N	\N	f	f
75	To God Be The Glory	http://www.youtube.com/watch?v=2CeBoSQsBR0	F. Crosby, W. Doane	G	110	23426	f	f
76	What A Friend We Have In Jesus	https://www.youtube.com/watch?v=7Pv1dUNJVJ4	Joseph Scriven	F	\N	\N	f	f
77	When I Survey The Wondrous Cross	https://www.youtube.com/watch?v=4_fvFfPqjO4	Isaac Watts, E. Miller	D	\N	721333	f	f
78	O Lord My Rock And My Redeemer	https://www.youtube.com/watch?v=TpELMk4-3n8	Sovereign Grace	D	\N	7096627	f	f
122	I Greet Thee, Who My Sure Redeemer Art	http://www.youtube.com/watch?v=_7sn1pKVBNo	Toulon Traditional	F	\N	\N	f	f
123	I Know Whom I Have Believed	http://www.youtube.com/watch?v=D-7TXP7fVhk	Daniel W. Whittle	D	\N	\N	f	f
124	Immortal Invisible	http://www.youtube.com/watch?v=-I_VwA4d44g	W. Smith	G	\N	\N	f	f
125	Jesus! What A Friend For Sinners!	http://www.youtube.com/watch?v=xd49fPultMU	 R. Pritchard, J. Chapman	F	\N	\N	f	f
126	Jesus, Keep Me Near The Cross	http://www.youtube.com/watch?v=kn4n1CXTsQk	Fanny Crosby, William H. Doane	F	\N	\N	f	f
127	Let Us Love And Sing And Wonder	http://www.youtube.com/watch?v=qSPm5_bOeHI	John Newton, Darmstadt Gesangbuch	Bb	\N	\N	f	f
128	Lord, Speak To Me	\N	Frances R. Havergal, Austen McLennan	Dm/F	\N	\N	f	f
129	Love Divine	https://www.youtube.com/watch?v=C53U3YFBaLY	Charles Wesley	G	\N	\N	f	f
130	Man Of Sorrows	http://www.youtube.com/watch?v=OVpR5ltUodg	Phillip Bliss	C	\N	\N	f	f
131	My Faith Has Found A Resting Place	http://www.youtube.com/watch?v=LAVPXScshwQ	Lidie H. Edmunds	G	\N	\N	f	f
132	My Faith Looks Up To Thee	http://www.youtube.com/watch?v=JuP_yeI9Fis	Ray Palmer	D	\N	\N	f	f
133	My Jesus, I Love Thee	http://www.youtube.com/watch?v=EYfBZnMve_E	William R. Featherstone, Adoniram J. Gordon	F	\N	27817	f	f
134	O Come My Soul, Bless Thou The Lord Thy Maker	http://www.youtube.com/watch?v=IVFJtA0rkU0	James Walch	Bb	\N	\N	f	f
135	O For A Thousand (Lyngham)	http://www.youtube.com/watch?v=LezdsDAr0-E	 Charles Wesley, Thomas Jarman	E	\N	\N	f	f
136	O Sacred Head Sore Wounded	http://www.youtube.com/watch?v=wRvMx8uWaX4	H. Hassler, J. S. Bach	Am	\N	\N	f	f
137	O Worship The King	http://www.youtube.com/watch?v=ccnWQs4N2xg	Robert Grant, Haydn	G	\N	\N	f	f
138	One There Is Above All Others	\N	John Newton	G	\N	\N	f	f
139	Praise To The Lord	http://www.youtube.com/watch?v=JEh7Vt9sxmc	S. Gesangbuch, J. Neander, C. Winkworth, Others	G	\N	\N	f	f
140	Praise, My Soul, The King Of Heaven	http://www.youtube.com/watch?v=GyRIVbdsi4c	Henry F Lyte, John Goss	D	\N	\N	f	f
141	Rejoice The Lord Is King	http://www.youtube.com/watch?v=2N0iVysrykU	Charles Wesley, John Darwall	C	\N	36592	f	f
142	Tell Out, My Soul	http://www.youtube.com/watch?v=qf3mgRUZkAk	Timothy Dudley-Smith, Walter Greatorex	D	\N	\N	f	f
87	Grace Alone	https://www.youtube.com/watch?v=kKTN5yVtgIE	Dustin Kensrue	D	\N	\N	f	t
143	The Church's One Foundation	https://www.youtube.com/watch?v=jotNbcFelX4&frags=pl%2Cwn	Samuel J. Stone, Samuel S. Wesley	D	\N	\N	f	f
144	The Lord's My Shepherd	http://www.youtube.com/watch?v=HndQZlmJPpc	Francis Rous, William Mure, Others	F	\N	\N	f	f
145	Thine Be The Glory	http://www.youtube.com/watch?v=RbBOOmkMLmI	Edmond Budry	D	\N	\N	f	f
146	We Come, O Christ To You	http://songsandhymns.org/player/?hymn=we-come-o-christ-to-you	E. Margaret Clarkson	C	\N	\N	f	f
147	Here Is Love	https://www.youtube.com/watch?v=v8YOPj5TnUM	\N	\N	\N	\N	f	f
148	The Old Rugged Cross	https://www.youtube.com/watch?v=rOmipqhQBOM	\N	\N	\N	\N	f	f
149	Guide Me O Thou Great Jehovah	https://www.youtube.com/watch?v=wT4n1hGjDDg&list=RDwT4n1hGjDDg	\N	\N	\N	\N	f	f
160	Joy To The World	\N	George Frideric Handel	\N	\N	\N	f	f
161	O Little Town of Bethlehem	\N	Phillips Brooks, Lewis Henry Redner	F	\N	\N	f	f
162	Jesus Saves	\N	Colin Buchanan	E	\N	\N	f	f
151	Love Came Down	\N	\N	\N	\N	\N	t	f
152	At The Cross	\N	\N	\N	\N	\N	t	f
153	The Way	\N	\N	\N	\N	\N	t	f
154	The Lion And The Lamb	\N	\N	\N	\N	\N	t	f
155	Ever Be	\N	\N	\N	\N	\N	t	f
1	All My Ways Are Known To You	https://www.youtube.com/watch?v=44mVzqGeS-Q	CityAlight	Bb	100	7073327	f	f
2	Almighty	https://www.youtube.com/watch?v=-wsCtmaM1_8	Chris Tomlin	G	\N	7016412	f	f
3	Boldly I Approach	https://www.youtube.com/watch?v=4QDnVD7gu5Y	Rend Collective	G	\N	7014655	f	f
4	Build Your Kingdom Here	https://www.youtube.com/watch?v=sbdJXKqVgtg&index=3&list=PLZMnj0r2P0r3UmI7fjbdzeHx2rjIiDtLV	Rend Collective	C	\N	6186078	f	f
5	Christ Is Risen	https://www.youtube.com/watch?v=48iIZsSWYpg	Tenth Avenue North	E	\N	5242683	f	f
6	Come As You Are	https://www.youtube.com/watch?v=yjgioXrnEME	Crowder	A	\N	7017790	f	f
7	Come Now And Pray	https://www.youtube.com/watch?v=RlYVZUpam8c	Greg Cooper, Nicky Chiswell	Eb	\N	\N	f	f
\.


--
-- Name: service_notes_service_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_notes_service_note_id_seq', 221, true);


--
-- Name: service_songs_service_song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.service_songs_service_song_id_seq', 464, true);


--
-- Name: services_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_service_id_seq', 116, true);


--
-- Name: song_notes_song_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.song_notes_song_note_id_seq', 4, true);


--
-- Name: song_tags_song_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.song_tags_song_tag_id_seq', 303, true);


--
-- Name: songs_song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs_song_id_seq', 162, true);


--
-- Name: service_notes service_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_notes
    ADD CONSTRAINT service_notes_pkey PRIMARY KEY (service_note_id);


--
-- Name: service_songs service_songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_songs
    ADD CONSTRAINT service_songs_pkey PRIMARY KEY (service_song_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: song_notes song_notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_notes
    ADD CONSTRAINT song_notes_pkey PRIMARY KEY (song_note_id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (song_id);


--
-- Name: service_notes service_notes_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_notes
    ADD CONSTRAINT service_notes_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON DELETE CASCADE;


--
-- Name: service_songs service_songs_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_songs
    ADD CONSTRAINT service_songs_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(service_id) ON DELETE CASCADE;


--
-- Name: service_songs service_songs_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_songs
    ADD CONSTRAINT service_songs_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(song_id) ON DELETE CASCADE;


--
-- Name: song_notes song_notes_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_notes
    ADD CONSTRAINT song_notes_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(song_id) ON DELETE CASCADE;


--
-- Name: song_tags song_tags_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.song_tags
    ADD CONSTRAINT song_tags_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(song_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

