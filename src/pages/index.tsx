import type { NextPage } from "next";
import type React from "react";
import { useState } from "react";

import Button from "@/components/buttons/Button";
import BaseImage from "@/components/images/BaseImage";
import Layout from "@/components/layouts/Layout";
import { baseURL } from "@/constants/baseConstants";
import clsxm from "@/lib/helpers/clsxm";
import { useDebounce } from "@/hooks/useDebounce";

const Home: NextPage = () => {
	const [title, setTitle] = useState<string>("Title");
	const [desc, setDesc] = useState<string>("Description");
	const [imgUrl, setImgUrl] = useState<string>("");
	const [socialMedia, setSocialMedia] = useState<string>("Twitter: @yehezgun");
	const [siteName, setSiteName] = useState<string>("yehezgun.com");
	const [isCopied, setIsCopied] = useState<boolean>(false);
	const [useSST, setUseSST] = useState<boolean>(false);

	// Choose endpoint based on deployment or user preference
	const apiEndpoint = useSST ? "/api/og-sst" : "/api/og";

	const ogUrl = new URL(
		`${apiEndpoint}?title=${title}&desc=${desc}${
			imgUrl.length > 10 ? `&imgUrl=${imgUrl}` : ""
		}&siteName=${siteName}&socialMedia=${socialMedia}`,
		baseURL,
	);

	// Create debounced handlers
	const debouncedSetTitle = useDebounce(
		(value: string) => setTitle(value),
		500,
	);
	const debouncedSetDesc = useDebounce((value: string) => setDesc(value), 500);
	const debouncedSetImgUrl = useDebounce(
		(value: string) => setImgUrl(value),
		500,
	);
	const debouncedSetSiteName = useDebounce(
		(value: string) => setSiteName(value),
		500,
	);
	const debouncedSetSocialMedia = useDebounce(
		(value: string) => setSocialMedia(value),
		500,
	);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetTitle(e.target.value);
	};

	const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetDesc(e.target.value);
	};

	const handleImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetImgUrl(e.target.value);
	};

	const handleSiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetSiteName(e.target.value);
	};

	const handleSocialMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetSocialMedia(e.target.value);
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
					<div className="flex flex-col gap-2">
						<label htmlFor="title" className="font-bold">
							Social Media
						</label>
						<input
							type="text"
							onChange={handleSocialMediaChange}
							className={clsxm("base-form")}
							defaultValue={socialMedia}
						/>
					</div>
					<Button block variant="secondary" onClick={() => onCopied()}>
						Copy URL
					</Button>

					{/* Endpoint Toggle for Testing */}
					<div className="flex flex-col gap-2">
						<label className="font-bold" htmlFor="API Endpoint Label">
							API Endpoint
						</label>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="useSST"
								checked={useSST}
								onChange={(e) => setUseSST(e.target.checked)}
								className="rounded"
							/>
							<label htmlFor="useSST" className="text-sm">
								Use SST Endpoint ({useSST ? "/api/og-sst" : "/api/og"})
							</label>
						</div>
					</div>
				</section>
				<section className="flex w-full flex-col gap-4">
					<figure>
						<BaseImage src={ogUrl.toString()} className="rounded-md" />
					</figure>
					<p
						className="break-all hover:cursor-pointer hover:underline"
						onClick={() => onCopied()}
						onKeyUp={() => onCopied()}
					>
						{ogUrl.toString()}
					</p>
					<p
						className={clsxm(
							!isCopied && "invisible",
							"rounded-lg bg-pink-300 p-2 dark:bg-pink-600",
							"font-bold italic",
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
