import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  list: {
    listStyle: 'none',
    padding:'0',
    margin:'0',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  },
  item: {
    minWidth: '200px',
    maxWidth: '800px',
    flex: '1 1 auto',
  }
});
