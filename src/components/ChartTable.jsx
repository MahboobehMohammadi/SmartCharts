import React from 'react';
import { Scrollbars } from 'tt-react-custom-scrollbars';
import { CloseBoldIcon, ItemIconMap, SymbolPlaceholderIcon } from './Icons.jsx';
import { connect } from '../store/Connect';
import '../../sass/components/_ciq-chart-table.scss';
import ChartTableGroup from './ChartTableGroup.jsx';

const ChartTable = ({
    isMobile,
    tableData,
    Dialog,
    open,
    isTick,
    symbol,
    setOpen,
    scrollTop,
    scrollPanelTop,
    updateScrollSpy,
    setScrollPanel,
    activeHeadKey,
    activeHeadTop,
    dateElements,
}) => {
    const SymbolIcon = ItemIconMap[symbol.symbol] || SymbolPlaceholderIcon;
    const width = isTick ? '380px' : '704px';

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={`cq-dialog-overlay ${open ? 'cq-dialog-active' : ''}`} style={{ '--table-width': width }}>
            <Dialog className="cq-dialog ciq-chart-dialog">
            <>
                {isMobile && (
                    <div className="cq-titlebar">
                        {SymbolIcon && <SymbolIcon className={`ic-${symbol.symbol}`} />}
                        <div className="cq-title">{`${symbol.name} ${t.translate('Chart Table')}`}</div>
                        <CloseBoldIcon className="icon-close-menu" onClick={handleClose} />
                    </div>
                )
                }
                {isMobile ? '' : (
                    <table className="ciq-chart-table">
                        <thead>
                            <tr>
                                <th>{t.translate('Date')}</th>
                                {isTick
                                    ? <th>{t.translate('Tick')}</th>
                                    : (
                                        <React.Fragment>
                                            <th>{t.translate('Open')}</th>
                                            <th>{t.translate('High')}</th>
                                            <th>{t.translate('Low')}</th>
                                            <th>{t.translate('Close')}</th>
                                        </React.Fragment>
                                    )
                                }
                                <th className="before-last-child">
                                    <div className="cq-change-cell">
                                        {t.translate('Change')}
                                    </div>
                                </th>
                                <th>
                                    <CloseBoldIcon className="icon-close-menu" onClick={handleClose} />
                                </th>
                            </tr>
                        </thead>
                    </table>
                )}
                <Scrollbars
                    className="ciq-chart-table__panel"
                    onScroll={updateScrollSpy}
                    ref={setScrollPanel}
                >
                    {isMobile
                        ? (
                            <table className="ciq-chart-table">
                                <tbody>
                                    {tableData.map(item => (
                                        <tr
                                            key={`chartTable-${item.date}`} // eslint-disable-line react/no-array-index-key
                                        >
                                            <td>
                                                <div>
                                                    <div className="ciq-table-date">{item.Date}</div>
                                                    <div className={`${item.Status ? item.Status : 'up'}`}>{item.Change}</div>
                                                    <div className={`cq-change ${item.Status}`} />
                                                </div>
                                                <div>
                                                    {isTick && <div><span>{t.translate('Close')}</span>{item.Close}</div>}
                                                    {!isTick
                                                    && [
                                                        <div key="item-open"><span>{t.translate('O')}</span>{item.Open}</div>,
                                                        <div key="item-high"><span>{t.translate('H')}</span>{item.High}</div>,
                                                        <div key="item-low"><span>{t.translate('L')}</span>{item.Low}</div>,
                                                        <div key="item-close"><span>{t.translate('C')}</span>{item.Close}</div>,
                                                    ]}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                        : (
                            tableData.map(item => (
                                <ChartTableGroup
                                    key={item.key}
                                    item={item}
                                    isTick={isTick}
                                    ele={dateElements[item.key]}
                                    scrollTop={scrollTop}
                                    scrollPanelTop={scrollPanelTop}
                                    activeHeadKey={activeHeadKey}
                                    activeHeadTop={activeHeadTop}
                                />
                            ))
                        )
                    }
                </Scrollbars>
            </>
            </Dialog>
        </div>
    );
};

export default connect(({  chart, chartTable }) => ({
    isMobile: chart.isMobile,
    tableData: chartTable.tableData,
    Dialog: chartTable.Dialog,
    open: chartTable.open,
    isTick: chartTable.isTick,
    symbol: chartTable.symbol,
    setOpen: chartTable.setOpen,
    scrollTop: chartTable.scrollTop,
    dateElements: chartTable.dateElements,
    scrollPanelTop: chartTable.scrollPanelTop,
    updateScrollSpy: chartTable.updateScrollSpy,
    setScrollPanel: chartTable.setScrollPanel,
    setDateElement: chartTable.setDateElement,
    activeHeadTop: chartTable.activeHeadTop,
    activeHeadKey: chartTable.activeHeadKey,
}))(ChartTable);
