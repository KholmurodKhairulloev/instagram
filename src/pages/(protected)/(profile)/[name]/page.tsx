/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useGetFavoritePostsQuery,
	useGetMyPostsQuery,
	useGetMyProfileQuery,
	useGetMyStoriesQuery,
	useGetPostsByIdQuery,
	useGetProfileByIdQuery,
	useGetStoryByidQuery,
} from '@/app/store/profileSlice/profileSlice'
import PostIcon from '@/shared/icons/post-icon'
import ReelsIcon from '@/shared/icons/Reels-icon'
import SavedIcon from '@/shared/icons/saved-icon'
import TaggedIcon from '@/shared/icons/tagged-icon'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import ReelsDiv from '@/shared/ui/reels-div'
import ReelsDiv2 from '@/shared/ui/ReelsDiv2'
import DefaultImageUser from '@/assets/UserIcon.png'
import StoryCircle from '@/shared/ui/story-circle'

import HeaderSectionProfile from '@/widgets/header-section-profile'
import ReelsContainer from '@/widgets/reels-container'
import StorySection from '@/widgets/section-story'
import { StoryModal } from '@/widgets/StoriesModal'
import InstagramModalView from '@/widgets/VeiwModal'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { skipToken } from '@reduxjs/toolkit/query'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router'

export default function ProfileByNamePage() {
	const [isViewed, setIsViewed] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [OpenPosts, setOpenPosts] = useState<boolean>(true)
	const [OpenSave, setOpenSave] = useState<boolean>(false)
	const [OpenReels, setOpenReels] = useState<boolean>(false)
	const [view, setView] = useState<boolean>(false)
	const [selectPost, setSelectPost] = useState< null | any >(null)
	const { id } = useParams()
	function clickOpenModal() {
		setIsViewed(true)
		setOpenModal(true)
	}
	function clickOpenPosts() {
		setOpenPosts(true)
		setOpenSave(false)
		setOpenReels(false)
	}
	function clickOpenSaved() {
		setOpenPosts(false)
		setOpenReels(false)
		setOpenSave(true)
	}
	function clickOpenReels() {
		setOpenPosts(false)
		setOpenSave(false)
		setOpenReels(true)
	}
	const {
		data: profileData,
		error: profileError,
		isLoading: profileLoading,
	} = useGetMyProfileQuery(id ? skipToken : undefined)
	const {
		data: postsData,
		error: postsError,
		isLoading: postsLoading,
	} = useGetMyPostsQuery(id ? skipToken : undefined)
	const {
		data: StoryData,
		error: StoryError,
		isLoading: StoryLoading,
	} = useGetMyStoriesQuery(id ? skipToken : undefined)
	const {
		data: FavoriteData,
		error: FavoriteError,
		isLoading: FavoriteLoading,
	} = useGetFavoritePostsQuery(undefined)
	const {
		data: profileIdData,
		// error: ErrorPrifileId,
		isLoading: LoadingProfileId,
	} = useGetProfileByIdQuery(id ? id : skipToken)
	const { data: PostsById, isLoading: LoadingPostsById } = useGetPostsByIdQuery(
		id ? id : skipToken
	)
	const { data: storyByIdData, isLoading: storyByIdLoading } =
		useGetStoryByidQuery(id ? id : skipToken)

	if (profileError) return <p className=''>Profile Error</p>
	if (profileLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	// if (ErrorPrifileId) return <p className=''>ProfileID Error</p>
	if (LoadingProfileId)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (postsError) return <p className=''>Error Posts</p>
	if (postsLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (LoadingPostsById)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (StoryError) return <p className=''>Story Error</p>
	if (StoryLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (storyByIdLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)
	if (FavoriteError) return <p className=''>FavoritePosts Error</p>
	if (FavoriteLoading)
		return (
			<div className='loading-bar-container'>
				<div className='loading-bar'></div>
			</div>
		)

	return (
		<div className='lg:ml-[50px] ml-0 overflow-hidden max-w-[900px] m-auto w-full py-[50px]'>
			<section className='flex pb-[20px] w-[90%] lg:w-[100%] m-auto gap-[20px] lg:gap-[70px] items-center'>
				<div
					className={`rounded-full overflow-hidden flex items-center justify-center lg:w-[200px] lg:h-[200px]  cursor-pointer p-[2px] ${
						isViewed
							? 'bg-gray-500'
							: 'bg-gradient-to-tr from-yellow-400 to-pink-600'
					}`}
				>
					<Avatar
						className='w-full h-full rounded-full'
						onClick={clickOpenModal}
					>
						<AvatarImage
							src={
								profileData?.data?.image
									? `https://instagram-api.softclub.tj/images/${profileData?.data?.image}`
									: profileIdData?.data?.image
									? `https://instagram-api.softclub.tj/images/${profileIdData?.data?.image}`
									: DefaultImageUser
							}
							className='object-cover w-full h-full rounded-full'
							alt='Profile Image'
						/>
						<AvatarFallback>
							<img
								src={DefaultImageUser}
								className='object-cover w-full h-full rounded-full'
								alt='Default Profile Image'
							/>
						</AvatarFallback>
					</Avatar>
				</div>

				<StoryModal
					open={openModal}
					setOpen={setOpenModal}
					storyData={StoryData || storyByIdData}
				/>
				<HeaderSectionProfile
					userName={
						profileData?.data?.userName || profileIdData?.data?.userName
					}
					posts={profileData?.data?.postCount || profileIdData?.data?.postCount}
					followers={
						profileData?.data?.subscribersCount ||
						profileIdData?.data?.subscribersCount
					}
					following={
						profileData?.data?.subscriptionsCount ||
						profileIdData?.data?.subscriptionsCount
					}
					firstName={
						profileData?.data?.firstName || profileIdData?.data?.firstName
					}
					about={profileData?.data?.about || profileIdData?.data?.about}
					routId={id}
				/>
			</section>
			<div className='lg:hidden w-[90%] m-auto block'>
				<InfoProfile
					firstName={
						profileData?.data?.firstName || profileIdData?.data?.firstName
					}
					about={profileData?.data?.about || profileIdData?.data?.about}
				/>
			</div>
			{!id && (
				<div className='hidden lg:flex gap-[20px] items-center'>
					<StorySection>
						<StoryCircle />
					</StorySection>
				</div>
			)}
			<div className='block lg:hidden'>
				<InfoFollowers
					posts={profileData?.data?.postCount || profileIdData?.data?.postCount}
					followers={
						profileData?.data?.subscribersCount ||
						profileIdData?.data?.subscribersCount
					}
					following={
						profileData?.data?.subscriptionsCount ||
						profileIdData?.data?.subscriptionsCount
					}
					routId={id}
				/>
			</div>
			<Tabs className='border-t-[1px] relative border-[gray] py-[10px]'>
				<TabsList className='flex justify-center gap-[50px]'>
					<TabsTrigger
						value='Tabs1'
						onClick={clickOpenPosts}
						className={`flex cursor-pointer gap-[10px] items-center ${
							OpenPosts
								? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
								: 'text-[#fff]'
						}`}
					>
						<PostIcon />
						<p className='text-[#fff] lg:block hidden'>Posts</p>
					</TabsTrigger>
					{!id && (
						<>
							<TabsTrigger
								value='Tabs1'
								onClick={clickOpenReels}
								className={`flex cursor-pointer gap-[10px] items-center ${
									OpenReels
										? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
										: 'text-[#fff]'
								}`}
							>
								<ReelsIcon />
								<p className='text-[#fff] lg:block hidden'>Reels</p>
							</TabsTrigger>

							<TabsTrigger
								value='Tabs1'
								onClick={clickOpenSaved}
								className={`flex cursor-pointer gap-[10px] items-center ${
									OpenSave
										? 'border-t-[2px] relative z-20 pt-[20px] top-[-10px] border-white font-bold'
										: 'text-[#fff]'
								}`}
							>
								<SavedIcon />
								<p className='text-[#fff] lg:block hidden'>Saved</p>
							</TabsTrigger>
						</>
					)}

					<TabsTrigger
						value='Tabs1'
						className='flex cursor-pointer gap-[10px] items-center'
					>
						<TaggedIcon />
						<p className='text-[#fff] lg:block hidden'>Tagged</p>
					</TabsTrigger>
				</TabsList>
			</Tabs>
			{OpenPosts && (
				<ReelsContainer>
					{postsData || PostsById.data ? (
						(postsData || PostsById.data)
							?.toReversed()
							?.map(
								(post: {
									commentCount: string | number
									images: unknown[]
									postLikeCount: number
									comments: object
									id: number | string
								}) => (
									<div
										className=''
										onClick={() => {
											setView(true)
											setSelectPost(post)
										}}
									>
										<ReelsDiv
											img={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
											likes={post.postLikeCount}
											comments={post.commentCount}
										/>
									</div>
								)
							)
					) : (
						<div className='flex items-center justify-center w-full h-full'>
							<div className=''>
								<Camera className='text-[#fff]' size={70} />
								<h1 className='text-[70px] text-[#fff] text-center'>
									There are no publications yet
								</h1>
							</div>
						</div>
					)}
				</ReelsContainer>
			)}
			{OpenReels && (
				<ReelsContainer>
					{postsData.map(
						(reels: {
							commentCount: string | number
							images: unknown[]
							postLikeCount: number
							comments: object
							id: number | string
						}) => (
							<div
								onClick={() => {
									setView(true)
									setSelectPost(reels)
								}}
								className=''
							>
								<ReelsDiv2
									img={`https://instagram-api.softclub.tj/images/${reels.images[0]}`}
									likes={reels.postLikeCount}
									comments={reels.commentCount}
									key={reels.id}
								/>
							</div>
						)
					)}
				</ReelsContainer>
			)}
			{OpenSave && (
				<ReelsContainer>
					{FavoriteData.data.map(
						(favorite: {
							images: unknown[]
							postLikeCount: number
							commentCount: number | string
						}) => (
							<div
								onClick={() => {
									setView(true)
									setSelectPost(favorite)
								}}
								className=''
							>
								<ReelsDiv
									img={`https://instagram-api.softclub.tj/images/${favorite.images[0]}`}
									likes={favorite.postLikeCount}
									comments={favorite.commentCount}
								/>
							</div>
						)
					)}
				</ReelsContainer>
			)}
			{selectPost && (
				<InstagramModalView open={view} setOpen={setView} post={selectPost} />
			)}{' '}
		</div>
	)
}
