import React from 'react';
import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';
import { localize } from '../../../../../_common/localize';

class AccountSwitcher extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            is_collapsed  : false,
            active_account: this.props.active_account[0],
        };
    }

    toggleAccountsList = () => {
        this.setState({
            is_collapsed: !this.state.is_collapsed,
        });
        this.refreshWindowSize();
    }

    refreshWindowSize() {
        if (this.props.has_iscroll) {
            // workaround for iScroll when drawer items expand (iScroll refreshes on window resize)
            if (typeof(Event) === 'function') {
                // modern browsers
                window.dispatchEvent(new Event('resize'));
            }
            else {
                // for IE and other old browsers
                // causes deprecation warning on modern browsers
                const evt = window.document.createEvent('UIEvents');
                evt.initUIEvent('resize', true, false, window, 0);
                window.dispatchEvent(evt);
            }
        }
    }

    switchAccount = (account) => {
        this.setState({
            active_account: account,
        });
        if (account.id !== this.state.active_account.id) {
            if (this.props.onChange) {
                this.props.onChange({ target: { name: 'currency', value: account.account_type } });
            }
        }
    }

    render() {
        const account_list_collapsed = {
            visibility: `${this.state.is_collapsed ? 'visible' : 'hidden'}`,
        };

        const account_is_hidden = (account) => {
            if (account.id === this.state.active_account.id) {
                return true;
            }
            return false;
        };

        return (
            <div className='acc-switcher-container'>
                <div className='acc-switcher-header' onClick={this.toggleAccountsList}>
                    <div className={`acc-switcher-active-login ${this.state.is_collapsed ? 'collapsed' : ''}`}>
                        <p className='acc-switcher-accountid'>{this.state.active_account.id}</p>
                        <p className='acc-switcher-currency'>{`${this.state.active_account.account_type} ${localize('Account')}`}</p>
                    </div>
                </div>
                <div
                    className={`acc-switcher-list ${this.state.is_collapsed ? 'collapsed' : ''}`}
                    style={account_list_collapsed}
                >
                <ReactIScroll
                    iScroll={iScroll}
                    options={{ mouseWheel: true, scrollbars: true, fadeScrollbars: true }}
                >
                    <div className='acc-switcher-items'>
                        {this.props.accounts.map((account, idx) => (
                            <React.Fragment key={idx}>
                                <div
                                    className={`acc-switcher-account ${account_is_hidden(account) ? 'hide' : ''}`}
                                    onClick={this.switchAccount.bind(null, account)}
                                >
                                    <p className='acc-switcher-accountid'>{account.id}</p>
                                    <p className='acc-switcher-currency'>{`${account.account_type} ${localize('Account')}`}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </ReactIScroll>
                </div>
            </div>
        );
    }
}

AccountSwitcher.defaultProps = {
    accounts: [
      { id: 'VRTC1234567', account_type: 'Virtual' },
      { id: 'CR198765',    account_type: 'USD' },
      { id: 'CR986754',    account_type: 'BTC' },
      { id: 'CR985761',    account_type: 'ETH' },
      { id: 'CR247698',    account_type: 'LTC' },
      { id: 'CR579857',    account_type: 'BCH' },
    ],
};

export default AccountSwitcher;
