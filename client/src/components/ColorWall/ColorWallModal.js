import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "15px",
    overflow: "auto",
    "& .MuiPaper-rounded": {
      borderRadius: "24px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
    },
  },
  avatar: {
    height: "80px",
    width: "80px",
    border: "2px solid white",
    "&:hover": {
      border: "2px solid pink",
    },
  },
  modalInitialsLogo: {
    textDecoration: "none",
    color: "white",
    "&:hover": {
      color: "lightblue",
    },
  },
  cardDescription: {
    [theme.breakpoints.down("xs")]: {
      paddingRight: "10px",
    },
  },
  modalUsernameLink: {
    fontSize: "15px",
    marginLeft: "2px",
    marginRight: "2px",
    backgroundColor: "black",
    color: "white",
    padding: "3px",
    borderRadius: "5px",
    textDecoration: "none",
    "&:hover": {
      color: "pink",
    },
  },
  modalPostLink: {
    fontSize: "15px",
    backgroundColor: "black",
    color: "white",
    padding: "3px",
    borderRadius: "5px",
    textDecoration: "none",
    "&:hover": {
      color: "pink",
    },
  },
  modalSignupBtn: {
    backgroundColor: "#4d3b58",
    color: "white",
    margin: "0px 5px 10px 10px",
    padding: "5px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "10px",
    "&:hover": {
      color: "black",
      backgroundColor: "#c9c4cc",
    },
  },
}));

function ColorWallModal(props) {
  const openedPost = props.openedPost;
  const user = props.user;
  const open = props.open;
  const handleClose = props.handleClose;
  const addLike = props.addLike;
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.root}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              component={Link}
              to={
                openedPost.User !== undefined
                  ? `/users/${openedPost.User.id}`
                  : ""
              }
              aria-label="user"
              className={classes.avatar}
              alt={
                openedPost.User !== undefined
                  ? `${openedPost.User.username}-modal-${openedPost.id}`
                  : ""
              }
              src={
                openedPost.User !== undefined
                  ? openedPost.User.profilePic
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
            ></Avatar>
          }
          title={openedPost.title}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          component="h4"
          style={{ margin: "-15px 10px 10px 15px" }}
        >
          posted by{" "}
          {openedPost.User !== undefined ? (
            <Typography
              className={classes.modalUsernameLink}
              component={Link}
              to={
                openedPost.User !== undefined
                  ? `/users/${openedPost.User.id}`
                  : ""
              }
            >
              {openedPost.User !== undefined ? openedPost.User.username : ""}
            </Typography>
          ) : (
            <div></div>
          )}
        </Typography>
        <img
          style={{ width: "100%" }}
          src={
            openedPost.imageUrl
              ? openedPost.imageUrl
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt={`${openedPost.title}-img`}
        ></img>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h4">
            posted on{" "}
            {openedPost.createdAt !== undefined ? (
              <span>
                {openedPost.createdAt !== undefined
                  ? openedPost.createdAt.slice(0, 10)
                  : ""}
              </span>
            ) : (
              <div></div>
            )}
          </Typography>

          {openedPost.description !== "" ? (
            <div>
              <br></br>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.cardDescription}
              >
                {openedPost.description}
              </Typography>
              <br></br>
            </div>
          ) : (
            <div></div>
          )}

          {openedPost.postLink !== "" ? (
            <Typography variant="body2" color="textSecondary" component="p">
              <span>website: </span>
              <a
                className={classes.modalPostLink}
                target="__blank"
                href={openedPost.postLink}
              >
                {openedPost.postLink
                  ? openedPost.postLink.split("//").pop().split("/")[0]
                  : "website"}
              </a>
            </Typography>
          ) : (
            <div></div>
          )}

          <br></br>
          <Typography variant="body2" color="textSecondary" component="p">
            <span>
              price:{" "}
              <span style={{ fontWeight: "bold" }}>${openedPost.price}</span>
            </span>
          </Typography>
        </CardContent>
        <br></br>
        {user !== undefined ? (
          user.email ? (
            <CardActions disableSpacing>
              <IconButton onClick={() => addLike()} aria-label="Add like">
                <FavoriteIcon style={{ color: "red" }} />
              </IconButton>
            </CardActions>
          ) : (
            <>
              <Typography
                variant="body2"
                color="textSecondary"
                component={Link}
                to="/signup"
                className={classes.modalSignupBtn}
              >
                <span>sign up or log in to like this post</span>
              </Typography>
              <br></br>
            </>
          )
        ) : (
          <></>
        )}
      </Card>
    </Dialog>
  );
}

export default ColorWallModal;
