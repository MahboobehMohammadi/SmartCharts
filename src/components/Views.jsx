import React        from 'react';
import Scrollbars   from 'tt-react-custom-scrollbars';
import { connect }  from '../store/Connect';
import Tooltip      from './Tooltip.jsx';
import { wrapText } from '../utils';
import {
    TemplateIcon,
    AddIcon,
    DeleteIcon,
    EmptyStateIcon,
    OverwriteStateIcon,
} from './Icons.jsx';
import '../../sass/components/view.scss';

const ViewItem = ({
    view,
    remove,
    onClick,
}) => (
    <Tooltip
        className="sc-views__views__list__item"
        onClick={onClick}
        enabled={view.name.length > 27}
        content={wrapText(view.name, 42)}
    >
        <div className="text">{view.name}</div>
        <DeleteIcon onClick={remove} />
    </Tooltip>
);

const EmptyView = ({ onClick }) => (
    <div className="sc-views--empty">
        <EmptyStateIcon />
        <p>{t.translate('You have no saved templates yet.')}</p>
        <button type="button" className="sc-btn" onClick={onClick}>
            <AddIcon />
            {t.translate('Add new template')}
        </button>
    </div>
);

const OverwriteView = ({ templateName, onCancel, onOverwrite }) =>  (
    <div className="sc-views--overwrite">
        <div className="sc-views--overwrite__content">
            <OverwriteStateIcon />
            <p>
                {templateName + t.translate(' already exists.')}<br />
                {t.translate('Would you like to overwrite it?')}
            </p>
        </div>
        <div className="sc-views--overwrite__footer">
            <button type="button" className="sc-btn sc-btn--outline-secondary" onClick={onCancel}>
                {t.translate('Cancel')}
            </button>
            <button type="button" className="sc-btn sc-btn--primary" onClick={onOverwrite}>
                {t.translate('Overwrite')}
            </button>
        </div>
    </div>
);

const ActiveListView = ({ views, removeAll, applyLayout, remove }) => {
    if (!views.length) return '';

    return (
        <div className="sc-views__views">
            <div className="sc-views__views__head">
                <h5>{t.translate('Saved templates')}</h5>
                <button
                    type="button"
                    onClick={removeAll}
                    className="sc-btn sc-btn--sm sc-btn--outline-secondary"
                >
                    {t.translate('Clear all')}
                </button>
            </div>
            <div className="sc-views__views__content">
                <div className="sc-views__views__list">
                    {
                        views.map((view, i) => (
                            <ViewItem
                                view={view}
                                key={view.name}
                                onClick={e => applyLayout(i, e)}
                                remove={e => remove(i, e)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

const Views = ({
    ViewsMenu,
    menuOpen,
    views,
    currentRoute,
    onToggleNew,
    routes: { main, overwrite },
    onChange,
    onSubmit,
    applyLayout,
    remove,
    inputRef,
    saveViews,
    templateName,
    removeAll,
    isInputActive,
    onFocus,
    onBlur,
    portalNodeId,
}) => {
    const isActive = isInputActive || templateName !== '';

    return (
        <ViewsMenu
            className="sc-views-menu"
            title={t.translate('Templates')}
            tooltip={t.translate('Templates')}
            newStyle
            portalNodeId={portalNodeId}
        >
            <ViewsMenu.Title>
                <div className={`sc-views__menu ${menuOpen ? 'sc-views__menu--active' : ''}`}>
                    <TemplateIcon />
                </div>
            </ViewsMenu.Title>
            <ViewsMenu.Body>
                <div className="sc-views">
                    {(currentRoute === 'new')
                        ? (<EmptyView onClick={onToggleNew} />)
                        : (
                            <React.Fragment>
                                {
                                    currentRoute !== 'overwrite' ? '' : (
                                        <OverwriteView
                                            templateName={templateName}
                                            onCancel={main}
                                            onOverwrite={overwrite}
                                        />
                                    )
                                }
                                <Scrollbars
                                    className="sc-scrollbar"
                                >
                                    <div className="form form--sc-views">
                                        <div className="form__input-group">
                                            <div className="form__group">
                                                <div className="form__control">
                                                    <div className={`form--sc-views__input ${isActive ? 'form--sc-views__input--active' : ''}`}>
                                                        <div className="subtitle">
                                                            <span>{t.translate('Add new templates')}</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className={`sc-input ${isActive ? 'sc-input--active' : ''}`}
                                                            placeholder={isActive ? '' : t.translate('Add new templates')}
                                                            ref={inputRef}
                                                            value={templateName}
                                                            onKeyUp={onSubmit}
                                                            onChange={onChange}
                                                            onFocus={onFocus}
                                                            onClick={onFocus}
                                                            onBlur={onBlur}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={saveViews}
                                                            className={`sc-btn sc-btn--primary ${isActive ? '' : 'sc-btn--primary--disabled'}`}
                                                        >
                                                            <AddIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ActiveListView
                                        views={views}
                                        removeAll={removeAll}
                                        applyLayout={applyLayout}
                                        remove={remove}
                                    />
                                </Scrollbars>
                            </React.Fragment>
                        )
                    }
                </div>
            </ViewsMenu.Body>
        </ViewsMenu>
    );
};


export default connect(({ view: s }) => ({
    ViewsMenu: s.ViewsMenu,
    views: s.sortedItems,
    routes: s.routes,
    onOverwrite: s.onOverwrite,
    onChange: s.onChange,
    remove: s.remove,
    onSubmit: s.onSubmit,
    applyLayout: s.applyLayout,
    menuOpen: s.menu.dialog.open,
    inputRef: s.inputRef,
    currentRoute: s.currentRoute,
    templateName: s.templateName,
    onToggleNew: s.onToggleNew,
    saveViews: s.saveViews,
    removeAll: s.removeAll,
    isInputActive: s.isInputActive,
    onFocus: s.onFocus,
    onBlur: s.onBlur,
}))(Views);
