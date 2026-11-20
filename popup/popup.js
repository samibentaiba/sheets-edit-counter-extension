/**
 * Sheets Order States Tracker - Popup Script
 * Maisonette Deco Order Confirmation Sheet
 * Tracks: مؤكدة, ملغية, مكررة, fausse commande
 */

let allEditsData = [{"user": "Sami Bentaiba", "date": "2026-11-20T16:17:00", "dayStr": "2026-11-20", "timeStr": "04:17 PM", "rawDate": "November 20, 4:17 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-20T14:33:00", "dayStr": "2026-11-20", "timeStr": "02:33 PM", "rawDate": "November 20, 2:33 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-20T13:21:00", "dayStr": "2026-11-20", "timeStr": "01:21 PM", "rawDate": "November 20, 1:21 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-20T12:39:00", "dayStr": "2026-11-20", "timeStr": "12:39 PM", "rawDate": "November 20, 12:39 PM", "count": 1, "status": "مكررة"}, {"user": "ana2006 bouchra", "date": "2026-11-20T11:00:00", "dayStr": "2026-11-20", "timeStr": "11:00 AM", "rawDate": "November 20, 11:00 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-20T00:59:00", "dayStr": "2026-11-20", "timeStr": "12:59 AM", "rawDate": "November 20, 12:59 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T22:49:00", "dayStr": "2026-11-19", "timeStr": "10:49 PM", "rawDate": "November 19, 10:49 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T20:27:00", "dayStr": "2026-11-19", "timeStr": "08:27 PM", "rawDate": "November 19, 8:27 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T18:16:00", "dayStr": "2026-11-19", "timeStr": "06:16 PM", "rawDate": "November 19, 6:16 PM", "count": 1, "status": "مكررة"}, {"user": "ana2006 bouchra", "date": "2026-11-19T18:16:00", "dayStr": "2026-11-19", "timeStr": "06:16 PM", "rawDate": "November 19, 6:16 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-19T18:16:00", "dayStr": "2026-11-19", "timeStr": "06:16 PM", "rawDate": "November 19, 6:16 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T14:59:00", "dayStr": "2026-11-19", "timeStr": "02:59 PM", "rawDate": "November 19, 2:59 PM", "count": 1, "status": "مكررة"}, {"user": "ana2006 bouchra", "date": "2026-11-19T14:13:00", "dayStr": "2026-11-19", "timeStr": "02:13 PM", "rawDate": "November 19, 2:13 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-19T11:31:00", "dayStr": "2026-11-19", "timeStr": "11:31 AM", "rawDate": "November 19, 11:31 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T11:31:00", "dayStr": "2026-11-19", "timeStr": "11:31 AM", "rawDate": "November 19, 11:31 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T10:04:00", "dayStr": "2026-11-19", "timeStr": "10:04 AM", "rawDate": "November 19, 10:04 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T01:09:00", "dayStr": "2026-11-19", "timeStr": "01:09 AM", "rawDate": "November 19, 1:09 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-19T00:26:00", "dayStr": "2026-11-19", "timeStr": "12:26 AM", "rawDate": "November 19, 12:26 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T23:31:00", "dayStr": "2026-11-18", "timeStr": "11:31 PM", "rawDate": "November 18, 11:31 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T22:07:00", "dayStr": "2026-11-18", "timeStr": "10:07 PM", "rawDate": "November 18, 10:07 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T20:51:00", "dayStr": "2026-11-18", "timeStr": "08:51 PM", "rawDate": "November 18, 8:51 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-18T18:27:00", "dayStr": "2026-11-18", "timeStr": "06:27 PM", "rawDate": "November 18, 6:27 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-18T18:27:00", "dayStr": "2026-11-18", "timeStr": "06:27 PM", "rawDate": "November 18, 6:27 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T17:18:00", "dayStr": "2026-11-18", "timeStr": "05:18 PM", "rawDate": "November 18, 5:18 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-18T17:18:00", "dayStr": "2026-11-18", "timeStr": "05:18 PM", "rawDate": "November 18, 5:18 PM", "count": 1, "status": "ملغية"}, {"user": "Sami Bentaiba", "date": "2026-11-18T17:18:00", "dayStr": "2026-11-18", "timeStr": "05:18 PM", "rawDate": "November 18, 5:18 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T13:08:00", "dayStr": "2026-11-18", "timeStr": "01:08 PM", "rawDate": "November 18, 1:08 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T12:38:00", "dayStr": "2026-11-18", "timeStr": "12:38 PM", "rawDate": "November 18, 12:38 PM", "count": 1, "status": "ملغية"}, {"user": "Sami Bentaiba", "date": "2026-11-18T12:38:00", "dayStr": "2026-11-18", "timeStr": "12:38 PM", "rawDate": "November 18, 12:38 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T10:59:00", "dayStr": "2026-11-18", "timeStr": "10:59 AM", "rawDate": "November 18, 10:59 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T09:54:00", "dayStr": "2026-11-18", "timeStr": "09:54 AM", "rawDate": "November 18, 9:54 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-18T00:40:00", "dayStr": "2026-11-18", "timeStr": "12:40 AM", "rawDate": "November 18, 12:40 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T22:16:00", "dayStr": "2026-11-17", "timeStr": "10:16 PM", "rawDate": "November 17, 10:16 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T21:14:00", "dayStr": "2026-11-17", "timeStr": "09:14 PM", "rawDate": "November 17, 9:14 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T20:28:00", "dayStr": "2026-11-17", "timeStr": "08:28 PM", "rawDate": "November 17, 8:28 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T19:47:00", "dayStr": "2026-11-17", "timeStr": "07:47 PM", "rawDate": "November 17, 7:47 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-17T17:26:00", "dayStr": "2026-11-17", "timeStr": "05:26 PM", "rawDate": "November 17, 5:26 PM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T17:26:00", "dayStr": "2026-11-17", "timeStr": "05:26 PM", "rawDate": "November 17, 5:26 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-17T17:26:00", "dayStr": "2026-11-17", "timeStr": "05:26 PM", "rawDate": "November 17, 5:26 PM", "count": 1, "status": "مكررة"}, {"user": "Sami Bentaiba", "date": "2026-11-17T15:13:00", "dayStr": "2026-11-17", "timeStr": "03:13 PM", "rawDate": "November 17, 3:13 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T13:53:00", "dayStr": "2026-11-17", "timeStr": "01:53 PM", "rawDate": "November 17, 1:53 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T12:40:00", "dayStr": "2026-11-17", "timeStr": "12:40 PM", "rawDate": "November 17, 12:40 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T11:00:00", "dayStr": "2026-11-17", "timeStr": "11:00 AM", "rawDate": "November 17, 11:00 AM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-17T09:46:00", "dayStr": "2026-11-17", "timeStr": "09:46 AM", "rawDate": "November 17, 9:46 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T08:26:00", "dayStr": "2026-11-17", "timeStr": "08:26 AM", "rawDate": "November 17, 8:26 AM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T05:23:00", "dayStr": "2026-11-17", "timeStr": "05:23 AM", "rawDate": "November 17, 5:23 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T02:36:00", "dayStr": "2026-11-17", "timeStr": "02:36 AM", "rawDate": "November 17, 2:36 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-17T00:50:00", "dayStr": "2026-11-17", "timeStr": "12:50 AM", "rawDate": "November 17, 12:50 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T23:02:00", "dayStr": "2026-11-16", "timeStr": "11:02 PM", "rawDate": "November 16, 11:02 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T21:00:00", "dayStr": "2026-11-16", "timeStr": "09:00 PM", "rawDate": "November 16, 9:00 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T20:05:00", "dayStr": "2026-11-16", "timeStr": "08:05 PM", "rawDate": "November 16, 8:05 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T19:26:00", "dayStr": "2026-11-16", "timeStr": "07:26 PM", "rawDate": "November 16, 7:26 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T18:23:00", "dayStr": "2026-11-16", "timeStr": "06:23 PM", "rawDate": "November 16, 6:23 PM", "count": 1, "status": "ملغية"}, {"user": "Sami Bentaiba", "date": "2026-11-16T17:16:00", "dayStr": "2026-11-16", "timeStr": "05:16 PM", "rawDate": "November 16, 5:16 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T17:16:00", "dayStr": "2026-11-16", "timeStr": "05:16 PM", "rawDate": "November 16, 5:16 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-16T17:16:00", "dayStr": "2026-11-16", "timeStr": "05:16 PM", "rawDate": "November 16, 5:16 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T14:27:00", "dayStr": "2026-11-16", "timeStr": "02:27 PM", "rawDate": "November 16, 2:27 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-16T14:27:00", "dayStr": "2026-11-16", "timeStr": "02:27 PM", "rawDate": "November 16, 2:27 PM", "count": 1, "status": "ملغية"}, {"user": "Sami Bentaiba", "date": "2026-11-16T11:56:00", "dayStr": "2026-11-16", "timeStr": "11:56 AM", "rawDate": "November 16, 11:56 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T11:56:00", "dayStr": "2026-11-16", "timeStr": "11:56 AM", "rawDate": "November 16, 11:56 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T07:33:00", "dayStr": "2026-11-16", "timeStr": "07:33 AM", "rawDate": "November 16, 7:33 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T06:33:00", "dayStr": "2026-11-16", "timeStr": "06:33 AM", "rawDate": "November 16, 6:33 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T01:56:00", "dayStr": "2026-11-16", "timeStr": "01:56 AM", "rawDate": "November 16, 1:56 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-16T00:34:00", "dayStr": "2026-11-16", "timeStr": "12:34 AM", "rawDate": "November 16, 12:34 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T22:43:00", "dayStr": "2026-11-15", "timeStr": "10:43 PM", "rawDate": "November 15, 10:43 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T21:19:00", "dayStr": "2026-11-15", "timeStr": "09:19 PM", "rawDate": "November 15, 9:19 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T19:11:00", "dayStr": "2026-11-15", "timeStr": "07:11 PM", "rawDate": "November 15, 7:11 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T18:19:00", "dayStr": "2026-11-15", "timeStr": "06:19 PM", "rawDate": "November 15, 6:19 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-15T17:44:00", "dayStr": "2026-11-15", "timeStr": "05:44 PM", "rawDate": "November 15, 5:44 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T16:20:00", "dayStr": "2026-11-15", "timeStr": "04:20 PM", "rawDate": "November 15, 4:20 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T14:15:00", "dayStr": "2026-11-15", "timeStr": "02:15 PM", "rawDate": "November 15, 2:15 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T13:19:00", "dayStr": "2026-11-15", "timeStr": "01:19 PM", "rawDate": "November 15, 1:19 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-15T11:50:00", "dayStr": "2026-11-15", "timeStr": "11:50 AM", "rawDate": "November 15, 11:50 AM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-15T11:50:00", "dayStr": "2026-11-15", "timeStr": "11:50 AM", "rawDate": "November 15, 11:50 AM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T11:50:00", "dayStr": "2026-11-15", "timeStr": "11:50 AM", "rawDate": "November 15, 11:50 AM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-15T09:59:00", "dayStr": "2026-11-15", "timeStr": "09:59 AM", "rawDate": "November 15, 9:59 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-15T00:13:00", "dayStr": "2026-11-15", "timeStr": "12:13 AM", "rawDate": "November 15, 12:13 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T22:24:00", "dayStr": "2026-11-14", "timeStr": "10:24 PM", "rawDate": "November 14, 10:24 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T20:59:00", "dayStr": "2026-11-14", "timeStr": "08:59 PM", "rawDate": "November 14, 8:59 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T19:08:00", "dayStr": "2026-11-14", "timeStr": "07:08 PM", "rawDate": "November 14, 7:08 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-14T17:20:00", "dayStr": "2026-11-14", "timeStr": "05:20 PM", "rawDate": "November 14, 5:20 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T16:17:00", "dayStr": "2026-11-14", "timeStr": "04:17 PM", "rawDate": "November 14, 4:17 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-14T15:22:00", "dayStr": "2026-11-14", "timeStr": "03:22 PM", "rawDate": "November 14, 3:22 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T14:31:00", "dayStr": "2026-11-14", "timeStr": "02:31 PM", "rawDate": "November 14, 2:31 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T13:49:00", "dayStr": "2026-11-14", "timeStr": "01:49 PM", "rawDate": "November 14, 1:49 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-14T13:49:00", "dayStr": "2026-11-14", "timeStr": "01:49 PM", "rawDate": "November 14, 1:49 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-14T13:05:00", "dayStr": "2026-11-14", "timeStr": "01:05 PM", "rawDate": "November 14, 1:05 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-14T11:50:00", "dayStr": "2026-11-14", "timeStr": "11:50 AM", "rawDate": "November 14, 11:50 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T10:44:00", "dayStr": "2026-11-14", "timeStr": "10:44 AM", "rawDate": "November 14, 10:44 AM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-14T10:44:00", "dayStr": "2026-11-14", "timeStr": "10:44 AM", "rawDate": "November 14, 10:44 AM", "count": 1, "status": "مكررة"}, {"user": "ana2006 bouchra", "date": "2026-11-14T10:44:00", "dayStr": "2026-11-14", "timeStr": "10:44 AM", "rawDate": "November 14, 10:44 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T07:20:00", "dayStr": "2026-11-14", "timeStr": "07:20 AM", "rawDate": "November 14, 7:20 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-14T00:21:00", "dayStr": "2026-11-14", "timeStr": "12:21 AM", "rawDate": "November 14, 12:21 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T23:40:00", "dayStr": "2026-11-13", "timeStr": "11:40 PM", "rawDate": "November 13, 11:40 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T21:36:00", "dayStr": "2026-11-13", "timeStr": "09:36 PM", "rawDate": "November 13, 9:36 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T20:40:00", "dayStr": "2026-11-13", "timeStr": "08:40 PM", "rawDate": "November 13, 8:40 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-13T18:59:00", "dayStr": "2026-11-13", "timeStr": "06:59 PM", "rawDate": "November 13, 6:59 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T18:24:00", "dayStr": "2026-11-13", "timeStr": "06:24 PM", "rawDate": "November 13, 6:24 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T17:21:00", "dayStr": "2026-11-13", "timeStr": "05:21 PM", "rawDate": "November 13, 5:21 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-13T17:21:00", "dayStr": "2026-11-13", "timeStr": "05:21 PM", "rawDate": "November 13, 5:21 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T15:44:00", "dayStr": "2026-11-13", "timeStr": "03:44 PM", "rawDate": "November 13, 3:44 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-13T15:44:00", "dayStr": "2026-11-13", "timeStr": "03:44 PM", "rawDate": "November 13, 3:44 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T14:07:00", "dayStr": "2026-11-13", "timeStr": "02:07 PM", "rawDate": "November 13, 2:07 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T13:32:00", "dayStr": "2026-11-13", "timeStr": "01:32 PM", "rawDate": "November 13, 1:32 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-13T12:56:00", "dayStr": "2026-11-13", "timeStr": "12:56 PM", "rawDate": "November 13, 12:56 PM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T11:45:00", "dayStr": "2026-11-13", "timeStr": "11:45 AM", "rawDate": "November 13, 11:45 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T10:39:00", "dayStr": "2026-11-13", "timeStr": "10:39 AM", "rawDate": "November 13, 10:39 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T09:44:00", "dayStr": "2026-11-13", "timeStr": "09:44 AM", "rawDate": "November 13, 9:44 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T02:00:00", "dayStr": "2026-11-13", "timeStr": "02:00 AM", "rawDate": "November 13, 2:00 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-13T00:46:00", "dayStr": "2026-11-13", "timeStr": "12:46 AM", "rawDate": "November 13, 12:46 AM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T23:50:00", "dayStr": "2026-11-12", "timeStr": "11:50 PM", "rawDate": "November 12, 11:50 PM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T23:13:00", "dayStr": "2026-11-12", "timeStr": "11:13 PM", "rawDate": "November 12, 11:13 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T22:31:00", "dayStr": "2026-11-12", "timeStr": "10:31 PM", "rawDate": "November 12, 10:31 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T21:49:00", "dayStr": "2026-11-12", "timeStr": "09:49 PM", "rawDate": "November 12, 9:49 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T20:27:00", "dayStr": "2026-11-12", "timeStr": "08:27 PM", "rawDate": "November 12, 8:27 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T17:33:00", "dayStr": "2026-11-12", "timeStr": "05:33 PM", "rawDate": "November 12, 5:33 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T16:43:00", "dayStr": "2026-11-12", "timeStr": "04:43 PM", "rawDate": "November 12, 4:43 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T15:41:00", "dayStr": "2026-11-12", "timeStr": "03:41 PM", "rawDate": "November 12, 3:41 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T14:50:00", "dayStr": "2026-11-12", "timeStr": "02:50 PM", "rawDate": "November 12, 2:50 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T12:42:00", "dayStr": "2026-11-12", "timeStr": "12:42 PM", "rawDate": "November 12, 12:42 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T12:42:00", "dayStr": "2026-11-12", "timeStr": "12:42 PM", "rawDate": "November 12, 12:42 PM", "count": 1, "status": "مكررة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T10:09:00", "dayStr": "2026-11-12", "timeStr": "10:09 AM", "rawDate": "November 12, 10:09 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T10:09:00", "dayStr": "2026-11-12", "timeStr": "10:09 AM", "rawDate": "November 12, 10:09 AM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T09:31:00", "dayStr": "2026-11-12", "timeStr": "09:31 AM", "rawDate": "November 12, 9:31 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T08:36:00", "dayStr": "2026-11-12", "timeStr": "08:36 AM", "rawDate": "November 12, 8:36 AM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-12T08:36:00", "dayStr": "2026-11-12", "timeStr": "08:36 AM", "rawDate": "November 12, 8:36 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-12T01:23:00", "dayStr": "2026-11-12", "timeStr": "01:23 AM", "rawDate": "November 12, 1:23 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T23:43:00", "dayStr": "2026-11-11", "timeStr": "11:43 PM", "rawDate": "November 11, 11:43 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T20:36:00", "dayStr": "2026-11-11", "timeStr": "08:36 PM", "rawDate": "November 11, 8:36 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T17:31:00", "dayStr": "2026-11-11", "timeStr": "05:31 PM", "rawDate": "November 11, 5:31 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-11T17:31:00", "dayStr": "2026-11-11", "timeStr": "05:31 PM", "rawDate": "November 11, 5:31 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T15:44:00", "dayStr": "2026-11-11", "timeStr": "03:44 PM", "rawDate": "November 11, 3:44 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T14:58:00", "dayStr": "2026-11-11", "timeStr": "02:58 PM", "rawDate": "November 11, 2:58 PM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T14:05:00", "dayStr": "2026-11-11", "timeStr": "02:05 PM", "rawDate": "November 11, 2:05 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-11T12:42:00", "dayStr": "2026-11-11", "timeStr": "12:42 PM", "rawDate": "November 11, 12:42 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T12:42:00", "dayStr": "2026-11-11", "timeStr": "12:42 PM", "rawDate": "November 11, 12:42 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T11:10:00", "dayStr": "2026-11-11", "timeStr": "11:10 AM", "rawDate": "November 11, 11:10 AM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T10:31:00", "dayStr": "2026-11-11", "timeStr": "10:31 AM", "rawDate": "November 11, 10:31 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T09:30:00", "dayStr": "2026-11-11", "timeStr": "09:30 AM", "rawDate": "November 11, 9:30 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T03:34:00", "dayStr": "2026-11-11", "timeStr": "03:34 AM", "rawDate": "November 11, 3:34 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-11T00:13:00", "dayStr": "2026-11-11", "timeStr": "12:13 AM", "rawDate": "November 11, 12:13 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T21:55:00", "dayStr": "2026-11-10", "timeStr": "09:55 PM", "rawDate": "November 10, 9:55 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T20:26:00", "dayStr": "2026-11-10", "timeStr": "08:26 PM", "rawDate": "November 10, 8:26 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T19:20:00", "dayStr": "2026-11-10", "timeStr": "07:20 PM", "rawDate": "November 10, 7:20 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-10T19:20:00", "dayStr": "2026-11-10", "timeStr": "07:20 PM", "rawDate": "November 10, 7:20 PM", "count": 1, "status": "مؤكدة"}, {"user": "Sami Bentaiba", "date": "2026-11-10T18:24:00", "dayStr": "2026-11-10", "timeStr": "06:24 PM", "rawDate": "November 10, 6:24 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T18:24:00", "dayStr": "2026-11-10", "timeStr": "06:24 PM", "rawDate": "November 10, 6:24 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-10T18:24:00", "dayStr": "2026-11-10", "timeStr": "06:24 PM", "rawDate": "November 10, 6:24 PM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T15:32:00", "dayStr": "2026-11-10", "timeStr": "03:32 PM", "rawDate": "November 10, 3:32 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T13:46:00", "dayStr": "2026-11-10", "timeStr": "01:46 PM", "rawDate": "November 10, 1:46 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T10:29:00", "dayStr": "2026-11-10", "timeStr": "10:29 AM", "rawDate": "November 10, 10:29 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T09:51:00", "dayStr": "2026-11-10", "timeStr": "09:51 AM", "rawDate": "November 10, 9:51 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T08:57:00", "dayStr": "2026-11-10", "timeStr": "08:57 AM", "rawDate": "November 10, 8:57 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-10T02:46:00", "dayStr": "2026-11-10", "timeStr": "02:46 AM", "rawDate": "November 10, 2:46 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T22:29:00", "dayStr": "2026-11-09", "timeStr": "10:29 PM", "rawDate": "November 9, 10:29 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T21:44:00", "dayStr": "2026-11-09", "timeStr": "09:44 PM", "rawDate": "November 9, 9:44 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T19:32:00", "dayStr": "2026-11-09", "timeStr": "07:32 PM", "rawDate": "November 9, 7:32 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T18:33:00", "dayStr": "2026-11-09", "timeStr": "06:33 PM", "rawDate": "November 9, 6:33 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-09T18:33:00", "dayStr": "2026-11-09", "timeStr": "06:33 PM", "rawDate": "November 9, 6:33 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T16:08:00", "dayStr": "2026-11-09", "timeStr": "04:08 PM", "rawDate": "November 9, 4:08 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T15:17:00", "dayStr": "2026-11-09", "timeStr": "03:17 PM", "rawDate": "November 9, 3:17 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T14:44:00", "dayStr": "2026-11-09", "timeStr": "02:44 PM", "rawDate": "November 9, 2:44 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-09T12:37:00", "dayStr": "2026-11-09", "timeStr": "12:37 PM", "rawDate": "November 9, 12:37 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T12:37:00", "dayStr": "2026-11-09", "timeStr": "12:37 PM", "rawDate": "November 9, 12:37 PM", "count": 1, "status": "ملغية"}, {"user": "ana2006 bouchra", "date": "2026-11-09T11:10:00", "dayStr": "2026-11-09", "timeStr": "11:10 AM", "rawDate": "November 9, 11:10 AM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-09T10:09:00", "dayStr": "2026-11-09", "timeStr": "10:09 AM", "rawDate": "November 9, 10:09 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T10:09:00", "dayStr": "2026-11-09", "timeStr": "10:09 AM", "rawDate": "November 9, 10:09 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T09:01:00", "dayStr": "2026-11-09", "timeStr": "09:01 AM", "rawDate": "November 9, 9:01 AM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T08:02:00", "dayStr": "2026-11-09", "timeStr": "08:02 AM", "rawDate": "November 9, 8:02 AM", "count": 1, "status": "مكررة"}, {"user": "Raouf Bentaiba", "date": "2026-11-09T00:14:00", "dayStr": "2026-11-09", "timeStr": "12:14 AM", "rawDate": "November 9, 12:14 AM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T23:23:00", "dayStr": "2026-11-08", "timeStr": "11:23 PM", "rawDate": "November 8, 11:23 PM", "count": 1, "status": "fausse commande"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T21:52:00", "dayStr": "2026-11-08", "timeStr": "09:52 PM", "rawDate": "November 8, 9:52 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T19:28:00", "dayStr": "2026-11-08", "timeStr": "07:28 PM", "rawDate": "November 8, 7:28 PM", "count": 1, "status": "fausse commande"}, {"user": "ana2006 bouchra", "date": "2026-11-08T18:24:00", "dayStr": "2026-11-08", "timeStr": "06:24 PM", "rawDate": "November 8, 6:24 PM", "count": 1, "status": "ملغية"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T17:01:00", "dayStr": "2026-11-08", "timeStr": "05:01 PM", "rawDate": "November 8, 5:01 PM", "count": 1, "status": "مؤكدة"}, {"user": "ana2006 bouchra", "date": "2026-11-08T16:10:00", "dayStr": "2026-11-08", "timeStr": "04:10 PM", "rawDate": "November 8, 4:10 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T16:10:00", "dayStr": "2026-11-08", "timeStr": "04:10 PM", "rawDate": "November 8, 4:10 PM", "count": 1, "status": "مؤكدة"}, {"user": "Raouf Bentaiba", "date": "2026-11-08T14:23:00", "dayStr": "2026-11-08", "timeStr": "02:23 PM", "rawDate": "November 8, 2:23 PM", "count": 1, "status": "مؤكدة"}];
let currentPeriod = 'month'; // 'today', 'week', 'month', 'custom'
let selectedUser = 'ALL';

const USER_COLORS = {
  "Raouf Bentaiba": "#e37400",   // Orange
  "ana2006 bouchra": "#129688",  // Teal
  "Sami Bentaiba": "#8e24aa"     // Purple
};

document.addEventListener('DOMContentLoaded', () => {
  setupDefaultDates();
  setupEventListeners();
  checkCurrentTab();
  updateUserDropdown();
  renderDashboard();
});

function setupDefaultDates() {
  document.getElementById('startDate').value = "2026-11-08";
  document.getElementById('endDate').value = "2026-11-20";
}

function setupEventListeners() {
  // Period filter buttons
  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentPeriod = e.target.dataset.period;

      const customContainer = document.getElementById('customDateContainer');
      if (currentPeriod === 'custom') {
        customContainer.classList.remove('hidden');
      } else {
        customContainer.classList.add('hidden');
        renderDashboard();
      }
    });
  });

  // Apply custom date range
  document.getElementById('applyCustomDateBtn').addEventListener('click', renderDashboard);

  // User filter dropdown
  document.getElementById('userFilter').addEventListener('change', (e) => {
    selectedUser = e.target.value;
    renderDashboard();
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      e.target.classList.add('active');
      const targetTab = document.getElementById(e.target.dataset.tab);
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // Scan Button
  document.getElementById('scanBtn').addEventListener('click', scanSheetStates);

  // Export CSV
  document.getElementById('exportBtn').addEventListener('click', exportCSV);
}

async function checkCurrentTab() {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('docs.google.com/spreadsheets')) {
      statusBadge.textContent = 'الشيت متصل';
      statusBadge.className = 'status-badge connected';
      loadCachedData();
    } else {
      statusBadge.textContent = 'سجل البيانات جاهز';
      statusBadge.className = 'status-badge connected';
    }
  } catch (e) {
    statusBadge.textContent = 'الإضافة جاهزة';
  }
}

async function scanSheetStates() {
  const statusBadge = document.getElementById('sheetStatus');
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.includes('docs.google.com/spreadsheets')) {
      alert('الرجاء فتح شيت Google Sheets في المتصفح.');
      return;
    }

    statusBadge.textContent = 'جاري الفحص...';
    statusBadge.className = 'status-badge checking';

    chrome.tabs.sendMessage(tab.id, { action: 'SCAN_SHEET_STATES' }, (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        statusBadge.textContent = 'افتح سجل النسخ';
        statusBadge.className = 'status-badge checking';
        alert('تنبيه: الرجاء فتح نافذة سجل النسخ (File > Version history > See version history) حتى تتمكن الإضافة من قراءة الحالات بدقة، ثم الضغط على فحص مجدداً.');
        return;
      }

      statusBadge.textContent = `تم التحديث (${response.count} طلبية)`;
      statusBadge.className = 'status-badge connected';
      if (response.data && response.data.length > 0) {
        allEditsData = response.data;
        updateUserDropdown();
        renderDashboard();
      }
    });
  } catch (err) {
    console.error('Scan error:', err);
  }
}

function loadCachedData() {
  chrome.storage.local.get(['savedSheetEdits'], (result) => {
    if (result.savedSheetEdits && result.savedSheetEdits.length > 0) {
      allEditsData = result.savedSheetEdits;
      updateUserDropdown();
      renderDashboard();
    }
  });
}

function updateUserDropdown() {
  const select = document.getElementById('userFilter');
  const users = new Set();
  allEditsData.forEach(item => {
    if (item.user) users.add(item.user);
  });

  select.innerHTML = '<option value="ALL">جميع الأعضاء (All Collaborators)</option>';
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u;
    opt.textContent = u;
    select.appendChild(opt);
  });
}

function renderDashboard() {
  const now = new Date(2026, 10, 20, 23, 59, 59); // Nov 20, 2026
  const todayStart = new Date(2026, 10, 20, 0, 0, 0);

  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  weekStart.setHours(0, 0, 0, 0);

  const monthStart = new Date(2026, 10, 1, 0, 0, 0);

  const startInput = document.getElementById('startDate').value;
  const endInput = document.getElementById('endDate').value;
  const customStart = startInput ? new Date(startInput + 'T00:00:00') : weekStart;
  const customEnd = endInput ? new Date(endInput + 'T23:59:59') : now;

  // Filter records by selected period
  const filteredByPeriod = allEditsData.filter(item => {
    const itemDate = new Date(item.date);
    if (currentPeriod === 'today') return itemDate >= todayStart;
    if (currentPeriod === 'week') return itemDate >= weekStart;
    if (currentPeriod === 'month') return itemDate >= monthStart;
    if (currentPeriod === 'custom') return itemDate >= customStart && itemDate <= customEnd;
    return true;
  });

  // Filter records by selected user
  const filteredRecords = filteredByPeriod.filter(item => {
    if (selectedUser === 'ALL') return true;
    return item.user === selectedUser;
  });

  // 1. Calculate overall state totals for the KPI Banner
  let totalConfirmed = 0;
  let totalCancelled = 0;
  let totalDuplicate = 0;
  let totalFake = 0;

  filteredRecords.forEach(item => {
    const st = item.status || 'مؤكدة';
    if (st === 'مؤكدة') totalConfirmed++;
    else if (st === 'ملغية') totalCancelled++;
    else if (st === 'مكررة') totalDuplicate++;
    else if (st === 'fausse commande') totalFake++;
  });

  const totalStatesSet = filteredRecords.length;

  document.getElementById('kpiConfirmed').textContent = totalConfirmed;
  document.getElementById('kpiCancelled').textContent = totalCancelled;
  document.getElementById('kpiDuplicate').textContent = totalDuplicate;
  document.getElementById('kpiFake').textContent = totalFake;
  document.getElementById('kpiTotalProcessed').textContent = totalStatesSet;

  // 2. Aggregate per collaborator
  const userStats = {};
  filteredRecords.forEach(item => {
    const u = item.user || 'Unknown';
    const st = item.status || 'مؤكدة';

    if (!userStats[u]) {
      userStats[u] = { name: u, confirmed: 0, cancelled: 0, duplicate: 0, fake: 0, total: 0 };
    }
    userStats[u].total++;
    if (st === 'مؤكدة') userStats[u].confirmed++;
    else if (st === 'ملغية') userStats[u].cancelled++;
    else if (st === 'مكررة') userStats[u].duplicate++;
    else if (st === 'fausse commande') userStats[u].fake++;
  });

  renderCollaboratorsTable(Object.values(userStats));

  // 3. Aggregate daily breakdown
  const dailyStats = {};
  filteredRecords.forEach(item => {
    const day = item.dayStr || item.date.split('T')[0];
    const st = item.status || 'مؤكدة';

    if (!dailyStats[day]) {
      dailyStats[day] = { date: day, confirmed: 0, cancelled: 0, duplicate: 0, fake: 0, total: 0 };
    }
    dailyStats[day].total++;
    if (st === 'مؤكدة') dailyStats[day].confirmed++;
    else if (st === 'ملغية') dailyStats[day].cancelled++;
    else if (st === 'مكررة') dailyStats[day].duplicate++;
    else if (st === 'fausse commande') dailyStats[day].fake++;
  });

  renderDailyTable(dailyStats);
}

function renderCollaboratorsTable(usersList) {
  const tbody = document.getElementById('statsTableBody');
  document.getElementById('recordCount').textContent = `${usersList.length} أعضاء`;

  tbody.innerHTML = '';
  if (usersList.length === 0) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">لا توجد طلبيات معالجة في هذه الفترة.</td></tr>';
    return;
  }

  usersList.forEach(stat => {
    const dotColor = USER_COLORS[stat.name] || '#64748b';
    const confirmRate = stat.total > 0 ? Math.round((stat.confirmed / stat.total) * 100) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <span class="user-name-cell">
          <span class="user-dot" style="background-color: ${dotColor};"></span>
          ${escapeHtml(stat.name)}
        </span>
      </td>
      <td class="col-conf"><strong>${stat.confirmed}</strong></td>
      <td class="col-canc"><strong>${stat.cancelled}</strong></td>
      <td class="col-dup"><strong>${stat.duplicate}</strong></td>
      <td class="col-fake"><strong>${stat.fake}</strong></td>
      <td class="col-total">${stat.total}</td>
      <td class="col-rate">${confirmRate}%</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderDailyTable(dailyStats) {
  const dailyBody = document.getElementById('dailyTableBody');
  const days = Object.keys(dailyStats).sort().reverse();
  document.getElementById('dailyDaysCount').textContent = `${days.length} يوم مسجل`;

  dailyBody.innerHTML = '';
  if (days.length === 0) {
    dailyBody.innerHTML = '<tr class="empty-row"><td colspan="6">لا توجد بيانات يومية.</td></tr>';
    return;
  }

  days.forEach(day => {
    const d = dailyStats[day];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${day}</strong></td>
      <td class="col-conf">${d.confirmed}</td>
      <td class="col-canc">${d.cancelled}</td>
      <td class="col-dup">${d.duplicate}</td>
      <td class="col-fake">${d.fake}</td>
      <td class="col-total">${d.total}</td>
    `;
    dailyBody.appendChild(tr);
  });
}

function exportCSV() {
  if (allEditsData.length === 0) {
    alert('لا توجد بيانات لتصديرها.');
    return;
  }

  let csvContent = '\uFEFF';
  csvContent += 'المستخدم (User),التاريخ (Date),التوقيت (Time),الحالة المحددة (Order State)\n';

  allEditsData.forEach(row => {
    csvContent += `"${row.user}","${row.dayStr || row.date}","${row.timeStr || ''}","${row.status || 'مؤكدة'}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `maisonette_order_states_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
