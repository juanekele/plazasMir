const http = require('http');
const cheerio = require('cheerio');
var mysql = require('mysql');
const utf8 = require('utf8');

const hostname = '127.0.0.1';
const port = 8080;

var request = require("request");

var options = { method: 'POST',
  url: 'https://sis.msssi.es/fse/PlazasAdjudicadas/PlazasAdjudicadas.aspx',
  qs: { MenuId: 'AD-00', SubMenuId: 'AD-03', cDocum: '', '': '' },
  body: "rbPlaza=rbPlaza&cbComunidad=-1&cbProvincia=-1&txtCentro=&cbEspecialidad=29&cmdAceptar=Aceptar",
     headers: 
   { 
     'Content-Type': 'application/x-www-form-urlencoded',
     Connection: 'keep-alive',
     'Cache-Control': 'no-cache',
     'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
     'Accept-Encoding': 'gzip, deflate, br',
     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
  form: false };

  var options_libres = { method: 'POST',
  url: 'https://sis.msssi.es/fse/SolicitudPlazas/VacantesMedicina/PlazasVacantesM.aspx',
  body: "__VIEWSTATE=Ch%2Fk47nIekWhJQ3aiWf%2Bpaube7aUA8GDmYZggbzFJuqbfr7Z1w0IcAJCMUF1ljVw92cEPmIDSByd2rG9aM0w0VhFpYsNTwK5FuY3ayVgN8MN4%2B%2Bq8HpH71mHFrCirPuS4C95mLWjvoTXnQXHv2iJrqSd2wsrhP3fbQ8pk9KJyTpSV9S8La63BeUon5OusFmtpzP8%2FvAhenTDoF5v9ROGFXAjkATJRnBlxv%2Bs0zQnY8MAotwWEkYLUvPcXEMJ7KppgkjsZQvg2zfAVWCTcloDHMRJ3Z%2Fp64SM7OPRs4y3vGAKUbUvoQocRqlSEEKdiT9STpRgcrMx%2BwtrP6nLXc29Ba8Khy52IMN%2FJNU%2FiS9W4XDR01Q%2FAfuXndxAPfW%2BubTuv8lUQMq5WEHEA7NxClQIvmQHULl6Iy%2FwQ%2F1yx0igbXj84Ja5JsZbpE4fkjzU3o%2B4Rtu9AUJr1NrTs5osEGBvA5O%2BCUyuNOw3Vd4tZL%2BiH8BTkNj2CgRmj1brV9nRyJSe1pnYMpupokBsN8riVsoKZ0NCRfGyR8a6I0%2BWMPuCgc0blTaYZQsKeyiJWCmyyGyV96niw5GfPvdgbDdwt%2Bt2Vwmuy1CKwPykl7fhh3aASHo0F1VQTFHgu2XXXn8YLWTHIXGxUKhyvVer21IfdL30Hb3VJpHD0PH5Lh1lDMHFRdgdr9UIYHmjGYjOH%2F3puMgRygvSCVN210rK1XJICz6R6Iw3cirqOBX3AdIMe0h9As3X9nv3MOie18nrssA1wN%2B%2FsJZ1UlHp4MxmMDoauaNk5gq%2FuKg55yKSP1cNQf%2FwWtxGOApNcTuR0vYh1%2BfO6DcQrVBRRdtq5Tli7omLYsdihKYu5zsFg0mI2PF8mLC7Av5I2QRKhqgoYSc66tvPno0G6e5U9eMV8s11vjV7DGNxTMHv65qeZPVqaEPVj%2BMpebGg2GTPYHZYXpE74dZBupusVOtO25Ge1bg6YaFiE75BEoHW7eYr0QTAYRZQQC%2FIlRBMMl53CWWaRT1aARkFQ7ylEO27jX8%2BxUwlAfx65ne7Uw64q2JAOaFbaeOBbnSQf7kBhFxXarFNgG9LTq769OHQpcYUge96GqSjBx41BMNAbVBFWfFobb2SQwkmIpKEtBVkGX3jNrTedQW6CEB5YF6gs7u1GHZIHZH5MYmqqhQJyoS123N5BivwaIHlzwdhAzuM9TmXVy78DwIQmqJkesTuefDSeYjMyXU2%2BJkDiTb7f5PnR%2BqX%2FUWl2R%2B1uTWyQ5XkHJB7C9w48hzSxBKJTKGQkDEP39dL%2FQP4FTMBrD6LOIpJhJAMSi0NOHAYaNeEjjK8anRmgEbJa%2F87nIszykzHo7US96rs8hQ%2FFMG5YUB6CjH7r66OtiGA4G8sB%2BwlwIpQHrLlimzK2VvhbD1hYT4%2FLpuA782M8p2iDPn1G8T5PAevZiEE6BGy2qEua4IIX%2B%2FpGfhbqd%2FpHorQHl0R%2FyIw72N5MK4Xk2qonxqJ%2BrFl6w9naugvC6g%2ByhkhpJ6Lf3t2CCvL82WYn24QscDQKWxCqQMGLA2mGbeSL58D8NeQMqaGE3PCrFW26bRU%2Bx59WRy9FDtPIwT1p4R6ZMnBa2wLtJA2uM1saiOWbTc4%2BQBGqbBPUp9SBSCsOObVggXUhP%2BaGQijGjX4rUzPu0K5ye0DXqnbDJS49NboX4t0c8ZI1Ymwig41a0cHAK%2F9RHWIoscbCaur%2Ffm47Sspi6tqjmjzBnh%2FesH0G6iHKwwDxwx2sPHTPWNTNVr4PHlIhVqRPcizd6otO71oTVuTySkih%2B8zD6DFiJEguAG8HBY%2FOeSMHYZuR7zqO0%2FBCdnabv3asXajd0msf0EzUYjZeRlXKCprLhnDc6vBd%2FFCemal4RI%2B%2FF0ZDLjeSmKExt9A6sgCnNS4e3Jju%2F3rRfWOKetiRAQVCA68yk8omtyOr1vpFKAzHism8SeQlWLU1swgScSPd8F%2BgJLlqFZqrqNOWRffXA604FNKpnuJBKZR9rfGxEajkxeW4m1PGLVqyT4oyFxQ0KQkFl93dCQbQft5rERj1Csc%2Bc5MR2JSTlctp3148ZiSzz39msLZKvzpp1D8O1DSeMJ91hTfYiQHSpgDfcan19cmNPo2PrIWRw2Y4l2RIhBPimgZWb8XO9n6MXfbQlIOP72aRsdOFxM%2Bvf3XQ1uRd7lps0pN%2FKNCyEk3gii%2B2qHtkT%2FDp8FTOWCr0DaMdCfLXviYnAHRrOLvFe82jz%2FZnCzZOsrwr3%2FxEXJqE6BumrJnM3qht2S7O9zkHk12x2tGK86a9sojbePbhpSu1vmLYkPqp6yTxvToFAS52b0LbZNz80VkOVOe2rzsw6OLWk%2B7Xxi%2FGUB%2BKCzGJcE%2BDEi%2FltUeloWtQt0zoJc%2B6VlSlrmEA4BH8LVNw3TsthrqJKA1woespbM66IOmVBhu%2B%2Fobwy38Pkam7wMomU1H4Pzoc9cEFHhJKQ4fIxulCJbZ0IrlEswIAGH3LUc5El0c3A3Q1IrN3spR7bISrvLGxJ7Le94sFoCtl4uaWpnRzjxEfzcrJZ5ufqpIafh%2FN7HoFq1d6U3B7m4HSO5AjN2dCiN4UNe9rY5GGYLACcujPtUIPsQf7X8UYT7Hjqx5WX9guViiIF4XVvXEWGm%2Fi04REC1%2FpqukEVnKrltFSAa1mYvHwXxroYa7SGf1qVoe58q1tY%2BlDpweEJU6RsDaKDnzCbZTpPVqSx7ZKTe54cm8bA90mtwAQmBWqscC8zfWq%2Bo0ICK3%2FI3yoXjXAHq89clflpVmmjZ%2BetC99KR5EFbSGANFfiHSbwz4au33hf%2BsEdTrlNFstH%2B9tHFBoU9TocExxoBBr76Ew9BkBphARB9FsduG%2FPud2UpnnoTJHLLYIylKdHIz8njpAWNsXBFTamRLE7kbG62vBRlTMYhFlNWKBY%2B57mUx2IVb3LIhLUf5FtuP6BHQB4aVzT4cy%2FOG8WbpjsiFPWcNrnn9U4dsmt6kpflMKE%2BImt56D8YcSVMBhMKTeJpR3IKk%2FJMbw9wufHoeX2xqdPAdFJ8iP6Fhz3JIK3ZFGdprJBRXjLhdBiXO%2FdkG0ZpY8FbGun7GqrcbS5UKiiUDjhzpPVp9iN%2FP9hMqtUKPDJFf1LuRSGY1%2BQxdxN2a9mtTBawJ4%2FIfmEAMsR3unnZHuFROsuiKqNney8alGeHhpmq%2BX72Crdfni8U5SKf19sLcT7X3QFTX16VQzM5mvDzbUQ%2F6YM0D4ZXlld9t7yjjvzQX2lWQBINMOD%2F17D6lAfYuc79RWy64Pv7vj7kD4b5GW6cQWqHJ8YP5pvtDBoi%2FaSRSBWQuonnqnsQw17K3bQb3lYMREP8Of%2F35fDDOWOCgfKXLIQzjijVQ%2FUJ13R6eB9WYMLMS2dsTm%2Bd%2B6oZfmoxHfC4RumN%2FPMzZZPwZwODDxshObWefxF6HD2QYoRi8ewMfP7LssbtPSrlu6%2F6CcgWZMR4%2B3yIFBG9xqDznAtHgwzDJKHzTYP1WknBngvaEU1kGyQbzlzrYyXtaBDnwB91jZytMILrf24c0drG0mbgMYgKlR5YrZLbvL8c854NzKl3KBoU5%2BRSba%2BIx6Af0wYVemndRK66ck8zEOYbmtKLzyfcaE6wjR%2BnK9eZ9K%2FtXWND8PlyIWpNgqBL2xWeoHVR4B8OyUy7hcK59IW54NmkiyxgiZf%2B1wIrw1ZfZVDsSMnAY3HWTC00saMjFgwZf3geu%2B8zA2oLczTD8vMTRlC0EXh9jVa2o67D2xHBqX%2BWZjbW%2B%2F5vMCqkB0heL7RtzB1E%2F0npvnG3t7DQd9jd5Osgj3NiQPZbYNWxkNszLYj8k%2FHZJLUexWsLa%2BRAov%2FuVP8Fo2ZDXxzuaJnMewpjTChYfGutmUJ7Yal3JFx%2FtalA3bxcJtA0oCLt3iq0Wr3xgMgORlQgyobin0EZz0Ga5%2FmAq3gjjd7NancPDndG3S53iR95vj1gYb%2F2F3vtQijn6JFawHnrALYr7yls52V0zIBh5deDGn%2BspLCKr4tE4oPfsas9ZjeUpA%2B4bCA6DyqsZKWeVHlp0R9kHNPPaQNMdUfy5mrZqXdRig4S6PGUc%2BLKHvWIGxKaCOwp5hx6s2Tk17%2BqVRKHpWrrETQo53h7kC2yaBcM6v5alBzPdV5FI6%2BwuFEaJjXdwAe63ZXn%2BmsaZwOSZBvd0Q5czWAoYSVbmqOv1QinE5VACrQEszeJN1Pe9l7lVOu4O9sVzOQmGpo89%2Bmphvg9SzuauuVLzeIVTnk9kVIqFj5GwS2BBEclFByPYoF814ejSE9iL8B24Vbw85MPNtF0dtOkNvB75l5aO%2BqLtr%2Bg%2F9Yrt5crgBefO96tbQ86d%2Bc6YntJVACCkMIj3olPBLnwqh1Ems6gcoVO3kwMHbqlLW1QqkEvRBwVhl06MNs8uxKc5qeuqJU3DIWVQCxpwxXvvn0dcpYLwfG%2Bsuj14dSMJaVawaYg%2Ffpr65%2BeQHNYQF6gQyxhmpDfJiSLTxCStJrDf1Pr1LcmQkFpHnfhgUMSGsHsdMZdIphoI1LkPVmPo%2B29kTn%2FTGXs8W56KGrD4UibStD3bfQD29CahTqvYquD4fcNYuVHgdbnzzuYrYzxa3qL8WDtbMLLeMha%2FiYnXVb%2BgQgZMWUPIPUKy55jA%2BMLeIRXHSlaSZrioeAVWfKnCIliIJX8TWAEUJocFRXqKid%2F4juxCF%2Fc05KFbcfLebSCETRDuO7CNQ3q8ktIhOXgzk9s8WqKr6QNIuXClZdBW5NCNZ6139L6Kk30E6q%2B9P8HaL5xpuZ7YaqKz3B44AAAdD%2Bv52zeObcjYLCypWm8Y97b%2Fe9l3Hke251LqY324Yu9J8naCo2xL7cM%2Fw8F3qJjcSY0s4i9gvGJEGAtaknY5gMuaTm8PFXvexKpzmbRWLloufCgd8rGPbu%2B65UKenePjENjP8NCt9bDWT898t5KrRrtpr%2BUT%2BB9p7igssR8TTrntAMvW3TvsKUEJrEZ%2FnhgOevBs6SZL52VmBysUiqTD9lpuZdyWy5fyhW7h3%2FmT5SPDCczz4Qqdeq3o9LaHQU%2FMuHa9RLCGIeHW8BZvxPnG6XGk%2BYBaQgbRbaRrSBSdW4ipdnpofanKzl8QBLPhlkoiMcxUzY9MUw2W%2BM%2FVNefGEbGQdatpvBelzRS5A1yDF0jZxks1SRZ8mWUH49xjwQeqGLpAmvlzDA79PAm7PMqEyGnuOnd%2BC6brrBvWSAvrO2PhRCHsY8uBFkSWqooIqv2Lv9%2FU1HvnKq7h0lofM2UgKeVbwtC38%2BUnS5GvhjcxgYYAwsdaCdLRDRwcHzKdFy8%2FUJUgAnZgn9Bc7cDwUFR6F1AJijehkUxdifSfbWbHfevErCEK5zq1dC929tjr0ELJR8BF3wOHweur79JohD2hSqw4ElvLFdmbEjYU63iuGokrVwyueDM6d%2BmSWr1JLLZUxlLlMnVEDJF1ZC46OrISnQ6gt%2B%2BBKy5QDiHOOMd2cOwZzUDVYKEDgd%2BK%2FfAgG4RIG%2F9ozQM7rDH6tQNJcmidXyIYtoIJGpcz%2FpkTCmPmexvNHP8Tn7rCeTrH8pyhKGt6vrsx4Bz%2F0MKHaiahCbkAa%2BNEJzyZ0oKc9Bu9IHLIWE1MAPZBzTqO6%2BHRHMqqC4BfCo7SrgMPOWJWJzEL5FgYA7Aq8d%2Fl%2FmVSO8esqwc3N22nfuSf4zde89JkQEum7fZhR%2BTnPFjgQDqFn6Unf%2B3eRGiqGFllB27JekZ4DnmtWGBXcZcLrgzst6eUaj3KCiXUwyWsWeZsQ01yXyy7D7oQlaanNzGuMA8A2lM5KyFco3AUGrRX4CZFrxukqXUSHBQQxM5Z6UjcVSCdIr9aEbIv%2BtxOR9YhtLjCa69rMIi4M6VklgJpLjQJQxTMO0xLAz%2FhmIUYpyKjz7WGKSsgbWLxqYRAHJfboPa0598FzQkrQ0rUDzbPydyFPoxV7vSvEwoTPacB7Lm2l5rFxrxjRjznYgMGJcyKqXL2wlXMMOSEY2wvOB2oHGe9jHADOfdghNKgIsUJxnQber5KoixDzvFpFQGO0NFKFJBEb1V0iCgIl4eBcZa5%2BhLXB%2FJjYPYuaWqU34ssNag5GWXzbKxm%2BHvlZQG3s0mGRi03Qg7%2BOBnuEZzFcGPqD0mMdWyezUxyF8KAAzi5mj%2F3MJcSowWFZ%2FiqQ6mEjVdDtTmf5%2B5x%2Ffm19JliJuh4PlOGcSPz67hZ%2BZq1AzEtrT3Bi%2Bn4txXW1%2BRGTubfk5mag1NNh8QBrdA7Klfr3L6aQM3XOKanVLVJMRhhT6hkKo06Tfg3kNtqGBDMGWtTlFRZcB74tJt6oH6SaoBssbWZmC%2FUaRHp7VWALqgCiHV00RF9YFJdZz7gckNIgX6OGCjILJwdpiC5G%2BIiz6pLbkuVa6yU9WGyUaVmJ5L4igZAsGEPIYOgwS4AxtZRcswTTiPtbmHI1KiUApwm5FYTd2hweGmcLKVTabDJ4qjWBsVfEoAGd1Q6Y4mAIj8D3DAP8NFKYoTj2Dd4gRTRUuqhbCJa0eV4USNjlNuwBNZInVuIn7ELEZcq2ZFRZTvyg0vG9miw3JGJG7B3PfYSPEFR5QC5DMxwSgcKmMScrjy56cZJ590dbkqtJQxxhuNy1gC4ExE6yFVgzh9RWONTEMp9FcA9dsCjX6YsGfJ3sXesMuvT8iamIC5ZMIiZdJ4rJJCw4XMqTI4AFA%2B6rak2sWaCqr2%2FGWy6RYPc71SPKnhPoJaEw1N4K3PGKf5%2BNfSxwBKzeLMkl7Gr15UdiQ70Iz2uNL9SgtaHjXxPkurEL69a3KvFApVWNi5EEkFnO32cN4F8WwX9Rd4Js76oDwLm5btpOxJ%2Fb3VPqCD3UYherePHJovOmwgc7wvGTEOrpgphFY7jeQ4U7ICzcU06J%2BWe%2FW3NdHhtg9HSy%2BSRnypg2OoilEGQ%2FnH05x6cyYDqbLb4qMrCQsDq1iSRj2Ct%2Br4vvQht9fENEATy5N3IQkc%2Bz6a8X0m3pXwDftn58fG%2BHA2Enwqxcc11%2BKQaYr%2FaKCIH37iuxSiAjTcn6bng%2FzhWWo5xpzQ0WsWYHgRAWo1w06%2FsTZdUhIeS%2FeFocxCUlj0vcBgFN0Dv91%2FF%2FrNn1qIOU7%2BwnHp%2FOWQOMRrDpTW8HZR0DAYNd1BPAl3OVvpTiCb8rW05Srdn8u58Q5R8GZ%2Bp645Y7wIkG5gQS7xtYyLmr0%2FfzwKp0Ts6MKtq8F36YWOwW%2BROfQBL0QPIJ1BJUIqFdvtjzsl%2Fs%2BRRx6rgnXxSeqaGajoUFxAk0zmaIbhL4bh764F1dntvqEd%2FsKybsac2J1sYGb4fCsHmYJsnHLPnfU%2F0%2F8dSpbIcoYOjeUWJHw42joA4PbbC%2BbCWWxQnWkavLO32yWtq3DS7F6HcsLHkVSfblwGqzFAJcUeB2wxzA4BQshE66unUw0xa1aXZ2hQmjnOZCu050TPS3YpJWK7Th4d4pw%2F04GMo%2F2%2Bxoxk%2Fc9nXDqZAhJ9Uzqpy%2FwLayKe4zflgfSjkvzj4yLAibYmfoXhnCvpPXy%2FvG%2F0KWiCodSQsH70R1JhQWzwtIoVkQCxsVyryUaw6Hez8XGGcPqyJ874A59C3cHO4fca%2BCN7ynLCWP03Zlg2eq6PV9v23GBXdhTZ3b%2Fgr6andJP20pAV2rSUgT8rrOcLKvaP930lVHTtsGvww18m7NwGnCUtM58IcYyLXvqYaBfNsisReyDlHUj69UQwJeHtcKHGppxCIPPGShhKDSptEdJsECE5oZzVwnGCkpRJSuB7cPC5s%2FtLhVEcNQjYfrjbYDC%2BtigElHwSNNTi%2BjWdlD8%2B1Jzin5%2Bri28n%2F3NxRwcUzUw59sPAkW3DKk0359U0W8Dz%2BbrK5roXYitxqyAv%2ByP9YQEAPI8trASFvSg%2Bk9jk7vs6ZbAjbAfTDt1CCO70LdkiOFzlqbK2mvNC7BA%3D%3D&__VIEWSTATEGENERATOR=FEEC10D7&__VIEWSTATEENCRYPTED=&lbFiltro=450011&lbFiltro=280081&lbFiltro=290041&lbFiltro=280014&lbFiltro=330014&lbFiltro=280017&lbFiltro=480041&lbFiltro=280033&lbFiltro=289063&lbFiltro=288011&lbFiltro=280013&lbFiltro=289011&btnSiguiente=Paso+Siguiente",
  qs: { MenuId: 'AD-00', SubMenuId: 'AD-04', cDocum: '', '': '' },
  headers: 
   { 
     'Content-Type': 'application/x-www-form-urlencoded',
     Connection: 'keep-alive',
     'Cache-Control': 'no-cache',
     'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
     'Accept-Encoding': 'gzip, deflate, br',
     Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
  form: false };


var num_plazas= 0;

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ".jaguado.",
  port: 3306,
  database: "plazas_mir"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * from plazas", function (err, result) {
    if (err) throw err;
  });
});*/




const server = http.createServer((req, res) => {
 	res.statusCode = 200;
 	
  	var html = '<!DOCTYPE html><html><head><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> </head><body><div class="container"><h2>Plazas de nefrolog&iacute;a ya adjudicadas</h2>';
	request(options, function (error, response, body) {
		const $ = cheerio.load(body);
		console.log(body);
		console.log($(".table-responsive").html());
	  	html += $(".table-responsive").html();
	  	num_plazas = $("tr").length - 1;
	  	html+= '<br><h2>Plazas libres de nefro en Madrid</h2>'
	  	request(options_libres, function (error2, response2, body2) {
			const $2 = cheerio.load(body2);
			console.log(body2);
			
		  	html += $2("#divPlazas").html();
		  	num_plazas = $("tr").length - 1;
		  	html+= '</div></body></html>';

		  	res.end(html);
		  	if(num_plazas > 6) {

		  	}
		  	if (error2) throw new Error(error); 
		});
	  
	  	if(num_plazas > 6) {

	  	}
	  	if (error) throw new Error(error); 
	});



});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
