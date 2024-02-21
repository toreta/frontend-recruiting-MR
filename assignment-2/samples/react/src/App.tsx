import "./App.css";
import { useEffect, useState } from "react";

const PREFECTURE_LIST = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const MAIL_ERROR_MSG = "正しいメールアドレスを入力してください";

const ZIP_ERROR_MSG = "ハイフンを含めず半角数字で入力してください";

const MAIL_REGEXP = new RegExp(
  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
);

const ZIP_REGEXP = new RegExp(/^[0-9]{7}$/);

const POST_URL = "https://httpstat.us/201";

export const App = () => {
  // 氏名
  const [name, setName] = useState<string>("");
  // Eメール
  const [email, setEmail] = useState<string>("");
  // 郵便番号
  const [zip, setZip] = useState<string>("");
  // 都道府県
  const [prefecture, setPrefecture] = useState<string>("");
  // 市区町村・番地
  const [address1, setAddress1] = useState<string>("");
  // 建物名・号室
  const [address2, setAddress2] = useState<string>("");

  // Eメールバリデーション
  const [validateMail, setValidateMail] = useState<boolean>(false);
  // 郵便番号バリデーション
  const [validateZip, setValidateZip] = useState<boolean>(false);

  // onClick判定
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // 登録ボタン押下可能判定
  const isEnabledButton =
    name && email && zip && prefecture && address1 ? true : false;

  // クリックハンドラ
  const onClickHandler = () => {
    // Eメールバリデーションチェック
    if (MAIL_REGEXP.test(email)) {
      setValidateMail(false);
    } else {
      setValidateMail(true);
    }
    // 郵便番号バリデーションチェック
    if (ZIP_REGEXP.test(zip)) {
      setValidateZip(false);
    } else {
      setValidateZip(true);
    }
    setIsClicked(true);
  };

  useEffect(() => {
    if (!validateMail && !validateZip && isClicked) {
      const requestBody = {
        name,
        email,
        zip,
        prefecture,
        address1,
        address2,
      };

      fetch(POST_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => console.log(res))
        .catch(() => {
          console.log("error");
        });
    }
    setIsClicked(false);

    // 下記コメントを削除するとeslint警告がでるため、残す
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked, validateMail, validateZip]);

  return (
    <div className="container">
      <div className="form">
        <div className="form-item">
          <div className="form-label">
            <label>氏名</label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="(例)トレタ 太郎"
          />
        </div>
        <div className={validateMail ? "form-item-validate" : "form-item"}>
          <div className="form-label">
            <label>Eメール</label>
          </div>
          <input
            className={validateMail ? "form-input-validate" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="(例)yoyaku@toreta.in"
          />
        </div>
        {validateMail && (
          <div className="form-item">
            <div className="form-label" />
            <div className="validate-msg">{MAIL_ERROR_MSG}</div>
          </div>
        )}
        <div className={validateZip ? "form-item-validate" : "form-item"}>
          <div className="form-label">
            <label>郵便番号</label>
          </div>
          <input
            className={validateZip ? "form-input-validate" : ""}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            type="text"
            placeholder="(例)0000000"
          />
        </div>
        {validateZip && (
          <div className="form-item">
            <div className="form-label" />
            <div className="validate-msg">{ZIP_ERROR_MSG}</div>
          </div>
        )}
        <div className="form-item">
          <div className="form-label">
            <label>都道府県</label>
          </div>
          <div className="select-box">
            <select
              className="select-box__item"
              value={prefecture}
              onChange={(e) => setPrefecture(e.target.value)}
              required
            >
              <option value="" disabled>
                選択してください
              </option>
              {PREFECTURE_LIST.map((prefecture, i) => (
                <option key={i} value={prefecture}>
                  {prefecture}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-item">
          <div className="form-label">
            <label>市区町村・番地</label>
          </div>
          <input
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            type="text"
            placeholder="(例)品川区西五反田7丁目22-17"
          />
        </div>
        <div className="form-item">
          <div className="form-label">
            <label>建物名・号室</label>
          </div>
          <input
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            type="text"
            placeholder="(例)TOCビル 8F"
          />
        </div>
        <button onClick={onClickHandler} disabled={!isEnabledButton}>
          登録
        </button>
      </div>
    </div>
  );
};

export default App;
