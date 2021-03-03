

### Project execution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

`npm start` :   Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test` : Launches the test runner in the interactive watch mode.


### `Workflow/Tasks Completed `
1. When the user doesn't have any input or clears the input, the input fields is shown in the middle of the page.
2. The input field is available for the user to search for users or repositories and a dropdown is available for the user to choose between users and repositories.
3. Once the user starts typing the input field moves to the top of the page as per the requirement.
4. API call is made when the user types 3 or more characters in the input field and press/click on enter key. I have wrapped the input field around the form in order to reduce multiple API calls. I could have debounced making calls say at an interval for 500ms but I felt that is not a good UI design as it gives users the feeling that nothing is happening while they are typing. So preferred making click on enter key just like how Github is currently implemented.
5. While the API call is resolving the user can see "Loading..." on the screen. Once the response is received user information is displayed below the input fields in grids. ( 2 columns if screen width < 768px else it displays in 3 columns).
6. The user's info displays the user image and user name. The repositories display info like name, repository language, private/public repo, published date and time, stars, watchers, forks, open issues, and the user image.
7. The user can scroll down to see more results ( Infinite scrolling ) until the results are done.
8. If the user clears the input or types less than three characters, the grid clears the results and shows the empty screen.
9. If the user changes the "Entity Type" value in the dropdown and the user has 3 or more characters in the input already, the results get refreshed only on clicking upon enter key( Again could have the API call on change of entity but I wanted to maintain consistency in the workflow of how the API calls are made).
10. On click on the user image it redirects them to the GitHub profile of that user.
11. I am maintaining the recent searches done by users specific to the entity type. Currently showing the last 3 recent searches( this number can be configured according to our needs).
12. On click of the recent search string, refreshes the data accordingly (Debounce function is used to avoid multiple clicks).
13. The app is designed using styled-components. The screens are responsive and also mobile-friendly.
 
 ### `Opinions/Assumptions`
In my opinion, it is not a good idea to save the API response data as the data is volatile.
I understand storing the data would make rendering faster. However, I feel we should consider that with multiple requests the data will also grow and at one point it may not be sustainable. If the data gets large, it will take longer to fetch the data ( I understand we can do pagination and send only a subset of data. But I just feel it just gets complicated going forward). Since the data, we are dealing with is volatile. we might face data sync issues as there won't be API calls, which means we cant be sure of the data validity( However we could fetch the data and store it again or flush it after certain intervals).


### `Error Handling`
If the API rate limit is exceeded, we display a message "API rate limit exceeded for your IP. Check out GitHub API documentation for more details ".
If the user/repository doesn't exist in GitHub, an message with the content - "0 users/ repository found" is displayed on the screen.
