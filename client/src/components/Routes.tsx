import { Route, Switch } from "wouter";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Index} />
      <Route path="/home" component={Index} />
      <Route component={NotFound} />
    </Switch>
  );
};