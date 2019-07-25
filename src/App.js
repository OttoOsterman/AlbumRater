import React from 'react';
import Firebase from 'firebase';
import pic from './pics/react1.png';
import Album from './Album';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faBeer, faCompactDisc, faMusic, faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
library.add(fab, faCheckSquare, faCoffee, faBeer, faCompactDisc, faMusic, faUser, faNewspaper);


class App extends React.Component {

    constructor(props){
        super(props);
        //Firebase.initializeApp(config.firebase);

        this.state = {
            albums: []
        };
    }
    writeData = () => {
        Firebase.database().ref('/').set(this.state);
        console.log('DATA SAVED');
    };

    getData = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
        console.log('DATA RETRIEVED');
    };

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
            this.writeData();
        }
    }

    render() {
        const { albums } = this.state;

        return(

            <div className="container" style={{marginLeft: '8%'}}>
                <Album/>
                <div className="row">
                    <div className='col-xl-12'>
                        <h1>All albums</h1>
                    </div>
                </div>
                {/*<div className='row'*/}
                    {/*style={{display: "flex",justifyContent: "center",margin: 20,padding: 20}}>*/}
                    {/*<div className='col-xl-12'>*/}
                    {/*<form onSubmit={ this.handleSubmit } style={{ width: "50%" }}>*/}
                        {/*<div className="form-row">*/}
                        {/*<h1>Add new album</h1>*/}
                        {/*<input type='hidden' ref='uid' />*/}
                        {/*<FormControl margin="normal" fullWidth>*/}
                            {/*<InputLabel htmlFor="artist">Artist</InputLabel>*/}
                            {/*<Input type="text" ref='artist' className="form-control" placeholder="Artist"/>*/}
                        {/*</FormControl>*/}

                        {/*<FormControl margin="normal" fullWidth>*/}
                            {/*<InputLabel htmlFor="title">Title</InputLabel>*/}
                            {/*<Input type="text" ref='title' className="form-control" placeholder="Title"/>*/}
                        {/*</FormControl>*/}

                        {/*<FormControl margin="normal" fullWidth>*/}
                            {/*<InputLabel htmlFor="review">Review</InputLabel>*/}
                            {/*<Input type="text" ref='review' className="form-control" placeholder="Review" multiline rows={10} />*/}
                        {/*</FormControl>*/}
                        {/*</div>*/}
                        {/*<Button type="submit" variant="contained" color="primary" size="medium">*/}
                            {/*Add album*/}
                        {/*</Button>*/}
                    {/*</form>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className='row'>
                    <div className='col-xl-12'>
                        <h1>Add new album here</h1>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-row">
                                <input type='hidden' ref='uid' />
                                <div className="form-group col-md-6">
                                    <label>Artist</label>
                                    <input type="text" ref='artist' className="form-control" placeholder="Artist" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Title</label>
                                    <input type="text" ref='title' className="form-control" placeholder="Title" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Review</label>
                                    <input type="text" ref='review' className="form-control" placeholder="Review" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className='col-xl-12' style={{display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
                    {albums.map(album =>
                    <Card key={album.uid} className="card float-left"  style={{margin: '4% 8% 4% 0%'}}>
                        <CardActionArea>
                            <CardMedia
                                style={{height: 0, paddingTop: '80%'}}
                                image={pic}
                                title="Album art"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h5">
                                    { album.title }
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    by { album.artist }
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    { album.review }
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={ () => this.removeData(album) } className="btn btn-link">
                                Delete
                            </Button>
                            <Button size="small" color="primary" onClick={ () => this.updateData(album) } className="btn btn-link">
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                    )}
                </div>
                <Footer/>
            </div>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let artist = this.refs.artist.value;
        let title = this.refs.title.value;
        let review = this.refs.review.value;
        let uid = this.refs.uid.value;

        if (uid && artist && title){
            const { albums } = this.state;
            const devIndex = albums.findIndex(data => {
                return data.uid === uid
            });
            albums[devIndex].artist = artist;
            albums[devIndex].title = title;
            albums[devIndex].review = review;
            this.setState({ albums });
        }
        else if (artist && title ) {
            const uid = new Date().getTime().toString();
            const { albums } = this.state;
            albums.push({ uid, artist: artist, title:title, review: review });
            this.setState({ albums });
        }

        this.refs.artist.value = '';
        this.refs.title.value = '';
        this.refs.review.value = '';
        this.refs.uid.value = '';
    };

    removeData = (album) => {
        const { albums } = this.state;
        const newState = albums.filter(data => {
            return data.uid !== album.uid;
        });
        this.setState({ albums: newState });
    };

    updateData = (album) => {
        this.refs.uid.value = album.uid;
        this.refs.artist.value = album.artist;
        this.refs.title.value = album.title;
        this.refs.review.value = album.review;
    }
}

export function Footer() {

    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{paddingTop: '5%'}}>
            {'Built with love by  '}
            <Link color="inherit" href="https://www.linkedin.com/in/otto-%C3%B6sterman-73a427108/">
                Otto
            </Link>
        </Typography>
    );
}
export default App;