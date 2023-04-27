import { IntlProvider } from '../AppContext/I18n';
import Theme from '../AppContext/Theme';
import type { PropsWithChildren } from 'react';

export function AppContext({ children }: PropsWithChildren) {
  return (
    <Theme>
      <IntlProvider>{children}</IntlProvider>
    </Theme>
  );
}
