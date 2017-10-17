export const VOTE_SCORE = [
  {
    label: 'More positive votes first',
    value: 'high',
    postSortField: '-voteScore'
  },
  {
    label: 'More negative votes first',
    value: 'less',
    postSortField: 'voteScore'
  },
  {
    label: 'Recent first',
    value: 'recent',
    postSortField: 'postDate'
  }
]

export default VOTE_SCORE