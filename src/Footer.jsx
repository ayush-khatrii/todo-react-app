import React from "react";

const Footer = () => {
	return (
		<>
			<footer class='w-full px-5  text-zinc-400 bg-zinc-950 body-font'>
				<div class='container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col'>
					<span class='ml-3  text-zinc-400 font-normal'>Made by</span>
					<a
						class='ml-3 text-zinc-300 font-semibold'
						href='https://ayushkhatri.vercel.app/'
						target='_blank'
					>
						Ayush Khatri
					</a>
					<span class='inline-flex gap-3 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
						<a
							class='ml-3 text-zinc-400'
							href='https://twitter.com/khatri_ayush15'
							target='_blank'
						>
							<svg
								fill='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								class='w-5 h-5'
								viewBox='0 0 24 24'
							>
								<path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
							</svg>
						</a>
						<a
							class='ml-3 text-zinc-400'
							href='https://www.instagram.com/ayush.khatrii/'
							target='_blank'
						>
							<svg
								fill='none'
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='2'
								class='w-5 h-5'
								viewBox='0 0 24 24'
							>
								<rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
								<path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
							</svg>
						</a>
						<a
							class='ml-3 text-zinc-400'
							href='https://www.linkedin.com/in/ayushkhatrii/'
							target='_blank'
						>
							<svg
								fill='currentColor'
								stroke='currentColor'
								stroke-linecap='round'
								stroke-linejoin='round'
								stroke-width='0'
								class='w-5 h-5'
								viewBox='0 0 24 24'
							>
								<path
									stroke='none'
									d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
								></path>
								<circle cx='4' cy='4' r='2' stroke='none'></circle>
							</svg>
						</a>
					</span>
				</div>
			</footer>
		</>
	);
};

export default Footer;
