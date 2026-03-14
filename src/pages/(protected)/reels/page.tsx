/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
	useCommentPostMutation,
	useDeleteCommentMutation,
	useFavoRiteMutation,
	useFollowingMutation,
	useGetReelsQuery,
	useLikeReelMutation,
} from '@/entities/reels/reels'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
} from '@/shared/ui/alert-dialog'
import { Button } from '@/shared/ui/button-from-homepage'
import { Card, CardContent } from '@/shared/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/carousel'
import { Input } from '@/shared/ui/input'
import { Skeleton } from '@/shared/ui/skeleton'
import { format } from 'date-fns'
import {
	Bookmark,
	Delete,
	Ellipsis,
	Heart,
	MessageCircle,
	Send,
	Volume2Icon,
	VolumeOff,
	X,
} from 'lucide-react'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { Link } from 'react-router'

export default function ReelsPage() {
	const videoRefs = useRef<HTMLVideoElement[]>([])
	const { data: reels, error, isLoading } = useGetReelsQuery('')
	const [followUser] = useFollowingMutation()
	const [pausedVideo, setPausedVideo] = useState<number | null>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [postNameComment, setPostNameComment] = useState<string>('')
	const [isMuted, setIsMuted] = useState<boolean>(false)
	const [idx, setIdx] = useState(null)
	const [openedCommentDialog, setOpenedCommentDialog] = useState<number | null>(
		null
	)

	const [follow, setFollow] = useState<boolean>(false)

	const [save, setSave] = useState<null | string | number | boolean>()
	const [deletComment] = useDeleteCommentMutation()
	const [favorite] = useFavoRiteMutation()
	const [likeReel] = useLikeReelMutation()
	const [commentAddReel] = useCommentPostMutation()
	const [style, setStyle] = useState(false)
	const [activeId, setActiveId] = useState<boolean | number | string | null>(
		null
	)
	const [like,setLike] = useState<boolean>(false)
	const [imgDecode, setImgDecode] = useState<JwtPayload | null>(null)
	

	
	const emojis = [
		'😀',
		'😂',
		'😎',
		'😍',
		'🤔',
		'😜',
		'😇', 
		'😢',
		'😡',
		'😏',
		'😊',
		'😆',
		'😅',
		'😳',
		'😱',
		'🥳',
		'🤩',
		'😜',
		'😴',
		'🤯',
		'😈',
		'👻',
		'💀',
		'👹',
		'🧛‍♂️',
		'🧟‍♂️',
		'👀',
		'🦸‍♀️',
		'💪',
		'✌️',
		'🤞',
		'🙏',
		'🦾',
		'🤖',
		'👽',
		'🛸',
		'🚀',
		'🛶',
		'⛷️',
		'🏂',
		'🏌️‍♂️',
		'⛸️',
		'🏇',
		'🚴‍♀️',
		'🚶‍♂️',
		'🤸‍♀️',
		'🏋️‍♂️',
		'🏆',
		'🥇',
		'🥈',
		'🥉',
		'🏅',
		'⚽',
		'🏀',
		'🏈',
		'⚾',
		'🎾',
		'🏐',
		'🏉',
		'🎱',
		'🏓',
		'🏸',
		'🥏',
		'🏒',
		'🏑',
		'🥍',
		'🏹',
		'🎯',
		'🎮',
		'🕹️',
		'🎲',
		'🎰',
		'🎭',
		'🎤',
		'🎧',
		'🎼',
		'🎷',
		'🎺',
		'🎸',
		'🎻',
		'🥁',
		'🎬',
		'📸',
		'📷',
		'📹',
		'📺',
		'📞',
		'📱',
		'📲',
		'💻',
		'🖥️',
		'🖨️',
		'⌨️',
		'🖱️',
		'🖲️',
		'💡',
		'🔦',
		'🏮',
		'🎇',
		'🎆',
		'🧨',
		'🎈',
		'🎉',
		'🎊',
		'🎁',
		'🎗️',
		'🏷️',
		'💌',
		'📨',
		'📩',
		'📪',
		'📫',
		'📬',
		'📯',
		'📜',
		'📃',
		'📄',
		'📰',
		'🗞️',
		'📑',
		'🔖',
		'🏷️',
		'📎',
		'🖇️',
		'📐',
		'📏',
		'📝',
		'✏️',
		'🖊️',
		'🖋️',
		'🖌️',
		'🖍️',
		'🗒️',
		'📓',
		'📔',
		'📕',
		'📖',
		'📗',
		'📘',
		'📙',
		'📚',
		'📒',
		'📃',
		'📄',
		'🗂️',
		'📑',
		'🗃️',
		'🗄️',
		'📦',
		'📬',
		'📥',
		'📤',
		'📪',
		'📫',
		'📬',
		'📧',
		'📨',
		'💼',
		'👜',
		'👝',
		'🍏',
		'🍎',
		'🍐',
		'🍊',
		'🍋',
		'🍌',
		'🍉',
		'🍇',
		'🍓',
		'🍈',
		'🍒',
		'🍑',
		'🍍',
		'🥥',
		'🥝',
		'🍅',
		'🍆',
		'🥒',
		'🌶️',
		'🥬',
		'🥦',
		'🍄',
		'🌰',
		'🥜',
		'🍪',
		'🍩',
		'🍫',
		'🍬',
		'🍭',
		'🍮',
		'🍯',
		'🥧',
		'🍰',
		'🍓',
		'🍪',
		'🍿',
		'🥛',
		'🍹',
		'🍸',
		'🍷',
		'🥂',
		'🍺',
		'🍻',
		'🥃',
		'🍽️',
		'🍴',
		'🥄',
		'🥣',
		'🍚',
		'🍘',
		'🍜',
		'🍲',
		'🍛',
		'🍝',
		'🍠',
		'🥒',
		'🥔',
		'🍠',
		'🥧',
		'🍢',
		'🍙',
		'🥟',
		'🍱',
		'🍛',
		'🍗',
		'🍖',
		'🥩',
		'🍤',
		'🥓',
		'🍕',
		'🌮',
		'🌯',
		'🍔',
		'🍟',
		'🍣',
		'🍤',
		'🥪',
		'🥗',
		'🍛',
		'🍚',
		'🍜',
		'🥠',
		'🍚',
		'🍘',
		'🍡',
		'🍦',
	]
	const [ellips, setEllips] = useState<boolean>(false)
	const [search, setSearch] = useState<string>('')
	const [emoji, setEmoji] = useState<boolean>(false)

	const sendGet = [
		{
			id: 1,
			name: 'Hasan',
			img: 'data:image/jpeg;base64,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',
		},
		{
			id: 2,
			name: 'Ismoil',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRErfPBqQuKfhGayEFkykjCVNdiXcQqIbJClg&s',
		},
		{
			id: 3,
			name: 'Murod',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpq7QSVppatZIZiJibypczsTu1FDCDw0oSSA&s',
		},
		{
			id: 4,
			name: 'Umar',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSA1JDcahNtIChAZ-Ymf-ejJ_aAjatHUcdGw&s',
		},
		{
			id: 5,
			name: 'Abubakr',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp66Ec7PdpT_U8EEtNmgd2ufCdTjcSdsGchg&s',
		},
		{
			id: 6,
			name: 'Wuayb',
			img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwjGbch-tmbYGlBdUmxsqOF_ybn1-TIPZ9iw&s',
		},
	]
	useEffect(() => {
		if (isLoading || error) {
			return
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!reels?.data) return
			if (e.key === 'ArrowDown') {
				setCurrentIndex(prev => Math.min(reels.data.length - 1, prev + 1))
			}
			if (e.key === 'ArrowUp') {
				setCurrentIndex(prev => Math.max(prev - 1, 0))
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [reels?.data, isLoading, error])
	useEffect(() => {
		const token = localStorage.getItem('access_token')
		if (token) {
			try {
				const decoded = jwtDecode(token)
				setImgDecode(decoded)
			} catch (error) {
				console.error('Ошибка при декодировании JWT:', error)
			}
		}
	}, [])
	useEffect(() => {
		if (!reels?.data || currentIndex === null) return
		const video = videoRefs.current[currentIndex]

		videoRefs.current.forEach((vid, i) => {
			if (vid && i !== currentIndex) {
				vid.pause()
			}
		})

		if (video) {
			video.scrollIntoView({ behavior: 'smooth', block: 'center' })
			video.play()
			setPausedVideo(null)
		}
	}, [currentIndex, reels?.data])

	console.log(currentIndex, openedCommentDialog)

	if (isLoading)
		return (
			<div className='flex items-center'>
				<div className='flex sm:ml-[300px] mt-[10px]  flex-col m-auto items-center justify-center space-y-3'>
					<Skeleton className='w-[400px] h-[80vh] rounded-xl' />
					<div className='flex items-center mt-[10px] space-x-4 '>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-[250px]' />
							<Skeleton className='h-4 w-[200px]' />
						</div>
					</div>
				</div>
				<div className='mt-[150px] ml-[20px]'>
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[20px]' />
					<Skeleton className='h-12 w-12 rounded-full mb-[15px]' />
					<Skeleton className='h-3 w-12  mb-[40px]' />
					<Skeleton className='h-12 w-12 rounded-full mt-[60px]' />
				</div>
			</div>
		)

	const handlePlayPause = (index: number) => {
		const video = videoRefs.current[index]
		if (!video) return

		if (video.paused) {
			videoRefs.current.forEach((vid, i) => {
				if (vid && i !== index) {
					vid.pause()
				}
			})
			video.play()
			setPausedVideo(null)
		} else {
			video.pause()
		}
	}

	const handleLikeClick = (reelId: string) => {
		likeReel(reelId)
	}

	const toggleMute = () => {
		setIsMuted(prev => {
			const newMuted = !prev
			videoRefs.current.forEach(video => {
				if (video) video.muted = newMuted
			})
			return newMuted
		})
	}

	function postComment() {
		commentAddReel({ postId: idx, comment: postNameComment })
		setPostNameComment('')
	}

	function setIdxComment(userId: any) {
		throw new Error('Function not implemented.')
	}

	return (
		<div className=' sm:w-[600px]  ml-[50%] m-auto bg-green flex justify-center h-[100vh] sm:h-[100vh] items-center absolute top-0 right-[-100px] lg:right-[470px]'>
			<Carousel
				opts={{ align: 'start' }}
				orientation='vertical'
				className='ml-[10px] lg:w-[600px]  md:w-[400px] m-auto h-[100vh] sm:h-[100vh]'
			>
				<CarouselContent className='mt-[45px] md:w-[650px] w-full h-[90vh]'>
					{reels?.data?.map((reel: any, index: number) => (
						<CarouselItem key={index} className='md:basis-1/2m mt-'>
							{ellips && (
								<div className='w-[400px] absolute top-0 z-30 right-[-200px] h-[700px] bg-gray-500'></div>
							)}
							<button
								onClick={toggleMute}
								className='w-10 h-10 relative top-[100px] left-[28rem] z-20 rounded-full bg-gray-700 opacity-[0.6] hover:bg-gray-500 text-white flex items-center justify-center'
							>
								{isMuted ? (
									<VolumeOff className='cursor-pointer' />
								) : (
									<Volume2Icon className='cursor-pointer' />
								)}
							</button>
							<div className='p-1 w-[560px] m-auto flex justify-center z-10'>
								<Card className='text-center bg-transparent z-10 border-none w-[600px] h-[90vh] mt-[10px] flex justify-center items-center'>
									<CardContent className='relative z-10 w-full h-full'>
										<div className='flex justify-center w-full h-full'>
											<div className='z-10 flex'>
												<div className='z-10 flex justify-center w-full h-full'>
													<div className='relative z-10'>
														<div className='absolute inset-0 w-[450px] h-[600px] bg-black opacity-40 z-1 rounded-lg blur-lg'></div>
														<video
															ref={el => {
																if (el) videoRefs.current[index] = el
															}}
															autoPlay
															loop
															playsInline
															className='relative w-[500px] h-[700px] cursor-pointer z-1 transition-all duration-300 rounded-lg'
															onClick={() => handlePlayPause(index)}
															muted={
																pausedVideo !== null && pausedVideo !== index
															}
														>
															<source
																src={`https://instagram-api.softclub.tj/images/${reel.images}`}
																type='video/mp4'
																className='w-[100%] h-[100px]'
															/>
															Your browser does not support the video tag.
														</video>
														{pausedVideo === index && (
															<div className='absolute top-[300px] left-[200px] sm:inset-0 flex  items-center justify-center z-20 opacity-100 transition-opacity duration-100 ease-in-out'>
																<button
																	onClick={() => handlePlayPause(index)}
																	className='transition-transform duration-300 scale-95 rounded-full hover:scale-105'
																>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		width='50'
																		height='50'
																		viewBox='0 0 24 24'
																		fill='white'
																		stroke='currentColor'
																		strokeWidth='2'
																		strokeLinecap='round'
																		strokeLinejoin='round'
																		className='w-20 h-20 text-white bg-black rounded-full lucide opacity-80 p-7'
																	>
																		<polygon points='6 3 20 12 6 21 6 3' />
																	</svg>
																</button>
															</div>
														)}
														<div className='flex items-center space-x-3 text-white absolute bottom-[-50px] left-[70px] z-30'>
															<Link to={`/profile/${reel.userId}`}>
																<img
																	src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
																	className='w-12 h-12 border-2 border-white rounded-full'
																	alt='User'
																/>
															</Link>
															<div className='flex items-center sm:block'>
																<h1 className='text-lg font-semibold ml-[10px] pr-[20px]'>
																	<Link to={`/profile/${reel.userId}`}>
																		{reel.userName.length > 10
																			? reel.userName.slice(0, 5) + '...'
																			: reel.userName}
																	</Link>
																</h1>
																<h1 className='hidden sm:block text-lg font-semibold ml-[10px] pr-[40px]'>
																	{format(
																		new Date(reel.datePublished),
																		'dd MMM yyyy'
																	)}
																</h1>
																<button
																	onClick={() => {
																		followUser(reel.userId),
																			setFollow(prev => !prev)
																	}}
																	className={` sm:hidden text-sm font-medium text-white px-[10px] sm:px-5  py-[5px] sm:py-3 rounded-md bg-transparent shadow-md border-gray-500 border`}
																>
																	{reel.isSubscriber && follow
																		? 'Вы Подписаны'
																		: 'Подписаться'}
																</button>
															</div>
															<button
																onClick={() => {
																	followUser(reel.userId),
																		setFollow(prev => !prev)
																}}
																className={` hidden sm:block text-sm font-medium text-white px-5 py-3 rounded-md bg-transparent shadow-md border-gray-500 border`}
															>
																{reel.isSubscriber && follow
																	? 'Вы Подписаны'
																	: 'Подписаться'}
															</button>
														</div>
													</div>
												</div>
											</div>
											<div className='absolute bottom-[-60px] sm:bottom-[-40px] z-10 right-[120px] lg:right-5 flex flex-col items-center space-y-4'>
												<div className='flex flex-col items-center'>
													<Heart
														className={`w-6 hover:text-[#ffffff4f] h-6 ${
															reel.postLike && like
																? 'text-red-500 fill-amber-700'
																: 'text-white'
														}`}
														onClick={() => {
															handleLikeClick(reel.postId),
																setLike(prev => !prev)
														}}
													/>
													<h1>
														{like ? reel.postLikeCount + 1 : reel.postLikeCount}
													</h1>
												</div>
												<div className='flex flex-col items-center'>
													<MessageCircle
														className='w-6 h-6 hover:text-[#ffffff4f]'
														onClick={() => {
															setOpenedCommentDialog(index)
															setIdxComment(reel.userId)
															setIdx(reel.postId)
														}}
													/>
													<h1>{reel.commentCount}</h1>
												</div>
												<div className='flex flex-col items-center'>
													<AlertDialog>
													<AlertDialogTrigger asChild>
															<button>
																<Send className='hover:text-[#ffffff4f]' />
															</button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<div className='flex items-center justify-between text-center'>
																<h1 className='text-center'>Поделиться</h1>
																<AlertDialogCancel className='border-none'>
																	<X />
																</AlertDialogCancel>
															</div>
															<div>
																<Input
																	placeholder='Search'
																	onChange={el => setSearch(el.target.value)}
																/>
																<div
																	className='flex gap-[40px] flex-wrap mt-[30px]  overflow-y-scroll overflow-x-hidden'
																	style={{
																		scrollbarWidth: 'none',
																		msOverflowStyle: 'none',
																	}}
																>
																	{sendGet
																		?.filter(el =>
																			el.name
																				.toLocaleLowerCase()
																				.trim()
																				.includes(
																					search.toLocaleLowerCase().trim()
																				)
																		)
																		.map(el => {
																			return (
																				<div key={el.id} className=''>
																					<div
																						className={`w-[60px] text-center `}
																						onClick={() => {
																							setStyle(prev => !prev),
																								setActiveId(el.id)
																						}}
																					>
																						<img
																							className={`w-15 h-15 flex flex-col items-center justify-center rounded-full ${
																								el.id == activeId && style
																									? 'border-3 border-blue-500 rounded-full '
																									: 'border-none'
																							}`}
																							src={el.img}
																							alt=''
																						/>
																						<h1>{el.name}</h1>
																					</div>
																				</div>
																			)
																		})}
																</div>
															</div>
															{style ? (
																<AlertDialogCancel className='bg-blue-500'>
																	Отправить
																</AlertDialogCancel>
															) : (
																''
															)}
														</AlertDialogContent>
													</AlertDialog>
												</div>
												<div className='flex flex-col items-center'>
													<Bookmark
														className={` hover:text-[#ffffff4f]  ${
															save ? 'text-white fill-amber-50' : ''
														}`}
														onClick={() => {
															setSave(prev => !prev)
															favorite(reel.postId)
														}}
													/>
												</div>
												<div className='flex flex-col items-center'>
													<Ellipsis
														className='w-76h-76'
														onClick={() => setEllips(prev => !prev)}
													/>
												</div>
												<div className='rounded-full bg-violet-600'>
													<Link to={`/profile/${reel.userId}`}>
														<img
															src={`https://instagram-api.softclub.tj/images/${reel.userImage}`}
															className='rounded-full w-[40px] h-[40px]'
															alt=''
														/>
													</Link>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{openedCommentDialog === currentIndex && (
					<>
						{emoji && (
							<div
								className='p-4 max-w-[240px] sm:h-[240px] h-[250px] ml-[220px] absolute sm:bottom-0 bottom-[100px] sm:top-[100px] sm:right-[-400px] bg-black/50 z-[100] rounded-md overflow-hidden backdrop-blur-md overflow-y-auto'
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}
							>
								<button className='ml-[190px]' onClick={()=>setEmoji(false)}>❌</button>
								<div className='flex flex-wrap gap-2 '>
									{emojis.map((emoji, index) => (
										<div key={index} className='text-2xl'>
											<button
												onClick={() =>
													setPostNameComment(postNameComment.concat(emoji))
												}
											>
												{emoji}
											</button>
										</div>
									))}
								</div>
							</div>
						)}
						<div className='absolute top-[100px] right-[-420px]  w-[400px]  h-[70vh] sm:h-fit bg-[#262626] text-white p-4 rounded-xl shadow-lg border border-gray-700 z-50'>
							<div className='flex items-center justify-between pb-2 border-b border-gray-600'>
								<h2 className='text-lg font-semibold'>
									{reels.data[currentIndex]?.comments?.length || 0} Комментариев
								</h2>
								<button
									onClick={() => setOpenedCommentDialog(null)}
									className='text-gray-400 hover:text-white'
								>
									<X />
								</button>
							</div>

							<div
								className='max-h-[300px] overflow-y-scroll overflow-x-hidden space-y-4 mt-2'
								style={{
									scrollbarWidth: 'none',
									msOverflowStyle: 'none',
								}}
							>
								{reels.data[currentIndex]?.comments?.map(
									(comment: any, commentIndex: number) => (
										<div
											key={commentIndex}
											className='flex items-start space-x-2'
										>
											<img
												src={`https://instagram-api.softclub.tj/images/${comment.userImage}`}
												className='w-10 h-10 rounded-full'
												alt={comment.userName}
											/>
											<div>
												<p className='text-sm'>
													<span className='font-semibold'>
														{comment.userName || 'user123'}
													</span>{' '}
												</p>
												<p>
													{comment.comment.length > 6
														? comment.comment.slice(0, 8) + '...'
														: comment.comment || 'Какой классный пост! '}
												</p>
												<div className='flex items-center space-x-2 text-xs text-gray-400'>
													<span>
														{format(
															new Date(comment.dateCommented),
															'dd MMM yyy'
														)}
													</span>
													<button className='text-blue-400'>Ответить</button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button variant='ghost'>...</Button>
														</AlertDialogTrigger>
														<AlertDialogContent className=''>
															<div className='flex flex-wrap '>
																<AlertDialogFooter>
																	<AlertDialogCancel
																		className='text-red-500 w-[200px] flex items-center border-red-500 border-[1px] bg-transparent'
																		onClick={() =>
																			deletComment(comment.postCommentId)
																		}
																	>
																		Удалит <Delete className='mt-[5px]' />
																	</AlertDialogCancel>
																	<AlertDialogCancel className='w-[200px] ml-[35px]'>
																		Отменит
																	</AlertDialogCancel>
																</AlertDialogFooter>
															</div>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</div>
										</div>
									)
								)}
							</div>
							<div className='flex items-center pt-2 mt-3 border-t border-gray-600'>
								<div className='flex w-[260px] rounded-md items-center bg-transparent border-white border-[1px] p-[5px_10px] text-white outline-none'>
									{imgDecode ? (
										<img
											src='data:image/jpeg;base64,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'
											className='h-10 rounded-full w-13'
											alt='none'
										/>
									) : (
										<p>Токен не найден или не удалось декодировать</p>
									)}
									<Input
										value={postNameComment}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setPostNameComment(e.target.value)
										}
										type='text'
										placeholder='Добавьте комментарий...'
										className='text-white  border-none ml-[10px] w-[200px] overflow-x-auto overflow-y-auto focus-visible:ring-0 focus-visible:outline-none'
									/>
									<div></div>

									<button
										className='text-gray-400 pl-[10px] hover:text-white'
										onClick={() => setEmoji(prev => !prev)}
									>
										😊
									</button>
								</div>
								<Button
									variant={'secondary'}
									className='ml-2 font-semibold text-blue-500'
									onClick={postComment}
								>
									Отправить
								</Button>
							</div>
						</div>
					</>
				)}
			</Carousel>
		</div>
	)
}
