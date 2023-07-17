import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const IndexPage: NextPage = () => {
  // ❶ useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");//image を入れる
  const [loading, setLoading] = useState(true);//読み込み状態を入れる
  // ❷ マウント時に画像を読み込む宣言
  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url); // 画像URLの状態を更新する
      setLoading(false); // ローディング状態を更新する
    });
  }, []);
  // ❸ ローディング中でなければ、画像を表示する
  //return <div>{loading || <img src={imageUrl} />}</div>;//if文は使えない

  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick = async () => {
    setLoading(true); // 読込中フラグを立てる
    const newImage = await fetchImage();
    setImageUrl(newImage.url); // 画像URLの状態を更新する
    setLoading(false); // 読込中フラグを倒す
  };
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>One more cat!</button>
      <div className={styles.flame}>{loading || <img src={imageUrl} className={styles.img} />}</div>
    </div>
  );
};
export default IndexPage;

type Image={
  url: string;
};

const fetchImage = async ():Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};