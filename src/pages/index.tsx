import type { NextPage } from "next";
import React, { useState } from "react";

import Button from "@/components/buttons/Button";
import BaseImage from "@/components/images/BaseImage";
import Layout from "@/components/layouts/Layout";
import { baseURL } from "@/constants/baseConstants";
import clsxm from "@/lib/helpers/clsxm";

const Home: NextPage = () => {
  const [title, setTitle] = useState<string>("Title");
  const [desc, setDesc] = useState<string>("Description");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("yehezgun.com");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const ogUrl = new URL(
    `/api/og?title=${title}&desc=${desc}${
      imgUrl.length > 10 ? `&imgUrl=${imgUrl}` : ""
    }&siteName=${siteName}`,
    baseURL
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const handleImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target.value);
  };
  const handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  const onCopied = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(ogUrl.toString());
    setTimeout(() => {
      setIsCopied(false);
    }, 4000);
  };

  return (
    <Layout>
      <main className="flex flex-wrap justify-between gap-6 md:flex-nowrap">
        <section className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              Page Title
            </label>
            <input
              type="text"
              onChange={handleTitleChange}
              className={clsxm("base-form")}
              defaultValue={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              Description
            </label>
            <input
              type="text"
              onChange={handleDescChange}
              className={clsxm("base-form")}
              defaultValue={desc}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              Image URL
            </label>
            <input
              type="text"
              onChange={handleImgUrlChange}
              className={clsxm("base-form")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-bold">
              Site Name
            </label>
            <input
              type="text"
              onChange={handleSiteNameChange}
              className={clsxm("base-form")}
              defaultValue={siteName}
            />
          </div>
          <Button block variant="secondary" onClick={() => onCopied()}>
            Copy URL
          </Button>
        </section>
        <section className="flex w-full flex-col gap-4">
          <figure>
            <BaseImage src={ogUrl.toString()} className="rounded-md" />
          </figure>
          <p
            className="break-all hover:cursor-pointer hover:underline"
            onClick={() => onCopied()}
          >
            {ogUrl.toString()}
          </p>
          <p
            className={clsxm(
              !isCopied && "invisible",
              "rounded-lg bg-pink-300 p-2 dark:bg-pink-600",
              "font-bold italic"
            )}
          >
            The link has been copied!
          </p>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
