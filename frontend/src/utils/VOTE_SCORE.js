export const VOTE_SCORE = [
  {
    label: 'High vote score first',
    value: 'high',
    postSortField: '-voteScore'
  },
  {
    label: 'Less vote score first',
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