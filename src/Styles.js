const isBrowser = typeof window !== undefined;
const styles = {
  navbar: {
    fontFamily: ["Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif'],
    top: 0,
    left: 0,
    width: '100%',
    minWidth: '1280px',
    position: 'fixed',
    backgroundColor: '#61dafb',
    height: '60px',
    color: 'white',
    fontSize: '2.9em',
    fontWeight: 'bolder',
    textAlign: 'center',
    zIndex: 999
  },
  sup: {
    fontSize: '30%',
    top: '-1.9em'
  },
  Home: {
    flexContainer: {
      paddingTop: '115px',
      justifyContent: 'center',
      alignItems: 'center',
      boxAlign: 'center',
      flexAlign: 'center',
      flexDirection: 'row'
    },
    homeSection: {
      minWidth: '1280px',
      marginTop: '-65px',
      height: '780px',
      backgroundColor: '#E0E0E0',
      textAlign: 'center',
    },
    homeHeader: {
      textAlign: 'center',
      color: '#4F4F4F',
      marginTop: '70px',
      marginBottom: '10px',
      fontSize: '36px',
      fontFamily: ["Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif'],
      fontWeight: '500',
      lineHeight: '1.1',
      display: 'block'
    },
    homeParagraph: {
      textAlign: 'center',
      color: '#4F4F4F',
      fontSize: '1.5em',
      marginBottom: '10px',
      display: 'block',
      fontFamily: ["Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif']
    },
    getStarted: {
      backgroundColor: '#FC913A',
      borderColor: '#FC913A',
      padding: '10px 20px',
      borderRadius: '50px',
      margin: '20px 0px 40px 0px',
      display:'inline-block',
      fontSize: '18px',
      fontWeight: '400',
      fontFamily: ["Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif'],
      lineHeight: '1.33333',
      color: '#fff',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      touchAction: 'manipulation',
      cursor: 'pointer',
      userSelect: 'none',
      backgroundImage: 'none',
      border: '1px solid transparent',
    },
    Instructions: {
      instructionsSection: {
        minWidth: '1280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '-40px'
      },
      instructions: {
        width: '330px',
        height: '330px',
        display: 'inline-block',
        borderRadius: '20px',
        verticalAlign: 'middle',
        margin: '35px',
        backgroundColor: 'white',
        textAlign: 'center',
        fontFamily: ["Helvetica Neue", 'Helvetica', 'Arial', 'sans-serif'],
      },
      instructionsImg: {
        width: '300px',
        margin: '10px',
        verticalAlign: 'middle',
        border: 0
      },
      instructionsParagraph: {
        textAlign: 'center',
        color: '#4F4F4F',
        marginTop: '0px',
        marginBottom: '0px'
      },
      instructionsHr: {
        color: '#4F4F4F',
        textAlign: 'center',
        fontSize: '24px',
        marginTop: '20px',
        marginBottom: '10px',
        fontWeight: 500,
        lineHeight: 1.1,
        border: '1px solid white'
      }
    }
  },
}

export default styles;
