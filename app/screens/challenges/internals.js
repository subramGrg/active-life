import images from '@styles/images'

export const statusImage = ({ won, type, rank, }) => {
  let imageSrc = won ? images.tick : images.cross

  if (type === 'leaderboard' && rank === 1) {
    imageSrc = images.star
  }

  return imageSrc
}

export const format = (num) => Number(num).toLocaleString()
