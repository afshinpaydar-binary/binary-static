import PropTypes       from 'prop-types';
import React           from 'react';
import { localize }    from '_common/localize';
import { connect }     from 'Stores/connect';
import Localize        from 'App/Components/Elements/localize.jsx';
import MediaItem, {
    MediaHeading,
    MediaIcon,
    MediaDescription,
}                      from 'App/Components/Elements/Media';
import Checkbox        from 'App/Components/Form/Checkbox';
import RadioGroup      from 'App/Components/Form/Radio';

const ChartSettings = ({
    is_asset_visible,
    is_countdown_visible,
    is_layout_default,
    toggleAsset,
    toggleCountdown,
    toggleLayout,
}) => (
    <div className='settings-chart'>
        <MediaItem>
            <MediaHeading>
                <Localize str='Toolbar position' />
            </MediaHeading>
            <MediaDescription>
                <MediaIcon />
                <div className='media__form'>
                    <p><Localize str='Change chart control positions' /></p>
                    <RadioGroup
                        items={[
                            {
                                label: 'Bottom',  // localization will be handled in RadioGroup
                                value: true,
                            },
                            {
                                label: 'Left',
                                value: false,
                            },
                        ]}
                        selected={is_layout_default}
                        onToggle={toggleLayout}
                    />
                </div>
            </MediaDescription>
        </MediaItem>
        <MediaItem>
            <MediaHeading>
                <Localize str='Open-High-Low-Close (OHLC) information' />
            </MediaHeading>
            <MediaDescription>
                <MediaIcon />
                <div className='media__form'>
                    <Checkbox
                        value={is_asset_visible}
                        label={localize('Display OHLC information for current chart')}
                        onClick={toggleAsset}
                    />
                </div>
            </MediaDescription>
        </MediaItem>
        <MediaItem>
            <MediaHeading>
                <Localize str='Interval duration' />
            </MediaHeading>
            <MediaDescription>
                <MediaIcon />
                <div className='media__form'>
                    <Checkbox
                        value={is_countdown_visible}
                        label={localize('Display remaining time for each interval')}
                        onClick={toggleCountdown}
                    />
                </div>
            </MediaDescription>
        </MediaItem>
    </div>
);

ChartSettings.propTypes = {
    is_asset_visible    : PropTypes.bool,
    is_countdown_visible: PropTypes.bool,
    is_layout_default   : PropTypes.bool,
    toggleAsset         : PropTypes.func,
    toggleCountdown     : PropTypes.func,
    toggleLayout        : PropTypes.func,
};

export default connect(({ ui }) => (
    {
        is_layout_default   : ui.is_chart_layout_default,
        is_asset_visible    : ui.is_chart_asset_info_visible,
        is_countdown_visible: ui.is_chart_countdown_visible,
        toggleAsset         : ui.toggleChartAssetInfo,
        toggleCountdown     : ui.toggleChartCountdown,
        toggleLayout        : ui.toggleChartLayout,
    }
))(ChartSettings);
