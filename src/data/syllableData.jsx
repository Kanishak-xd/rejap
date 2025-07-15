const syllableData = {
    hiragana: {
        1: {
            syllables: ["あ", "い", "う", "え", "お"],
            romaji: ["a", "i", "u", "e", "o"]
        },
        2: {
            syllables: ["か", "き", "く", "け", "こ"],
            romaji: ["ka", "ki", "ku", "ke", "ko"]
        },
        3: {
            syllables: ["さ", "し", "す", "せ", "そ"],
            romaji: ["sa", "shi", "su", "se", "so"]
        },
        4: {
            syllables: ["た", "ち", "つ", "て", "と"],
            romaji: ["ta", "chi", "tsu", "te", "to"]
        },
        5: {
            syllables: ["な", "に", "ぬ", "ね", "の"],
            romaji: ["na", "ni", "nu", "ne", "no"]
        },
        6: {
            syllables: ["は", "ひ", "ふ", "へ", "ほ"],
            romaji: ["ha", "hi", "fu", "he", "ho"]
        },
        7: {
            syllables: ["ま", "み", "む", "め", "も"],
            romaji: ["ma", "mi", "mu", "me", "mo"]
        },
        8: {
            syllables: ["や", "ゆ", "よ"],
            romaji: ["ya", "yu", "yo"]
        },
        9: {
            syllables: ["ら", "り", "る", "れ", "ろ"],
            romaji: ["ra", "ri", "ru", "re", "ro"]
        },
        10: {
            syllables: ["わ", "を", "ん"],
            romaji: ["wa", "wo", "n"]
        }
    },

    katakana: {
        1: {
            syllables: ["ア", "イ", "ウ", "エ", "オ"],
            romaji: ["a", "i", "u", "e", "o"]
        },
        2: {
            syllables: ["カ", "キ", "ク", "ケ", "コ"],
            romaji: ["ka", "ki", "ku", "ke", "ko"]
        },
        3: {
            syllables: ["サ", "シ", "ス", "セ", "ソ"],
            romaji: ["sa", "shi", "su", "se", "so"]
        },
        4: {
            syllables: ["タ", "チ", "ツ", "テ", "ト"],
            romaji: ["ta", "chi", "tsu", "te", "to"]
        },
        5: {
            syllables: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
            romaji: ["na", "ni", "nu", "ne", "no"]
        },
        6: {
            syllables: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
            romaji: ["ha", "hi", "fu", "he", "ho"]
        },
        7: {
            syllables: ["マ", "ミ", "ム", "メ", "モ"],
            romaji: ["ma", "mi", "mu", "me", "mo"]
        },
        8: {
            syllables: ["ヤ", "ユ", "ヨ"],
            romaji: ["ya", "yu", "yo"]
        },
        9: {
            syllables: ["ラ", "リ", "ル", "レ", "ロ"],
            romaji: ["ra", "ri", "ru", "re", "ro"]
        },
        10: {
            syllables: ["ワ", "ヲ", "ン"],
            romaji: ["wa", "wo", "n"]
        }
    },

    kanji: {
        1: {
            syllables: ["一", "二", "三", "四", "五", "六"],
            romaji: ["ichi/itsu", "ni/futa", "san/mi", "shi/yon", "go/itsu", "roku/mu"]
        },
        2: {
            syllables: ["七", "八", "九", "十", "百", "千"],
            romaji: ["shichi/nana", "hachi/ya", "kyuu/ku", "juu/tou", "hyaku", "sen"]
        },
        3: {
            syllables: ["万", "円", "年", "日", "月", "火"],
            romaji: ["man", "en", "nen/toshi", "nichi/hi/bi", "gatsu/tsuki", "ka/hi"]
        },
        4: {
            syllables: ["水", "木", "金", "土", "人", "上"],
            romaji: ["sui/mizu", "moku/ki", "kin/kane", "do/to/tsuchi", "jin/nin/hito", "jou/ue"]
        },
        5: {
            syllables: ["下", "中", "大", "小", "左", "右"],
            romaji: ["ka/ge/shita", "chuu/naka", "dai/oo(kii)", "shou/chii(sai)", "sa/hidari", "yuu/migi"]
        },
        6: {
            syllables: ["父", "母", "子", "男", "女", "友"],
            romaji: ["fu/chichi", "bo/haha", "shi/ko", "dan/otoko", "jo/onna", "yuu/tomo"]
        },
        7: {
            syllables: ["先", "生", "学", "校", "北", "南"],
            romaji: ["sen/saki", "sei/i(kiru)", "gaku/mana(bu)", "kou", "hoku/kita", "nan/minami"]
        },
        8: {
            syllables: ["東", "西", "外", "前", "後", "高"],
            romaji: ["tou/higashi", "sei/nishi", "gai/soto", "zen/mae", "go/ato/ushiro", "kou/taka(i)"]
        },
        9: {
            syllables: ["長", "今", "毎", "何", "名", "国"],
            romaji: ["chou/naga(i)", "kon/ima", "mai", "ka/nani/nan", "mei/na", "koku/kuni"]
        },
        10: {
            syllables: ["白", "天", "雨", "電", "気", "車"],
            romaji: ["haku/shiro(i)", "ten/ame", "u/ame", "den", "ki/ke", "sha/kuruma"]
        },
        11: {
            syllables: ["山", "川", "田", "道", "空", "行"],
            romaji: ["san/yama", "sen/kawa", "den/ta", "dou/michi", "kuu/sora/a(ku)", "kou/i(ku)"]
        },
        12: {
            syllables: ["来", "帰", "出", "入", "見", "聞"],
            romaji: ["rai/ku(ru)", "ki/kae(ru)", "shutsu/de(ru)", "nyuu/hai(ru)", "ken/mi(ru)", "bun/ki(ku)"]
        },
        13: {
            syllables: ["書", "読", "話", "食", "飲", "買"],
            romaji: ["sho/ka(ku)", "doku/yo(mu)", "wa/hanasu", "shoku/ta(beru)", "in/no(mu)", "bai/ka(u)"]
        },
        14: {
            syllables: ["会", "休", "言", "立", "待", "語"],
            romaji: ["kai/a(u)", "kyuu/yasu(mu)", "gen/i(u)/koto", "ritsu/ta(tsu)", "tai/ma(tsu)", "go/katari"]
        },
        15: {
            syllables: ["持", "時", "分", "半", "午", "間"],
            romaji: ["ji/mo(tsu)", "ji/toki", "fun/pun/wa(karu)", "han", "go", "kan/aida"]
        },
        16: {
            syllables: ["花", "魚", "犬", "新", "古", "店"],
            romaji: ["ka/hana", "gyo/sakana", "ken/inu", "shin/atara(shii)", "ko/furu(i)", "ten/mise"]
        },
        17: {
            syllables: ["駅", "会", "社", "安", "多", "少"],
            romaji: ["eki", "kai/a(u)", "sha", "an/yasu(i)", "ta/oo(i)", "shou/suku(nai)"]
        }
    },
    time: {
        1: {
            syllables: ["時", "分", "午前", "午後", "何時", "半"],
            romaji: ["ji (o'clock)", "fun/pun (minutes)", "gozen (AM)", "gogo (PM)", "nanji (what time?)", "han (half)"]
        },
        2: {
            syllables: ["一", "二", "三", "四", "五", "六"],
            romaji: ["ichi-ji (1 o'clock)", "ni-ji (2 o'clock)", "san-ji (3 o'clock)", "yo-ji (4 o'clock)", "go-ji (5 o'clock)", "roku-ji (6 o'clock)"]
        },
        3: {
            syllables: ["七", "八", "九", "十", "十一", "十二"],
            romaji: ["shichi-ji/nana-ji (7 o'clock)", "hachi-ji (8 o'clock)", "ku-ji (9 o'clock)", "juu-ji (10 o'clock)", "juuichi-ji (11 o'clock)", "juuni-ji (12 o'clock)"]
        },
        4: {
            syllables: ["一分", "二分", "三分", "四分", "五分", "六分"],
            romaji: ["ippun (1 min)", "nifun (2 min)", "sanpun (3 min)", "yonpun (4 min)", "gofun (5 min)", "roppun (6 min)"]
        },
        5: {
            syllables: ["七分", "八分", "九分", "十分", "十五分", "三十分"],
            romaji: ["nanafun (7 min)", "happun (8 min)", "kyuufun (9 min)", "juppun (10 min)", "juugofun (15 min)", "sanjupun (30 min)"]
        },
        6: {
            syllables: ["日", "月", "火", "水", "木", "金"],
            romaji: ["nichi-youbi (Sunday)", "getsu-youbi (Monday)", "ka-youbi (Tuesday)", "sui-youbi (Wednesday)", "moku-youbi (Thursday)", "kin-youbi (Friday)"]
        },
        7: {
            syllables: ["土", "今日", "昨日", "一昨日", "明日", "明後日"],
            romaji: ["do-youbi (Saturday)", "kyou (today)", "kinou (yesterday)", "ototoi (day before yesterday)", "ashita (tomorrow)", "asatte (day after tomorrow)"]
        },
        8: {
            syllables: ["月", "一月", "二月", "三月", "四月", "五月"],
            romaji: ["gatsu (month)", "ichi-gatsu (January)", "ni-gatsu (February)", "san-gatsu (March)", "shi-gatsu (April)", "go-gatsu (May)"]
        },
        9: {
            syllables: ["六月", "七月", "八月", "九月", "十月", "十一月"],
            romaji: ["roku-gatsu (June)", "shichi-gatsu (July)", "hachi-gatsu (August)", "ku-gatsu (September)", "juu-gatsu (October)", "juuichi-gatsu (November)"]
        },
        10: {
            syllables: ["十二月", "毎年", "毎日", "毎月", "毎週", "今月"],
            romaji: ["juuni-gatsu (December)", "maitoshi (every year)", "mainichi (every day)", "maitsuki (every month)", "maishuu (every week)", "kongetsu (this month)"]
        },
        11: {
            syllables: ["先月", "来月", "今週", "先週", "来週", "今"],
            romaji: ["sengetsu (last month)", "raigetsu (next month)", "konshuu (this week)", "senshuu (last week)", "raishuu (next week)", "ima (now)"]
        },
        12: {
            syllables: ["日", "一日", "二日", "三日", "四日", "五日"],
            romaji: ["nichi (day of month)", "tsuitachi (1st day)", "futsuka (2nd day)", "mikka (3rd day)", "yokka (4th day)", "itsuka (5th day)"]
        },
        13: {
            syllables: ["六日", "七日", "八日", "九日", "十日", "十四日"],
            romaji: ["muika (6th day)", "nanoka (7th day)", "youka (8th day)", "kokonoka (9th day)", "tooka (10th day)", "juuyokka (14th day)"]
        },
        14: {
            syllables: ["二十日", "二十四日", "年", "今年", "去年", "来年"],
            romaji: ["hatsuka (20th day)", "nijuuyokka (24th day)", "nen (year)", "kotoshi (this year)", "kyonen (last year)", "rainen (next year)"]
        },
        15: {
            syllables: ["一昨年", "再来年", "時間", "週間", "ヶ月", "年間"],
            romaji: ["ototoshi (year before last)", "sarainen (year after next)", "jikan (duration of hours)", "shuukan (duration of weeks)", "kagetsu (duration of months)", "nenkan (duration of years)"]
        },
        16: {
            syllables: ["誕生日", "何曜日", "何日", "何月", "午前九時", "午後三時半"],
            romaji: ["tanjoubi (birthday)", "nan'youbi (what day?)", "nan'nichi (what date?)", "nan'gatsu (what month?)", "gozen ku-ji (9 AM)", "gogo san-ji han (3:30 PM)"]
        }
    }

};

export default syllableData;
