// These are the constants to represent each of three recommended actions for a single API fetch or post.
export const FETCH_SUBSCRIPTION_BEGIN   = "FETCH_SUBSCRIPTION_BEGIN";
export const FETCH_SUBSCRIPTION_SUCCESS = "FETCH_SUBSCRIPTION_SUCCESS";
export const FETCH_SUBSCRIPTION_FAILURE = "FETCH_SUBSCRIPTION_FAILURE";

// This as an entrypoint action that we use within our component to trigger communication with API.
// Essentially it is a hight order function that wraps complex state mutation and know how and when
// to dispatch dependent actions.
export function fetchSubscription(subscriptionEndpointUrl) {
  // dispatch is a hook for `redux-thunk`. Since we have `async` requests to the API, we need to
  // 'embed' on `dispatch` into another to 'help' `redux-thank` to synchronize actions and avoid
  // data race conditions during state mutation. This allows us to 'orchestrate' our actions.
  return dispatch => {

    // Triggers application state to change to display "loading" indicator, for example.
    dispatch(fetchSubscriptionBegin(subscriptionEndpointUrl));

    // Delay two seconds to see an loading indicator on the screen. Remove this timeout for your app.
    setTimeout(() => {

      return fetch(subscriptionEndpointUrl).then(handleErrors).then(res => res.json()).then(json => {
        // We can display information from the API within the our component by triggering successful action
        // for our reducer and passing data in from the API.
        dispatch(fetchSubscriptionSuccess(json));
      }).catch(error => {
        // This is some unexpected crash, so we dispatch action to pass this error into our Reducer.
        // Also, see `handleErrors` function below for the clarification.
        dispatch(fetchSubscriptionFailure(`${error}`));
      });

    }, 2000);

  }
}

export const fetchSubscriptionBegin = (subscriptionId) => ({
  // This action is used to tell Reducer that we are starting to ask for data
  // from the API. As an example, Reducer sets application State to display "loading" indicator.
  type: FETCH_SUBSCRIPTION_BEGIN,
  subscriptionId: subscriptionId,
});

export const fetchSubscriptionSuccess = payload => ({
  // All went well. We received our data from the API. `payload` is a JSON object that we
  // received from the API.
  type: FETCH_SUBSCRIPTION_SUCCESS,
  payload: payload,
});

export const fetchSubscriptionFailure = (error) => ({
  // An Action that notifies Reducer about a fact that something went wrong during data fetch.
  // `error` object here represents an error message that we could potentially get from the API.
  type: FETCH_SUBSCRIPTION_FAILURE,
  payload: error,
});

// Always handle errors by throwing exception for the promise handler to catch and process it properly
function handleErrors(response) {
  if (!response.ok) { throw Error(JSON.stringify(response)) }
  return response;
}
