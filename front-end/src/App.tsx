import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
 
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);
 
const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
  ]
};

function App() {
  return (
    <div className="AppWrapper">
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <PaymentForm />
    </Elements>
  </div>
  );
}
 
export default App;