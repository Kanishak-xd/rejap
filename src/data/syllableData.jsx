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
    }
};

export default syllableData;
