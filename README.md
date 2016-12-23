# D-A-D Project 

Dad is a project for an intern leboncoin. That's why there is no messages system or something like that.
It allows user to create classified advertisement.

## Starter
- clone the project
- run npm install into your terminal
- open localhost:3000


## Table of Contents


## TODO List
[x] Add image upload
[x] Update header related to user props
[x] Display a placeholder for no image
[x] Send action when popin is displayed to avoid "underscoll"
[x] Display uploaded image after upload/create
[x] Display button next and previous classified advertisement
[x] Display insert for logged user
[] Add easter eggs
[] Add more easter eggs
[] Allow user to show ca's image in full size
[x] Allow user to put/remove from sale an item
[] Use local datas for react-select
[x] Implements log out
[] Manage anti-csrf token




shouldComponentUpdate(nextProp, nextState) {
  return !(_.isEqual(nextProp, this.props) && _.isEqual(nextState, this.state));
}