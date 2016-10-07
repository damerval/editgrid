/**
 * Created by pdamerval on 10/6/2016.
 */
var LOCATION_STATUSES = [
  {code: 6, label: "RETURNED-HOLD FOR PROB"},{code: 238, label: "HOLD-AIR FORCE"},{code: 62, label: "CRC-PROB/PAROLE"},
  {code: 239, label: "HOLD-ARMY"},{code: 240, label: "HOLD-NAVY"},{code: 45, label: "PSI COMPLETE"},
  {code: 63, label: "CRC-THIRD PARTY"},{code: 241, label: "HOLD-FBP"},{code: 61, label: "CRC-UNSENTENCED"},
  {code: 60, label: "PROB VIOLATION REPORTED"},{code: 64, label: "PROB REVOKED-FELONY"},
  {code: 400, label: "WALK-AWAY/ESCAPE"},{code: 1, label: "BENCH WARRANT"},{code: 2, label: "ARRESTED/REMANDED"},
  {code: 3, label: "SENTENCED"},{code: 5, label: "HOLD NON-CRIMINAL"},{code: 4, label: "HOLD ON DETAINR/WRNT"},
  {code: 7, label: "PROBATION START"},{code: 44, label: "PSI INVESTIGATION"},{code: 8, label: "PAROLE START"},
  {code: 9, label: "RLS TO PROBATION"},{code: 10, label: "RLS BY COURT ORDER"},
  {code: 11, label: "RLS TO OWN RECOGNIZANCE"},{code: 12, label: "MANDATORY PAROLE START"},
  {code: 13, label: "RLS TO THIRD PARTY"},{code: 14, label: "RLS ON APPEAL BOND"},
  {code: 15, label: "DISC PAROLE START"},{code: 16, label: "RLS ON BAIL/BOND"},
  {code: 17, label: "RLS FOR PENDING APPEAL"},{code: 18, label: "RLS-PARTIAL SENT SRVD"},
  {code: 19, label: "RLS-OTHER"},{code: 20, label: "RLS-TIME SERVED"},{code: 26, label: "RLS TO EXTRADITION"},
  {code: 27, label: "DEATH-SUICIDE"},{code: 28, label: "DEATH-ACCIDENTAL"},{code: 29, label: "DEATH-NON-ACCIDENTAL"},
  {code: 30, label: "DEATH-NATURAL CAUSES"},{code: 31, label: "DEATH-UNKNOWN CAUSES"},{code: 32, label: "ABSCOND"},
  {code: 33, label: "RLS-PAROLE DISCHARGE"},{code: 34, label: "PAROLE-INTERSTATE TRANSFER"},
  {code: 35, label: "PAROLE REVOKED-MISDEMEANANT"},{code: 36, label: "PAROLE REVOKED-FELONY"},
  {code: 37, label: "PAROLE REVOKED-TECHNICALITY"},{code: 38, label: "PAROLE REVOKED-SENT MODIFICTN"},
  {code: 39, label: "RLS-PROB DISCHARGE"},{code: 40, label: "PROB-INTERSTATE TRANSFER"},
  {code: 41, label: "PROB REVOKED-MISDEMEANANT"},{code: 42, label: "PROB REVOKED-TECHNICALITY"},
  {code: 43, label: "PROB REVOKED-SENT MODIFICATION"},{code: 401, label: "HOLD-COAST GUARD"},
  {code: 402, label: "HOLD-MARINES"},{code: 403, label: "SENTENCED"},{code: 235, label: "RLS-ESCAPE"},
  {code: 106, label: "RELEASED"},{code: 135, label: "NEW PRISON COMMITMENT"},{code: 21, label: "RLS-PAID FINE"},
  {code: 22, label: "RLS-SENT COMMUTATION"},{code: 23, label: "RLS-PARDONED"},{code: 24, label: "RLS TO FEDERAL"},
  {code: 25, label: "RLS-NONCRIM"},{code: 46, label: "PSI UPDATE REPORT"},{code: 47, label: "ISC DENIED"},
  {code: 48, label: "ISC ACCEPTED"},{code: 49, label: "ISC PAROLE"},{code: 50, label: "ISC PROBATION"},
  {code: 51, label: "ISC INVESTIGATION"},{code: 52, label: "IN STATE CRC"},{code: 53, label: "PAROLE PRGM PRESCRIBED"},
  {code: 54, label: "PAROLE PRGM ASSIGNMENT"},{code: 55, label: "PAROLE PRGM TERM/REASSGN"},
  {code: 56, label: "PAROLE VIOLATION REPORTED"},{code: 57, label: "PROB PRGM PRESCRIBED"},
  {code: 58, label: "PROB PRGM ASSIGNMENT"},{code: 59, label: "PROB PRGM TERM/REASSGN"},
  {code: 75, label: "PROB INTRASTATE TRANSFER"},{code: 65, label: "PROBATION/PAROLE CONTINUED"},
  {code: 76, label: "PAROLE INTRASTATE TRANSFER"},{code: 242, label: "HOLD-MENTAL"},
  {code: 70, label: "PAROLE - COMPLETE"},{code: 71, label: "PROBATION - COMPLETE"},
  {code: 72, label: "INFORMAL/UNSUPERVISED PROBATN"},{code: 73, label: "PROBATION CONTINUED"},
  {code: 74, label: "PAROLE CONTINUED"},{code: 355, label: "MOVE/PRISON HOUSING"},{code: 236, label: "HOLD-INS"},
  {code: 237, label: "HOLD-US-MARSHAL"},{code: 66, label: "EM PAROLE PLACEMENT"},{code: 100, label: "NEW REFERAL"},
  {code: 130, label: "NEW COMM/PROB VIOLATION"},{code: 930, label: "PSI ORDERED"},{code: 967, label: "PSI COMPLETED"},
  {code: 399, label: "WALK-AWAY"},{code: 234, label: "ESCAPE"}
];
