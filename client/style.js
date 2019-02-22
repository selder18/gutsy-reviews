module.exports = {
  indexStyling: {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    // padding: '5px',
    height: '100%'
  },

  submit: {
    main: {
      paddingBottom: '10px',
      height: '25%',
      minHeight: '150px',
      maxHeight: '250px'
    },
    form: {
      height: '100%'
    },
    text: {
      width: 'calc(100% - 70px)',
      height: '85%',
      padding: '5px',
      resize: 'none',
      borderRadius: '15px',
      border: '1px #bababa solid'
    },
    username: {
      marginLeft: '2px',
      borderRadius: '5px',
      border: '1px #bababa solid',
      paddingLeft: '5px'
    },
    button: {
      borderRadius: '5px'
    }
  },

  list: {
    outer: {
      flex: '1',
      borderTop: '1px #242121 solid',
      paddingTop: '5px',
      overflow: 'auto'
    },
    inner: {
      height: '100%',
    }
  },
  
  item: {
    table: {
      width: '100%',
      display: 'inline-table'
    },
    topRow: {
      height: '25px'
    },
    image: {
      position: 'absolute',
      top: '0px',
      borderRadius: '50%',
      width: '60px',
      height: '60px'
    },
    userInfo: {
      valign: 'center'
    },
    imageContainer: {
      position: 'relative',
      width: '75px'
    },
    username: {
      fontSize: '20px',
      color: '#023750'
    },
    timestamp: {
      color: 'grey'
    },
    review: {
      wordWrap: 'normal',
      colSpan: 4,
      whiteSpace: 'pre-wrap'
    }
  }
};