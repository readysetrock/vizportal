/// <reference path="../lib/angular/angular.d.ts" />
/// <reference path="../lib/angular/angular-cookies.d.ts" />
/// <reference path="../lib/angular/angular-sanitize.d.ts" />
/// <reference path="../lib/angular/angular-translate.d.ts" />
/// <reference path="../lib/angular/angular-ui-router.d.ts" />
/// <reference path="../lib/cldr/cldr.d.ts" />
/// <reference path="../lib/flux/flux.d.ts" />
/// <reference path="../lib/globalize/globalize.d.ts" />
/// <reference path="../lib/jquery/jquery.d.ts" />
/// <reference path="../lib/jquery/jquery.caret-1.5.2.d.ts" />
/// <reference path="../lib/q/Q.d.ts" />
/// <reference path="../lib/react/react-addons-global.d.ts" />
/// <reference path="../lib/rsa/rsa.d.ts" />
/// <reference path="../lib/tableau/tableau-js-api.d.ts" />
/// <reference path="../lib/textile-js/textile.d.ts" />
/// <reference path="../lib/underscore/underscore.d.ts" />
declare module Helpers {
    var BooleanQueryParamRegex: RegExp;
    var BooleanQueryParamRegexFalse: RegExp;
    function dictFromArray<T>(array: T[], key: string): _.Dictionary<T>;
    function toBoolean(val: string): boolean;
    function swapDict(map: _.Dictionary<any>): _.Dictionary<any>;
}
/**
 * Takes any feature flags specified in the URL, and parses them into an array of objects that can
 * be used to override the default values. Feature flag overrides must be specified in the query
 * string (between ? and #) portion of the URL.
 *
 * Overrides work as follows:
 *  - If a flag is not given, it will not be overridden
 *  - If a flag is assigned the value "true" or "false" (case-insensitive), it will be overridden
 *    to true or false, respectively
 *  - If a flag is given any other value, it will not be overridden
 */
declare module FeatureFlagsHelper {
    interface IFeatureFlagOverride {
        flagName: string;
        value: boolean;
    }
    /**
     * Returns an array of objects that represent the overridden feature flags
     */
    function getOverridesFromQueryString(queryString: string): IFeatureFlagOverride[];
    /**
     * Takes in a query string and overwrites the feature flags in the VizPortal module according
     * to the overrides specified in the query string.
     */
    function overwriteFeatureFlagsFromQueryString(queryString: string, featureFlagsObj: any): void;
    /**
     * Takes the server feature flags and updates the corresponding client feature flags to match.
     * Values specified in the query string take precedence over values from the server.
     */
    function overwriteFeatureFlagsFromServerFeatureFlags(serverFeatureFlags: any, featureFlagsObj: any): void;
}
declare module VizPortal {
    /**
     * The FeatureFlags module is a global object that is as low-level in the app as possible,
     * so we can theoretically put any parameter of the application behind a flag. They are specified
     * here, but can be overridden at runtime via URL query parameters.
     */
    module FeatureFlags {
        /**
         * Enables the feature where users can see search results ordered by various relevant metrics
         */
        var contentAnalyticsEnabled: boolean;
        /**
         * Online Sync Client features. (set by server)
         */
        var dataSyncEnabled: boolean;
        /**
         * Enables the "Home" place and makes it the default start page.
         */
        var homePlaceEnabled: boolean;
        /**
        *  Enables the feature where user can use their OAuth credential to refresh WDC data souces.
        */
        var oAuthWDCServerRefresh: boolean;
        /**
         * Enables the feature that allows project owners to "lock" a project, and thus cause the
         * permissions for all the workbooks in that project to assume the permissions specified on the
         * project level.
         */
        var projectControlledPermissionsEnabled: boolean;
        /**
         * Splits up the project permissions into project/workbook/datasource areas, where the
         * workbook/datasource areas are the template "defaults" for new items created under that
         * project.
         */
        var projectPermissionsTemplatesEnabled: boolean;
        var toggleSelectableRow: boolean;
        var reactDataGridInGroupsPlace: boolean;
        var reactDatasourceGrid: boolean;
        var reactExtractTasksGrid: boolean;
        var reactGroupUsersGrid: boolean;
        var reactProjectGrid: boolean;
        var reactRemoteSchedulesGrid: boolean;
        var reactSchedulesGrid: boolean;
        var reactServerUsersGrid: boolean;
        var reactSitesGrid: boolean;
        var reactSubscriptionsGrid: boolean;
        var reactViewGrid: boolean;
        var reactWorkbookGrid: boolean;
        var reactDataGridInSiteUsersPlace: boolean;
        var reactDataGridLoadingIndicator: boolean;
        var reactFavoritesMenu: boolean;
        var reactThumbnailsInWorkbooksAndViews: boolean;
        var reactTypeaheadFilter: boolean;
        var reactToasts: boolean;
        var reactTopBar: boolean;
        var reactTopBarDark: boolean;
        var connectedClientsTableEnabled: boolean;
        var useTallerRowHeight: boolean;
        var useUpdatedFontStyles: boolean;
        var webDataConnectorsEnabled: boolean;
        var workbookVersionHistoryEnabled: boolean;
    }
}
declare module VizPortal {
    interface IContentFilters<T> extends _.Dictionary<T> {
        connectionType: T;
        createdBefore: T;
        createdAfter: T;
        databaseUsername: T;
        domain: T;
        forWorkbook: T;
        hasDatasource: T;
        hasAlert: T;
        hasExtracts: T;
        hasPassword: T;
        inGroup: T;
        lastRefreshedBefore: T;
        lastRefreshedAfter: T;
        maxSiteRole: T;
        groupsMinimumSiteRole: T;
        modifiedBefore: T;
        modifiedAfter: T;
        owner: T;
        project: T;
        schedule: T;
        search: T;
        serverName: T;
        serverPort: T;
        showEmbedded: T;
        siteId: T;
        siteRole: T;
        tag: T;
        workbook: T;
        datasource: T;
        favorite: T;
        recent: T;
        group: T;
    }
    var ContentFiltersKeys: IContentFilters<string>;
}
declare module VizPortal {
    var BuildId: string;
    module Module {
        function instance(): ng.IModule;
        /**
         * Register a service for eager instantiation. Note that this call does _not_ in itself
         * eagerly instantiate the registered service. A call to {@link #initializeEagerServices} is required.
         */
        function registerEagerService(serviceName: string): void;
        /**
         * Instantiate services which were registered using {@link #registerEagerService}. This method should
         * be called after the initial bootstrapping of Angular is finished, for example, in a run-block.
         */
        function initializeEagerServices(injector: ng.auto.IInjectorService): void;
    }
}
declare module VizPortal.ServerApi {
    interface IError {
        code: number;
        id?: string;
        message?: string;
    }
}
declare module VizPortal.ServerApi {
    interface IResult {
        errors?: IError[];
    }
    interface IEmptyResult extends IResult {
    }
    interface IResponse<TResult extends IResult> {
        result?: TResult;
    }
}
declare module VizPortal.ServerApi {
    interface IServer {
        sendRequest<TParams, TResult>(request: IRequest<TParams, TResult>): ng.IPromise<TResult>;
    }
}
declare module VizPortal.ServerApi {
    interface IRequest<TParams, TResult> {
        method: string;
        params: TParams;
        send(server: IServer): ng.IPromise<TResult>;
    }
}
declare module VizPortal.ServerApi {
    class Request<TParams, TResult> implements IRequest<TParams, TResult> {
        method: string;
        params: TParams;
        constructor(method: string, params: TParams);
        send(server: IServer): ng.IPromise<TResult>;
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateDisplayModeParams {
        displayMode: string;
    }
    class UpdateDisplayModeRequest extends Request<IUpdateDisplayModeParams, IResult> {
        constructor(params: IUpdateDisplayModeParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUserName {
        id: string;
        authId: string;
        displayName: string;
        username: string;
        domainName?: string;
        serverAdmin?: boolean;
    }
    interface IUser extends IUserName {
        readOnly?: boolean;
    }
    var UserKeys: {
        id: string;
        authId: string;
        displayName: string;
    };
}
declare module VizPortal.ServerApi {
    interface IFeatureFlags {
        dataSyncEnabled: boolean;
        dataSyncNextEnabled: boolean;
        ha2Enabled: boolean;
        ha2FilestoreEnabled: boolean;
    }
}
declare module VizPortal.ServerApi {
    var AuthenticationType: {
        AD: string;
        ClientCertificate: string;
        ClientCertificateWithFallback: string;
        Kerberos: string;
        Local: string;
        OpenId: string;
        Saml: string;
        Sspi: string;
    };
    interface IAuthenticationType {
        type: string;
        authAPI: string;
    }
    interface IServerCustomization {
        customLogoHeight?: number;
        customLogoLink?: string;
        customLogoPath?: string;
        customLogoWidth?: number;
        serverName?: string;
        useCustomLogo: boolean;
    }
    var DomainFamily: {
        ActiveDirectory: string;
        Local: string;
        External: string;
    };
    interface IPreloginCustomization {
        preloginNotificationImgUrl?: string;
        preloginNotificationImgLink?: string;
        resetPasswordUrl?: string;
    }
    interface IServerSettingsUnauthenticated {
        authenticationType?: IAuthenticationType;
        customization?: IServerCustomization;
        defaultLanguage?: string;
        defaultLocale?: string;
        guestEnabled?: boolean;
        domainFamily: string;
        licenseExpirationDate: string;
        preloginCustomization: IPreloginCustomization;
    }
}
declare module VizPortal.ServerApi {
    interface ICreatedItem {
        createdAt: string;
    }
    interface IDescriptionItem {
        description: string;
    }
    interface IFavoriteDetailItem {
        favorite: boolean;
    }
    interface IIdItem {
        id: string;
    }
    interface INamedItem extends IIdItem {
        name?: string;
    }
    interface IOwnedItem {
        ownerId: string;
    }
    interface IOwnedDetailItem {
        owner: IUser;
    }
    interface IProjectItem {
        projectId: string;
    }
    interface IProjectDetailItem {
        project: INamedItem;
    }
    interface ITaggedItem {
        tags: string[];
    }
    interface IThumbnailItem {
        thumbnailUrl: string;
    }
    interface IDownloadItem {
        downloadUrl: string;
    }
    interface IUpdatedItem {
        updatedAt?: string;
    }
    interface IEditableItem {
        editUrl?: string;
    }
    interface IItemStatisticsFields {
        hitsTotal: number;
        favoritesTotal: number;
        hitsLastTwoWeeksTotal?: number;
    }
    interface IStatsTimeSeries {
        hitsTimeSeries?: number[];
    }
    interface IExtractItem {
        lastRefreshedAt?: string;
        hasExtracts: boolean;
        hasAlert: boolean;
        hasIncrementalExtract: boolean;
    }
    interface IScheduledItem {
        scheduleId: string;
    }
    interface ISiteItem {
        siteId: string;
    }
    var NamedItemKeys: {
        id: string;
        name: string;
    };
}
declare module VizPortal.ServerApi {
    interface ISiteNameSansId {
        name?: string;
        urlName: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteNameWithId extends ISiteNameSansId, IIdItem {
        luid: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteThirdPartyAuthState {
        allowed: boolean;
        enabled: boolean;
        serverEnabled: boolean;
        hasThirdPartyAuthenticatedUsers: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteNameWithRole extends ISiteNameWithId {
        role: string;
        thirdPartyAuthState?: ISiteThirdPartyAuthState;
        logoutEnabled: boolean;
        liveDBAvailable: boolean;
        customization?: IServerCustomization;
    }
}
declare module VizPortal {
    module ServerApi {
        var DisplayModes: {
            list: string;
            thumbnail: string;
        };
        interface IUserSessionInfo extends IUser {
            canManageUsers: boolean;
            displayMode: string;
            language: string;
            locale: string;
            numberOfSites: number;
            serverAdmin: boolean;
            startPage: string;
        }
        interface IServerSessionInfo {
            datasourceHelpUrl?: string;
            defaultSubscriptionsEmail: string;
            guestEnabled: boolean;
            sspiEnabled: boolean;
            version: IServerVersionInfo;
            featureFlags: IFeatureFlags;
            offlineHelpEnabled: boolean;
            helpEdition: string;
            changePasswordUrl?: string;
            oauthGoogleEnabled: boolean;
            oauthSalesforceEnabled: boolean;
            updateDisplayNameAllowed: boolean;
            updateEmailAllowed: boolean;
            sessionIdleLimitSeconds: number;
            rebuildingSearchIndex?: boolean;
            siteAdminSettingsEnabled: boolean;
            logicalServerInstanceId: string;
            supportHost: string;
            supportPath: string;
            siteCustomizationEnabled: boolean;
            tabAdminServiceEnabled: boolean;
            alertFailureCountEnabled: boolean;
        }
        interface ISessionInfo extends IResult {
            user: IUserSessionInfo;
            site: ISiteNameWithRole;
            server: IServerSessionInfo;
            isRestrictedTrustedTicketSession: boolean;
        }
        interface IServerVersionInfo {
            externalVersion: IExternalVersion;
            build: string;
            bitness: string;
        }
        interface IExternalVersion {
            major: string;
            minor: string;
            patch: string;
        }
    }
}
declare module VizPortal {
    var ViewportContent: {
        deviceWidth: string;
        fixedWidth: string;
    };
    class BrowserSupportService {
        private static MSIE_REGEX;
        private static TOUCH_REGEX;
        private static CHROME_IOS_REGEX;
        private static ANDROID_REGEX;
        private static CHROME_REGEX;
        static $inject: string[];
        private msieMatch;
        private touchTest;
        private chromeIOSTest;
        private chromeAndroidTest;
        constructor($window: ng.IWindowService);
        isIE7orLess(): boolean;
        isIE8orLess(): boolean;
        isIE9orLess(): boolean;
        isTouch(): boolean;
        isAndroidChrome(): boolean;
        supportsFormData(): boolean;
        supportsFileReader(): boolean;
        supportsDragAndDropEvents(): boolean;
        setViewport(content: string): void;
    }
}
declare module VizPortal.L10n {
    var MissingTranslationHandlerName: string;
}
interface ITranslateInterpolation {
    setLocale(locale: string): void;
    getInterpolationIdentifier(): string;
    useSanitizeValueStrategy(value: string): ITranslateInterpolation;
    interpolate(input: string, params: any): string;
}
declare module VizPortal.L10n {
    module Keys {
        var allOwners: string;
        var allProjects: string;
        var allTags: string;
        var connector: string;
        var custom: string;
        var datasourceConnector: string;
        var datasourceEditor: string;
        var delete_: string;
        var denied: string;
        var edit: string;
        var editor: string;
        var interactor: string;
        var projectLeader: string;
        var none: string;
        var permissions: string;
        var publisher: string;
        var save: string;
        var sizeInBytes: string;
        var sizeInGB: string;
        var sizeInKB: string;
        var sizeInMB: string;
        var title: string;
        var viewer: string;
    }
    var language: string;
    var locale: string;
    function loadLocaleJson(data: any): void;
    function useLocale(locale: string): void;
    function localizedCount(value: any): any;
    function localizedFloat(value: any): any;
    function localizedPercent(value: any): any;
    function parse24Hour(value: string): Date;
    function localizedDate(value: any): string;
    function localizedDateTime(value: any): string;
    function localizedShortTime(value: any): string;
    function localizedTime(value: any): string;
    function firstDayOfWeek(): number;
    function firstDayOfWeekIsMonday(): boolean;
    function is24HourTimeCycle(): boolean;
    function narrowDayNames(): string[];
    function wideDayNames(): string[];
    function yearAndMonth(date: Date): string;
    function elideIfLong(s: string): string;
    /**
     * When to use escaped vs non:
     *   If you are using the translate directive in jade, use the escaped version
     *   If you are binding to a string that was localized with the $translate service, use the non-escaped version.
     *
     * Details:
     *   Angular will escape the results of expressions before rendering them in the DOM (https://docs.angularjs.org/api/ng/service/$sce)
     *   The translate directive does not escape strings. This is fine for static strings, but we need to use the escaped versions
     *   of the interpolators to ensure that any dynamic data gets santized.
     */
    var Interpolations: {
        Escaped: string;
        Count: string;
        CountEscaped: string;
        Float: string;
        FloatEscaped: string;
        Percent: string;
        PercentEscaped: string;
    };
}
declare module VizPortal {
    module ServerApi {
        interface ISiteLoginParams {
            siteUrlName?: string;
        }
    }
}
declare module VizPortal.ServerApi {
    class ClientCertificateLoginRequest extends Request<ISiteLoginParams, IGetSessionInfoResult> {
        constructor(params: ISiteLoginParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGeneratePublicKeyParams {
    }
    interface IGeneratePublicKeyResult {
        key: rsa.IRSAPublicKey;
        keyId: string;
    }
    class GeneratePublicKeyRequest extends Request<IGeneratePublicKeyParams, IGeneratePublicKeyResult> {
        constructor(params?: IGeneratePublicKeyParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetServerSettingsUnauthenticatedParams {
    }
    interface IGetServerSettingsUnauthenticatedResult extends IServerSettingsUnauthenticated {
    }
    class GetServerSettingsUnauthenticatedRequest extends Request<IGetServerSettingsUnauthenticatedParams, IGetServerSettingsUnauthenticatedResult> {
        constructor(params?: IGetServerSettingsUnauthenticatedParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetSessionInfoParams {
    }
    interface IGetSessionInfoResult extends ISessionInfo {
    }
    class GetSessionInfoRequest extends Request<IGetSessionInfoParams, IGetSessionInfoResult> {
        constructor();
    }
}
declare module VizPortal {
    module ServerApi {
        interface ILoginParams extends ISiteLoginParams {
            username: string;
            encryptedPassword: string;
            keyId: string;
        }
    }
}
declare module VizPortal.ServerApi {
    class InitializeServerWithActiveDirectoryUserRequest extends Request<ILoginParams, ISessionInfo> {
        constructor(params: ILoginParams);
    }
}
declare module VizPortal.ServerApi {
    class InitializeServerWithExternalUserRequest extends Request<ILoginParams, ISessionInfo> {
        constructor(params: ILoginParams);
    }
}
declare module VizPortal.ServerApi {
    interface IInitializeServerWithLocalUserParams extends ILoginParams {
        displayName: string;
    }
    class InitializeServerWithLocalUserRequest extends Request<IInitializeServerWithLocalUserParams, ISessionInfo> {
        constructor(params: IInitializeServerWithLocalUserParams);
    }
}
declare module VizPortal.ServerApi {
    class KerberosLoginRequest extends Request<ISiteLoginParams, IGetSessionInfoResult> {
        constructor(params: ISiteLoginParams);
    }
}
declare module VizPortal.ServerApi {
    class LoginRequest extends Request<ILoginParams, ISessionInfo> {
        constructor(params: ILoginParams);
    }
}
declare module VizPortal.ServerApi {
    interface ILogoutResult extends IResult {
        redirectUrl: string;
    }
    class LogoutRequest extends Request<{}, ILogoutResult> {
        constructor();
    }
}
declare module VizPortal.ServerApi {
    class SspiLoginRequest extends Request<ISiteLoginParams, IGetSessionInfoResult> {
        constructor(params: ISiteLoginParams);
    }
}
declare module VizPortal.ServerApi {
    interface ISwitchSiteParams {
        urlName: string;
    }
    interface ISwitchSiteResult extends ISessionInfo {
    }
    class SwitchSiteRequest extends Request<ISwitchSiteParams, ISwitchSiteResult> {
        constructor(params: ISwitchSiteParams);
    }
}
declare module VizPortal.ServerApi {
    interface IPodRedirectionError extends IError {
        destinationPodUrl?: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteRole {
        siteId: string;
        siteRole: string;
    }
    var SiteRoles: {
        ServerAdministrator: string;
        SiteAdministrator: string;
        Publisher: string;
        Interactor: string;
        Viewer: string;
        Unlicensed: string;
        ViewerWithPublish: string;
        UnlicensedWithPublish: string;
        Guest: string;
    };
}
declare module VizPortal {
    interface IToast {
        id: number;
        type: string;
        isClosed: boolean;
        lines?: string[];
        templateUrl?: string;
        data?: any;
        timeoutDelay: number;
        timeout?: ng.IPromise<any>;
        content?: React.ReactElement<any>;
    }
    enum ToastType {
        Info = 0,
        Error = 1,
        External = 2,
    }
    interface IToastOptions {
        type: ToastType;
        text?: string;
        templateUrl?: string;
        data?: any;
        timeoutDelay?: number;
        content?: React.ReactElement<any>;
    }
    interface IToastListener {
        toastsUpdated(toasts: IToast[]): void;
        id?: number;
    }
    class ToasterService {
        static NoTimeout: number;
        private static DefaultTimeOutForInfo;
        private static DefaultTimeOutForError;
        private listeners;
        private $interval;
        private nextToastId;
        toasts: IToast[];
        private nextListenerId;
        static $inject: string[];
        constructor($interval: ng.IIntervalService);
        pop(toastOptions: IToastOptions): number;
        defaultTimeoutForType(toastType: ToastType): number;
        notifyListeners(): void;
        close(id: number): void;
        isClosed(id: number): boolean;
        addListener(listener: IToastListener): number;
        removeListener(id: number): void;
    }
}
declare module VizPortal {
    enum ErrorReason {
        Canceled = 1000001,
        ResourceNotFound = 1000002,
        Unauthorized = 1000003,
        Unknown = 1000004,
    }
    enum AuthLevel {
        Anonymous = 0,
        Authenticated = 1,
        SiteAdmin = 2,
        SelfOrAdmin = 3,
        SelfOrServerAdmin = 4,
        ServerAdmin = 5,
    }
    var MaxRequestArrayLength: number;
    class ServerService implements ServerApi.IServer {
        private $http;
        private $location;
        private $q;
        private $state;
        private $stateParams;
        private $translate;
        private $cookies;
        private apiPrefix;
        private restApiPrefix;
        private toaster;
        private windowLocation;
        private stateWrapperService;
        private sessionState;
        private sessionInfo;
        private sessionInfoPromise;
        private numSessionInfoRequests;
        private serverSettings;
        private caseInsensitiveSiteUrlNames;
        private rebuildingSearchIndexToast;
        private supplementalLocaleJsonPromise;
        private authenticationTypeOverride;
        static $inject: string[];
        constructor($http: ng.IHttpService, $location: ng.ILocationService, $q: ng.IQService, $state: ng.ui.IStateService, $stateParams: ng.ui.IStateParamsService, $translate: ng.translate.ITranslateService, $cookies: IVizPortalCookies, apiPrefix: string, restApiPrefix: string, toaster: ToasterService, windowLocation: WindowLocationService, stateWrapperService: StateWrapperService);
        getSessionInfoPromise(): ng.IPromise<void>;
        /**
         * Make a server request. If there is a request pending that might change the session,
         * wait until that request is finished before sending this one.
         */
        sendRequest<TParams, TResult>(request: ServerApi.IRequest<TParams, TResult>): ng.IPromise<TResult>;
        /**
         * Send a series of requests of the same type.
         * The results are combined using the given function.
         * If any request results in a broken promise,
         * then this method returns that broken promise.
         */
        sendRequests<TItem, TParams, TResult>(requests: ServerApi.IRequest<TParams, TResult>[], combineResults: (results: TResult[]) => TResult): ng.IPromise<TResult>;
        /**
         * Like sendRequests, but sends the requests in parallel.
         */
        sendRequestsParallel<TItem, TParams, TResult>(requests: ServerApi.IRequest<TParams, TResult>[], combineResults: (results: TResult[]) => TResult): ng.IPromise<TResult>;
        login(username: string, password: string, siteUrlName?: string): ng.IPromise<void>;
        autoLogin(siteUrlName?: string): ng.IPromise<void>;
        initialize(username: string, password: string, displayName: string): ng.IPromise<void>;
        /**
         * Returned promise will be fulfilled. All rejections are handled.
         * If there is an error, the code will be returned in the fulfilled handler.
         */
        refreshSessionInfo(): ng.IPromise<void>;
        refreshServerSettings(): ng.IPromise<void>;
        overrideAuthenticationType(authType: string): void;
        /**
         * Loads all state needed to render the app
         * Returns a promise that fulfills with a code indicating bootstrap state
         */
        bootstrapSession(): ng.IPromise<number>;
        /**
         * This won't handle errors. Use SiteSwitchService.switchIfNeeded
         * to get the proper error feedback
         */
        switchSiteIfNeeded(urlName: string, podRedirectPath?: string): ng.IPromise<any>;
        redirectToOtherPod(error: ServerApi.IError, destinationPodPath: string): void;
        isCurrentSiteUrlName(urlName: string): boolean;
        isUserAuthorized(role: AuthLevel): boolean;
        signOut(): void;
        sessionStateString(): string;
        sessionUserInfo(): IUserInfo;
        isSessionRestrictedTrustedTicket(): boolean;
        sessionUserDisplayName(): string;
        sessionUserId(): string;
        sessionAuthUserId(): string;
        sessionSiteLuid(): string;
        sessionUsername(): string;
        sessionUserDomainName(): string;
        inSession(): boolean;
        isSessionUserEqualTo(username: string, domainName: string): boolean;
        isSessionUserSelf(): boolean;
        isSessionServerAdmin(): boolean;
        isSessionSiteAdmin(): boolean;
        isSessionSiteOrServerAdmin(): boolean;
        sessionSiteId(): string;
        sessionServerId(): string;
        sessionSite(): ServerApi.ISiteNameWithRole;
        sessionSiteUrlName(): string;
        sessionSiteName(): string;
        sessionServerVersion(): ServerApi.IServerVersionInfo;
        thirdPartyAuthState(): ServerApi.ISiteThirdPartyAuthState;
        isThirdPartyAuthAllowed(): boolean;
        isThirdPartyAuthConfiguredForServer(): boolean;
        isThirdPartyAuthEnabled(): boolean;
        isThirdPartyAuthEditable(): boolean;
        sessionSupportHost(): string;
        sessionSupportPath(): string;
        isSessionStateUnknown(): boolean;
        isSessionMultiSite(): boolean;
        isLogoutEnabled(): boolean;
        isLiveDBAvailable(): boolean;
        siteLogo(): ServerApi.IServerCustomization;
        isSiteCustomizationEnabled(): boolean;
        isTabAdminServiceEnabled(): boolean;
        isSiteAdminSettingsEnabled(): boolean;
        waitForSession(): ng.IPromise<void>;
        sessionLanguage(): string;
        sessionLocale(): string;
        updateDisplayNameAllowed(): boolean;
        defaultSubscriptionsEmail(): string;
        featureFlags(): ServerApi.IFeatureFlags;
        changePasswordUrl(): string;
        datasourceHelpUrl(): string;
        offlineHelpEnabled(): boolean;
        helpEdition(): string;
        oauthGoogleEnabled(): boolean;
        oauthSalesforceEnabled(): boolean;
        rebuildingSearchIndex(): boolean;
        canSessionUserManageUsers(): boolean;
        domainFamily(): string;
        isServerDomainFamilyActiveDirectory(): boolean;
        isServerDomainFamilyLocal(): boolean;
        isServerDomainFamilyExternal(): boolean;
        getStartPage(): string;
        sessionUserDisplayMode(): string;
        isAlertFailureCountEnabled(): boolean;
        authenticationType(): string;
        licenseExpirationDateIfWithinWarningPeriod(): string;
        serverCustomization(): ServerApi.IServerCustomization;
        serverName(): string;
        serverLanguage(): string;
        serverLocale(): string;
        isGuestEnabled(): boolean;
        preloginCustomization(): ServerApi.IPreloginCustomization;
        /**
         * Requests that could change the session must make the request through this method
         */
        private sessionInfoRequest(makeRequest);
        private getFirstErrorFromResponse(response);
        private getCodeFromError(error);
        private getDestinationPodFromError(error);
        private request<TResult>(requestConfig);
        private requestGet<TParams, TResult>(request);
        private requestPost<TParams, TResult>(request);
        private requestPostFormDataToRestApi(formData, method);
        private handle401(reason);
        private maybeHandleSearchServerDown(errorCode);
        private maybeHandleRedirectionToOtherPod(errorCode, destinationPodUrl);
        isAuthenticationAutoLogin(): boolean;
        isWindowsCredentialsAutoLogin(): boolean;
        isAuthenticationSaml(): boolean;
        isAuthenticationOpenId(): boolean;
        isAuthenticationExternal(): boolean;
        getSessionIdleLimitSeconds(): number;
        private setSessionInfo(newSessionInfo);
        private clearSessionInfo();
        private showOrHideRebuildingSearchIndexToast();
        private updateLanguageAndLocale();
        private getSupplementalLocaleJson();
        private getLocaleJson(fileName);
        updateSiteLogo(file: File, resetToDefaultLogo: boolean): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface ITopBarSettings {
        collapsed: boolean;
        height: number;
    }
    class DisplaySettingsService {
        private $location;
        private ServerService;
        private BrowserSupportService;
        private static DefaultDisplayMode;
        displayMode: string;
        topBar: ITopBarSettings;
        showFilterPanel: boolean;
        private displayModeUpdatedFromSession;
        private displayModeUpdatedFromUrl;
        static $inject: string[];
        constructor($location: ng.ILocationService, ServerService: ServerService, BrowserSupportService: BrowserSupportService);
        saveDisplayMode(): void;
        maybeUpdateDisplayModeFromSession(): void;
        updateDisplayModeFromUrl(): void;
        private getDisplayModeFromUrl(currentDisplayMode);
        updateShowFilterPanel(): void;
    }
}
declare module VizPortal {
    interface IMainScope extends ng.IScope {
        displaySettings: DisplaySettingsService;
    }
}
declare module VizPortal {
    interface IPlaceTitleScope extends ng.IScope {
        placeTitleClicked: () => void;
    }
}
declare module VizPortal {
    var UrlParamKeys: {
        SiteUrlName: string;
        IsFromSaml: string;
        ClosePopupWhenDone: string;
        AuthenticationType: string;
    };
}
declare module VizPortal {
    class BrowserTitleService {
        private $translate;
        private ServerService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ServerService: ServerService);
        setTitle(placeKey?: string, object?: string): void;
        getTitle(placeKey?: string, object?: string): string;
        setVizTitle(viewName: string, workbookName: string): void;
    }
}
declare module VizPortal {
    enum CommonErrorCode {
        None = 0,
        CallingUserInsufficientPermissions = 1,
        SiteUserNotFound = 4,
        SystemUserNotFound = 5,
        GroupNotFound = 6,
        WorkbookNotFound = 7,
        ViewNotFound = 8,
        ProjectNotFound = 9,
        DataConnectionNotFound = 10,
        DatasourceNotFound = 11,
        SiteNotFound = 12,
        EncryptionTokenNotFound = 13,
        FileUploadNotFound = 14,
        AdGroupNotFound = 15,
        UnexpectedErrorOccurred = 17,
        InvalidNumberOrderClauses = 18,
        InvalidPageSize = 19,
        InvalidStartIndex = 20,
        InvalidNumberFilterClauses = 21,
        InvalidSortClauseFieldName = 22,
        InProgress = 23,
        UnexpectedNullOrEmptyParameter = 24,
        UnexpectedParameterValue = 25,
        DomainNotFound = 26,
        CommentNotFound = 27,
        AsyncJobNotFound = 28,
        SubscriptionNotFound = 29,
        ADUserNotFound = 30,
        InvalidSession = 46,
        UnlicensedServer = 50,
        InsecureSAMLEndpoint = 53,
        RedirectToOtherPod = 55,
        SiteSAMLUserCannotAddTableauIDUser = 64,
        FeatureNotEnabled = 67,
        FileSizeTooLarge = 68,
    }
    enum AlertErrorCode {
        AlertUnknownFailure = 1000,
        AlertRemoteUnknownFailure = 1001,
        AlertSignInFailed = 2000,
        AlertRemoteSignInFailed = 2001,
        AlertExpiredPassword = 2100,
        AlertRemoteExpiredPassword = 2101,
        AlertAccessTokenValidation = 2200,
        AlertAuthConfiguration = 2300,
        AlertConnectionFailure = 3000,
        AlertRemoteConnectionFailure = 3001,
        AlertOverlappingSchedules = 4000,
        AlertFullRefreshRequired = 5000,
        AlertConnectionlessFailure = 10000,
    }
    enum DataConnectionErrorCode {
        DataConnectionNullOrEmptyDataConnectionIds = 60000,
        UpdateConnectionsInvalidPort = 60005,
    }
    enum DatasourceErrorCode {
        DatasourceDescriptionGreaterThanMaxLength = 50000,
        DatasourceMoveInsufficientPermissionsOnDestinationProject = 50001,
        DatasourceMoveInsufficientPermissionsOnSourceProject = 50002,
        DatasourceMoveInsufficientPermissionsOnDatasource = 50003,
        DatasourceWithSameNameInDestinationProject = 50004,
        DatasourceNullOrEmptyProjectIds = 50005,
        DatasourceNullOrEmptyUserIds = 50006,
        DatasourceNullOrEmptyDatasourceIds = 50007,
        DatasourceNullOrEmptyWorkbookIds = 50008,
        DatasourceChangeOwnerDisabled = 50009,
        DatasourceChangeOwnerToGuest = 50010,
    }
    enum UnifiedDatasourceErrorCode {
        UnifiedDatasourceNullOrEmptyDatasourceIds = 160000,
        OperationOnlySupportedForPublishedDatasource = 160001,
    }
    enum LoginErrorCodes {
        BadCredentials = 16,
        SspiFailed = 42,
        KerberosFailed = 43,
        ClientCertificateNotFound = 59,
        ClientCertificateUserNotFoundInCertificate = 60,
        ClientCertificateUserNotFoundOnServer = 61,
        OpenIdFailed = 69,
    }
    enum ProjectErrorCode {
        ProjectNullOrEmptyProjectIds = 30000,
        ProjectNullOrEmptyUserIds = 30001,
        ProjectNameAlreadyExists = 30002,
        ProjectNameTooLong = 30003,
        ProjectDescriptionGreaterThanMaxLength = 30004,
        ProjectChangeOwnerDisabled = 30005,
        ProjectDefaultAlreadyExists = 30006,
        ProjectNameEmpty = 30007,
        DeletingDefaultProject = 30010,
        DefaultProjectCannotBeRenamed = 30011,
        TargetUserInsufficientPermissions = 30012,
    }
    enum TagErrorCode {
        TagNameTooLong = 110000,
    }
    enum WorkbookErrorCode {
        WorkbookDisabled = 40000,
        WorkbookDestinationProjectNotFound = 40001,
        WorkbookMoveInsufficientPermissionsOnDestinationProject = 40002,
        WorkbookMoveInsufficientPermissionsOnSourceProject = 40003,
        WorkbookMoveInsufficientPermissionsOnWorkbook = 40004,
        WorkbookNameAlreadyExistsInDestinationProject = 40005,
        WorkbookDescriptionTooLong = 40006,
        WorkbookInvalidViewPath = 40007,
        WorkbookNullOrEmptyWorkbookIds = 40008,
        WorkbookNullOrEmptyViewIds = 40009,
        WorkbookNullOrEmptyUserIds = 40010,
    }
    enum SiteSwitchErrorCodes {
        UserNotMemberOfSiteOrSiteNotExist = 16,
        UserUnlicensedForSite = 10028,
        SiteSuspended = 10029,
        SiteLocked = 10030,
        AttemptedToSwitchSiteToCurrentSite = 10056,
    }
    enum SiteSettingsErrorCode {
        SiteNotFound = 12,
        SiteNameIsEmptyOrNull = 70000,
        SiteAdminCannotAddUsersButUserQuotaIsSet = 70001,
        InvalidUserQuotaOrStorageQuota = 70002,
        UserQuotaGreaterThanServerLicenseLimit = 70003,
        InvalidCustomEmailAddress = 70004,
        SiteNameOrUrlNameAlreadyExists = 70005,
        SiteIdsAreNullOrEmpty = 70006,
        SiteSubscriptionsSetWithDisabledServerSubscriptions = 70007,
        AttemptedToUpdateDefaultSiteUrlName = 70008,
        AttemptedToSuspendDefaultSite = 70009,
        SiteNameTooLong = 70010,
        SiteUrlNameTooLong = 70011,
        AttemptedToDeleteDefaultSite = 70012,
        StorageQuotaLessThanStorageUsed = 70013,
    }
    enum WebClientErrorCode {
        NotAnInteger = 80000,
        NotASiterole = 80001,
        InvalidStartIndex = 80002,
        InvalidMaxItems = 80003,
        MutuallyExclusiveParametersPresent = 80004,
        SiteSubscriptionSettingsMissing = 80005,
        NotAScheduledAction = 80006,
        NotAScheduleType = 80007,
        NotADayOfMonth = 80008,
        NotADayOfWeek = 80009,
        NotATaskType = 80010,
        NotATargetType = 80011,
        TaskTypeIncrementExtractNotAllowed = 80012,
        TaskTypeRefreshExtractNotAllowed = 80013,
        UnableToDeleteUserWhoOwnsContent = 80014,
    }
    enum SchedulingErrorCode {
        SchedulingNullOrEmptyScheduleIds = 120000,
        SchedulingScheduleNotFound = 120001,
        SchedulingTaskNotFound = 120002,
        SchedulingNameEmpty = 120003,
        SchedulingNameTooLong = 120004,
        SchedulingNameAlreadyExists = 120005,
        SchedulingStartTimeValueInvalid = 120006,
        SchedulingEndTimeValueInvalid = 120007,
        SchedulingRecurrenceMinutesValueInvalid = 120008,
        SchedulingRecurrenceDaysOfWeekValueMissing = 120009,
        SchedulingRecurrenceDayOfMonthValueMissing = 120010,
        SchedulingPriorityValueInvalid = 120011,
        SchedulingExtractTaskExistsForTarget = 120012,
    }
    enum UninitializedServerErrorCode {
        UntrustedMachine = 80015,
        ReadyToInitialize = 80018,
    }
    enum RestApiErrorCode {
        UserNotSupportedAdminOperation = 90000,
        UserInvalidSiteRole = 90001,
        ADNotConfigured = 90002,
        ADDomainInvalid = 90003,
        InvalidPageNumber = 90004,
        InvalidRequestPayload = 90005,
        AmbiguousWorkbookPublishSource = 90006,
        InvalidWorkbookFile = 90007,
        InvalidOverwriteParameter = 90008,
        InvalidPageSize = 90009,
        GroupUserExists = 90010,
        GroupUserNotFound = 90011,
        CannotModifyADGroupName = 90012,
        GroupAlreadyExists = 90013,
        InvalidEmbedParameter = 90014,
        InvalidDatasourceFile = 90015,
        MismatchADGroupDomainNameOnSync = 90016,
        InsufficientProject_permissions = 90017,
        InvalidShowTabsParameter = 90018,
        WorkbookChangeOwnerInsufficientPermissions = 90019,
        WorkbookChangeDisplayTabsInsufficientPermissions = 90020,
        InvalidOAuthParameter = 90021,
    }
    enum UserErrorCode {
        UserGroupInvalidName = 10001,
        UserDomainInvalidName = 10002,
        UserGroupWithNameAlreadyExists = 10003,
        UserCsvParamNotText = 10004,
        UserCsvParamerterTooLong = 10005,
        UserCannotSetAdminStatusForSystemAdmin = 10006,
        UserCannotRenameSystemGroup = 10007,
        UserCannotRenameNonLocalGroup = 10008,
        UserInsufficientLicenses = 10009,
        UserCannotUnlicenseAdmin = 10010,
        UserInvalidEmailAddress = 10011,
        UserSystemUserWithEmailAddressAlreadyExists = 10012,
        UserOverlappedGroupidInUpdate = 10013,
        UserAllUsersGroupAlreadyExists = 10014,
        UserGuestAlreadyExists = 10015,
        UserCannotAutocreateUser = 10016,
        UserInvalidPassword = 10017,
        UserCannotUpdatePassword = 10018,
        UserCannotUpdateFriendlyName = 10019,
        UserInvalidUserName = 10020,
        UserAlreadyExists = 10021,
        UserOverlappedSiteidInUpdate = 10022,
        UserNotSupportedGuestOperation = 10023,
        UserNotSupportedAdminOperation = 10024,
        UserNotSupportedSelfOperation = 10025,
        UserInvalidFriendlyName = 10026,
        UserInvalidSiteRole = 10027,
        UserLoginFailedUnlicensedOnSite = 10028,
        UserLoginFailedSuspendedSite = 10029,
        UserLoginFailedLockedSite = 10030,
        UserGuestLoginFailed = 10031,
        UserMissingPasswordParameters = 10032,
        UserCannotFavoriteType = 10033,
        UserCannotDeleteSystemUserWithAssociatedUsers = 10040,
        UserCsvMissingUsername = 10050,
        UserCsvInvalidAdminLevel = 10051,
        UserCsvInvalidLicense = 10052,
        UserCsvInvalidPublisher = 10053,
        UserCsvMissingPassword = 10054,
        UserCsvPasswordMismatch = 10055,
        UserTriedSwitchSiteToCurrentSite = 10056,
        UserInsufficientSiteQuota = 10057,
        UserCannotUpdateMinimumSiteRoleNonAdGroup = 10058,
        UserOpenIdBadConfig = 10059,
        UserOpenIdIdpNotReachable = 10060,
        UserOpenIdUserNotFound = 10061,
        UserOpenIdConflictingUserAccount = 10062,
    }
    enum GroupErrorCode {
        GroupNullOrEmptyName = 20000,
        GroupAmbiguousNameSearch = 20001,
        GroupCannotBeDeleted = 20002,
        InvalidGroupMembershipUpdate = 20003,
    }
    enum LdapErrorCode {
        LdapOperationsError = 100001,
        LdapProtocolError = 100002,
        LdapTimelimitExceeded = 100003,
        LdapSizelimitExceeded = 100004,
        LdapCompareFalse = 100005,
        LdapCompareTrue = 100006,
        LdapAuthMethodNotSupported = 100007,
        LdapStrongAuthRequired = 100008,
        LdapPartialResults = 100009,
        LdapReferral = 100010,
        LdapAdminLimitExceeded = 100011,
        LdapUnavailableCritExtension = 100012,
        LdapConfidentialityRequired = 100013,
        LdapSaslBindInProgress = 100014,
        LdapReferralV2 = 100015,
        LdapNoSuchAttribute = 100016,
        LdapUndefinedType = 100017,
        LdapInappropriateMatching = 100018,
        LdapConstraintViolation = 100019,
        LdapAttributeOrValueExists = 100020,
        LdapInvalidSyntax = 100021,
        LdapNoSuchObject = 100032,
        LdapAliasProblem = 100033,
        LdapInvalidDnSyntax = 100034,
        LdapIsLeaf = 100035,
        LdapAliasDerefProblem = 100036,
        LdapInappropriateAuth = 100048,
        LdapInvalidCredentials = 100049,
        LdapInsufficientRights = 100050,
        LdapBusy = 100051,
        LdapUnavailable = 100052,
        LdapUnwillingToPerform = 100053,
        LdapLoopDetect = 100054,
        LdapSortControlMissing = 100060,
        LdapOffsetRangeError = 100061,
        LdapNamingViolation = 100064,
        LdapObjectClassViolation = 100065,
        LdapNotAllowedOnNonleaf = 100066,
        LdapNotAllowedOnRdn = 100067,
        LdapAlreadyExists = 100068,
        LdapNoObjectClassMods = 100069,
        LdapResultsTooLarge = 100070,
        LdapAffectsMultipleDsas = 100071,
        LdapVirtualListViewError = 100076,
        LdapOther = 100080,
        LdapServerDown = 100081,
        LdapLocalError = 100082,
        LdapEncodingError = 100083,
        LdapDecodingError = 100084,
        LdapTimeout = 100085,
        LdapAuthUnknown = 100086,
        LdapFilterError = 100087,
        LdapUserCancelled = 100088,
        LdapParamError = 100089,
        LdapNoMemory = 100090,
        LdapConnectError = 100091,
        LdapNotSupported = 100092,
        LdapNoResultsReturned = 100094,
        LdapControlNotFound = 100093,
        LdapMoreResultsToReturn = 100095,
        LdapClientLoop = 100096,
        LdapReferralLimitExceeded = 100097,
        NotUniqueUserSearch = 101000,
        NotUniqueGroupSearch = 101001,
        UserNotFound = 101002,
        GroupNotFound = 101003,
        NullOrEmptySearch = 101004,
        UnknownObject = 101005,
        UnknownSidType = 101006,
        UnknownNativeError = 101007,
    }
    enum SolrErrorCode {
        SolrCommunicationError = 200000,
        SolrDisabled = 200001,
        SolrIndexingFailed = 200002,
    }
    enum OnlineErrorCode {
        InvalidImage = 250000,
        ImageProcessingError = 250001,
        StorageException = 250010,
        SiteCustomizationUnavailable = 250011,
    }
}
declare module VizPortal.ServerApi {
    interface ISiteSettingsForSiteAdmin {
        id: string;
        siteAdminSettings: ISiteAdminSettings;
    }
    interface ISiteAdminSettings {
        liveDBConnectionsWhitelistEnabled: boolean;
        refreshTokenEnabled: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteSettingsForServerAdmin extends ICreatedItem {
        id: string;
        userCount: number;
        licensedUserCount: number;
        adminCount: number;
        availability: string;
        currentLoggedInUserCount: number;
        storageQuotaPercentUsed: number;
        storageUsedBytes: number;
        settings: IServerAdminSettings;
        subscriptionSettings?: ISiteSubscriptionSettings;
        siteAdminSettings?: ISiteSettingsForSiteAdmin;
    }
    interface IServerAdminSettings {
        urlName: string;
        name: string;
        storageQuotaEnabled: boolean;
        storageQuotaBytes: number;
        siteAdminsCanAddUsers: boolean;
        userQuotaEnabled: boolean;
        userQuota: number;
        metricsEnabled: boolean;
        authoringEnabled: boolean;
        sheetImageEnabled: boolean;
        versionHistoryEnabled?: boolean;
    }
    interface ISiteSubscriptionSettings {
        subscriptionsEnabled: boolean;
        customSubscriptionEmailEnabled: boolean;
        customSubscriptionEmail: string;
        customSubscriptionFooterEnabled: boolean;
        customSubscriptionFooter: string;
    }
    interface ISiteKeys {
        id: string;
    }
    var SiteKeys: ISiteKeys;
}
declare module VizPortal {
    class CreateSiteAction {
        private ConfirmActionDialog;
        private $translate;
        private toaster;
        private server;
        private Sites;
        private $q;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, toaster: ToasterService, server: ServerService, Sites: Sites, $q: ng.IQService);
        execute(parentScope: ng.IScope): ng.IPromise<any>;
        private isServerLevelSubscriptionsEnabled();
        private errorMessages(errors, site);
        private getPlaceholderSiteSettings();
    }
}
declare module VizPortal {
    interface IAddSiteScope extends ng.IScope {
        createSite: () => void;
    }
    class AddSiteCtrl {
        static $inject: string[];
        constructor(scope: IAddSiteScope, $state: ng.ui.IStateService, BrowserTitleService: BrowserTitleService, createSiteAction: CreateSiteAction);
    }
}
declare module VizPortal {
    interface IViz {
        path: string;
        isAdminViz: boolean;
        params: _.Dictionary<any>;
        siteUrlName?: string;
        instanceId?: string;
        isExplicitOriginalViz?: boolean;
    }
}
declare module VizPortal {
    class VizService {
        private $state;
        private $location;
        private WindowLocationService;
        private server;
        private BrowserSupportService;
        static $inject: string[];
        private static ExplicitOriginalVizParamKey;
        private static EmbedParamKey;
        private static InstanceIdKey;
        private static IsGuestRedirectFromVizPortalParamKey;
        private static VizExportFileTypeRegex;
        constructor($state: ng.ui.IStateService, $location: ng.ILocationService, WindowLocationService: WindowLocationService, server: ServerService, BrowserSupportService: BrowserSupportService);
        /**
         * Reload the current state when the location changes. This is needed for two reasons
         * 1. The query string parameters are not registered as $stateParams, so ui-router won't reload the state
         *    if they change. We need to make it reload in this case.
         * 2. If the $location changes but the $stateParams are identical to the $stateParams we originally entered
         *    the $state with, then ui-router will not reload the $state. This can happen if a user types in url to
         *    viz with vizPath `workbook/view1`, switches tabs by clicking on view2 so the url updates, then uses
         *    the url to switch back to `workbook/view1`. Because `workbook/view1` is the $stateParam when we entered
         *    the $state, ui-router will assume that nothing is changed and it won't reload. We force it to.
         */
        reloadOnLocationChange($scope: ng.IScope): void;
        /**
         * Change $location due to a change in a url parameter
         */
        updatePath($scope: ng.IScope, params: _.Dictionary<any>): void;
        updateInstanceId($scope: ng.IScope, instanceId: string): void;
        updateExplicitOriginalViz($scope: ng.IScope, explicitOriginalViz: boolean): void;
        getIsExplicitOriginalViz(): boolean;
        getInstanceId(): string;
        getExplicitLocationSearchValue(key: string): string;
        getVizParams(): _.Dictionary<any>;
        getIsExplicitOriginalVizFromUrl(url: string): boolean;
        /**
         * Gets the viz path from a full url. For example, url:
         *
         * uri:     http://localhost/vizportal/#/views/sizetabs/auto/workgroupadmin@tsi.lan/noiceland?blah
         * returns: sizetabs/auto/workgroupadmin@tsi.lan/noiceland
         */
        getPath(uri: string): string;
        /**
         * Build a JS-API-ready uri from a viz object
         */
        getUri(viz: IViz): string;
        /**
         * returns true if embed search param is on in url
         * Example: ?:embed=yes
         */
        isEmbedParamOn(): boolean;
        /**
         * returns true if the end of the location path has a viz export file type.
         * Example: /workbook/view.png
         */
        pathHasExportableFileType(): boolean;
        /**
         * Go to embedded version of the current url
         */
        getEmbeddedVizqlUrl(options?: {
            isFromGuest?: boolean;
        }): string;
        getVizqlUrl(): string;
        private dontReloadNextLocationChange($scope);
    }
}
declare module VizPortal {
    interface IAdminVizStateParams extends ng.ui.IStateParamsService {
        sheetUrlId: string;
    }
    interface IAdminVizScope extends ng.IScope {
        viz: IViz;
        isServerAnalysis: () => boolean;
        viewName: () => string;
    }
    class AdminVizViewerCtrl {
        private static ViewNameLocKeyDict;
        private sheetUrlId;
        static $inject: string[];
        constructor($scope: IAdminVizScope, $stateParams: IAdminVizStateParams, $location: ng.ILocationService, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, BrowserTitleService: BrowserTitleService, vizService: VizService, workbookUrlId: string);
    }
}
declare module VizPortal {
    interface IAuthenticateDatabaseParams {
        authentication: string;
        username: string;
        password?: string;
        reuse_forever?: boolean;
        reuse?: boolean;
        crypted: string;
        connection: string;
        path: string;
        authenticity_token?: string;
        oauthrequest?: boolean;
    }
    class ConnectionAuthService {
        private $http;
        static $inject: string[];
        constructor($http: ng.IHttpService);
        authenticate(path: string, data: IAuthenticateDatabaseParams): ng.IHttpPromise<{}>;
    }
}
declare module VizPortal {
    interface IOpenWindowSpecs {
        width?: number;
        height?: number;
        toolbar?: number;
        resizable?: number;
        top?: number;
        left?: number;
    }
    /**
     * Contains window.location behavior not covered by angular's $location service.
     *
     * Why? The browser's window.location cannot be mocked. This adds one level of
     * indirection between app code and window.location so we can mock for testing.
     */
    class WindowLocationService {
        private $window;
        static $inject: string[];
        constructor($window: ng.IWindowService);
        download(uri: string): void;
        private formatWindowOpenSpecs(specs);
        open(uri: string, windowName?: string, specs?: IOpenWindowSpecs): any;
        /**
         * Sets the location to the given uri
         */
        navigateTo(uri: string): void;
        /**
         * Set the location of the given iframe
         */
        navigateIFrameTo(iframe: HTMLIFrameElement, uri: string): void;
        navigateToWithoutAddingToHistory(uri: string): void;
        /**
         * Cross-browser method for getting window.location.origin. Example:
         * window.location.href : 'scheme://domain:port/path?query_string#fragment_id'
         * return value         : 'scheme://domain:port'
         */
        getOrigin(): string;
        /**
         * Get everything after the host in a url.  Example:
         *
         *    window.location.href : 'scheme://domain:port/path?query_string#fragment_id'
         *    return value         : '/path?query_string#fragment_id'
         */
        getPathQueryFragment(): string;
        /**
         * Get path and query components of url.  Example:
         *
         *    window.location.href : 'scheme://domain:port/path?query_string#fragment_id'
         *    return value         : '/path?query_string'
         */
        getPathQuery(): string;
        /**
         * Set everything after the host in a url. Example:
         *
         *    pathQueryFragment    : '/path?query_string#fragment_id'
         *    window.location.href : 'scheme://domain:port/path?query_string#fragment_id'
         */
        setPathQueryFragment(pathQueryFragment: string): void;
        reload(): void;
    }
}
declare module VizPortal {
    interface PopupStateParams extends ng.ui.IStateParamsService {
        closePopupWhenDone: string;
    }
    class WindowPopupService {
        private $location;
        private $stateParams;
        private $window;
        static $inject: string[];
        constructor($location: ng.ILocationService, $stateParams: PopupStateParams, $window: ng.IWindowService);
        private safelyCallFunction(func);
        maybeNotifyAndClose(): boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IAllowedAuthenticationMode {
        mode: string;
        modeFriendlyName: string;
    }
    interface IDataConnectionAuthInfo {
        modulus: string;
        exponent: string;
        defaultUsername?: string;
        connectionType: string;
        connectionTypeDisplayName: string;
        authenticationMode: string;
        allowedAuthenticationModes: IAllowedAuthenticationMode[];
        rememberPasswordsForever?: boolean;
        databaseServer?: string;
        databaseName?: string;
        databaseFilename?: string;
        databaseSchema?: string;
        connection: string;
        actionPath: string;
        originalPath: string;
        oauthCredentialCount?: number;
        associatedCredentialId?: string;
        resourceType?: string;
        resourceId?: string;
        isAuthoringSession: boolean;
    }
}
declare module VizPortal {
    interface IConnectionProperty {
        translate: string;
        value: string;
        tbTestId?: string;
    }
    interface IConnectionAuthenticationViewModel {
        selectedAuthMode?: string;
        username?: string;
        password?: string;
        rememberPassword?: boolean;
    }
    interface IConnectionAuthenticationScope extends ng.IScope {
        connectionProperties: IConnectionProperty[];
        connectionAuthForm: ng.IFormController;
        attemptAuth: () => void;
        authModeOptions: ServerApi.IAllowedAuthenticationMode[];
        rememberPasswordsForever: boolean;
        focusOnPassword: boolean;
        errorMessageKey: string;
        isPreview: boolean;
        busy: boolean;
        doneWithWindow: boolean;
        authVM: IConnectionAuthenticationViewModel;
    }
    interface ConnectionAuthenticationStateParams extends ng.ui.IStateParamsService, ServerApi.IGetDataConnectionAuthInfoParams {
        isPreview: string;
    }
    class AuthenticateConnectionCtrl {
        private $scope;
        private $stateParams;
        private connectionAuthService;
        private windowLocationService;
        private authInfo;
        private windowPopupService;
        static $inject: string[];
        constructor($scope: IConnectionAuthenticationScope, $stateParams: ConnectionAuthenticationStateParams, connectionAuthService: ConnectionAuthService, windowLocationService: WindowLocationService, authInfo: ServerApi.IDataConnectionAuthInfo, windowPopupService: WindowPopupService);
        private getAuthenticateDatabaseParams();
    }
}
declare module VizPortal {
    module ServerApi {
        interface IOrderClause {
            field: string;
            ascending: boolean;
        }
    }
}
declare module VizPortal {
    module Order {
        var MaxLength: number;
        function fromInput(input: string, possibleOrderKeys?: string[]): ServerApi.IOrderClause[];
        function startsWithField(clauses: ServerApi.IOrderClause[], field: string): boolean;
        function withFirstClauseToggled(clauses: ServerApi.IOrderClause[]): ServerApi.IOrderClause[];
        function withClausePrepended(clauses: ServerApi.IOrderClause[], newClause: ServerApi.IOrderClause): ServerApi.IOrderClause[];
        function asc(field: string): ServerApi.IOrderClause;
        function desc(field: string): ServerApi.IOrderClause;
        function withoutField(order: ServerApi.IOrderClause[], field: string): ServerApi.IOrderClause[];
        /**
         * Finds the order clause for the field in the order. Returns undefined if no clause is found.
         */
        function findOrderClauseForField(order: ServerApi.IOrderClause[], field: string): ServerApi.IOrderClause;
        function serialize(order: ServerApi.IOrderClause[]): string;
    }
}
declare module VizPortal {
    var OrderKeys: {
        adminCount: string;
        authoringEnabled: string;
        availability: string;
        connectionTypeDisplayName: string;
        currentLoggedInUserCount: string;
        createdAt: string;
        datasourceCount: string;
        definition: string;
        displayName: string;
        domainName: string;
        favoritesTotal: string;
        groupCount: string;
        hasAlert: string;
        hasExtracts: string;
        hitsTotal: string;
        hitsLastDayTotal: string;
        hitsLastMonthTotal: string;
        hitsLastTwoWeeksTotal: string;
        index: string;
        lastRefreshedAt: string;
        lastRunAt: string;
        lastSentAt: string;
        lastSignIn: string;
        liveDBConnectionsWhitelistEnabled: string;
        maxSiteRole: string;
        metricsEnabled: string;
        minimumSiteRole: string;
        name: string;
        numSheets: string;
        ownerName: string;
        parentName: string;
        priority: string;
        projectName: string;
        refreshType: string;
        relevancy: string;
        runNextAt: string;
        scheduleName: string;
        siteAdminsCanAddUsers: string;
        siteCount: string;
        siteName: string;
        siteRole: string;
        size: string;
        sheetImageEnabled: string;
        storageQuotaBytes: string;
        storageQuotaPercentUsed: string;
        storageUsedBytes: string;
        subject: string;
        targetName: string;
        type: string;
        updatedAt: string;
        urlName: string;
        userCount: string;
        userName: string;
        username: string;
        userQuota: string;
        versionNumber: string;
        viewCount: string;
        workbookCount: string;
        workbookName: string;
    };
}
declare module VizPortal {
    interface IContentType {
        name: string;
        filterKeys: string[];
        orderKeys: string[];
        defaultOrder: ServerApi.IOrderClause[];
        extraQueryParams?: any;
    }
    var ProjectContentType: IContentType;
    var WorkbookContentType: IContentType;
    var WorkbookRevisionContentType: IContentType;
    var ViewContentType: IContentType;
    var ViewInWorkbookContentType: IContentType;
    var DatasourceContentType: IContentType;
    var SitesContentType: IContentType;
    var GroupContentType: IContentType;
    var SiteUserContentType: IContentType;
    var ScheduleContentType: IContentType;
    var ExtractTaskContentType: IContentType;
    var RemoteRefreshScheduleContentType: IContentType;
    var SubscriptionContentType: IContentType;
    var ServerUserContentType: IContentType;
    var GroupUserContentType: IContentType;
}
declare module VizPortal {
    interface IContentTypes<T> extends _.Dictionary<T> {
        project: T;
        datasource: T;
        workbook: T;
        view: T;
    }
    var ContentTypes: IContentTypes<string>;
}
declare module VizPortal {
    class ListResult<T> {
        items: T[];
        index: number;
        total: number;
        constructor(items: T[], index?: number, total?: number);
        static empty<T>(): ListResult<T>;
    }
}
declare module VizPortal {
    module ServerApi {
        interface IFilterClause {
            operator: string;
        }
        interface ILeafFilterClause extends IFilterClause {
        }
        interface ICompositeFilterClause extends IFilterClause {
            clauses: ILeafFilterClause[];
        }
        interface IStringValuedFilterClause extends ILeafFilterClause {
            value: string;
        }
        interface IFieldFilterClause extends ILeafFilterClause {
            field: string;
        }
        interface IValuedFieldFilterClause<T> extends IFieldFilterClause {
            value: T;
        }
        interface IStringArrayValuedFieldFilterClause extends IFieldFilterClause {
            values: string[];
        }
        var FilterOps: {
            and: string;
            eq: string;
            lte: string;
            gte: string;
            has: string;
            inArray: string;
            matches: string;
        };
        var FilterFieldNames: {
            connectionType: string;
            createdAt: string;
            databaseUsername: string;
            datasourceId: string;
            domainId: string;
            groupId: string;
            groupIds: string;
            hasAlert: string;
            hasExtracts: string;
            hasEmbeddedPassword: string;
            isDefaultPort: string;
            isFavorite: string;
            isPublished: string;
            isRecent: string;
            lastRefreshedAt: string;
            maxSiteRole: string;
            minimumSiteRole: string;
            ownerId: string;
            parentId: string;
            parentType: string;
            projectId: string;
            scheduledAction: string;
            scheduleId: string;
            serverName: string;
            serverPort: string;
            siteId: string;
            siteRole: string;
            tags: string;
            updatedAt: string;
            workbookId: string;
        };
    }
}
declare module VizPortal {
    module ServerApi {
        interface IPage {
            startIndex: number;
            maxItems: number;
        }
        interface IPagedItemsParams {
            page?: IPage;
        }
    }
}
declare module VizPortal {
    module ServerApi {
        interface IGetItemsParams extends IPagedItemsParams {
            filter?: ICompositeFilterClause;
            order?: IOrderClause[];
        }
    }
}
declare module VizPortal {
    interface IListFetcher<T> {
        fetchList(params: ServerApi.IGetItemsParams): ng.IPromise<ListResult<T>>;
    }
}
declare module VizPortal {
    module Filter {
        function and(clauses: ServerApi.ILeafFilterClause[]): ServerApi.ICompositeFilterClause;
        function search(search: string): ServerApi.IStringValuedFilterClause;
        function fieldEq<T>(field: string, value: T): ServerApi.IValuedFieldFilterClause<T>;
        function stringFieldEq(field: string, value: string): ServerApi.IValuedFieldFilterClause<string>;
        function numberFieldEq(field: string, value: number): ServerApi.IValuedFieldFilterClause<number>;
        function stringFieldGte(field: string, value: string): ServerApi.IValuedFieldFilterClause<string>;
        function stringFieldLte(field: string, value: string): ServerApi.IValuedFieldFilterClause<string>;
        function stringFieldMatches(field: string, value: string): ServerApi.IValuedFieldFilterClause<string>;
        function stringArrayFieldHas(field: string, value: string): ServerApi.IValuedFieldFilterClause<string>;
        function stringFieldInArray(field: string, values: string[]): ServerApi.IStringArrayValuedFieldFilterClause;
        function findFieldFilterClause(field: string, operator: string, filter: ServerApi.ICompositeFilterClause): ServerApi.IFieldFilterClause;
    }
}
declare module VizPortal {
    interface ISliceable<T> {
        getSlice(start: number, size: number): ng.IPromise<ListResult<T>>;
    }
}
declare module VizPortal {
    interface ICountable {
        getCount(): ng.IPromise<number>;
    }
    interface IResourceQuery<T> extends ISliceable<T>, ICountable {
        getFilters(): ServerApi.ILeafFilterClause[];
        getOrder(): ServerApi.IOrderClause[];
    }
    class ResourceQuery<T> implements IResourceQuery<T> {
        private fetcher;
        private filterClauses;
        private order;
        private extraParams;
        constructor(fetcher: IListFetcher<T>);
        static formatFilterClauses(filterClauses: ServerApi.ILeafFilterClause[]): ServerApi.ICompositeFilterClause;
        static getPage(start: number, length: number): ServerApi.IPage;
        getSlice(start: number, size: number): ng.IPromise<ListResult<T>>;
        getFirst(): ng.IPromise<T>;
        getCount(): ng.IPromise<number>;
        getFilters(): ServerApi.ILeafFilterClause[];
        getOrder(): ServerApi.IOrderClause[];
        withFiltersAndOrder(filterClauses: ServerApi.ILeafFilterClause[], order: ServerApi.IOrderClause[]): ResourceQuery<T>;
        withExtraParams(extraParams?: any): ResourceQuery<T>;
        withFilters(filterClauses: ServerApi.ILeafFilterClause[]): ResourceQuery<T>;
        addFilter(filterClause: ServerApi.ILeafFilterClause): ResourceQuery<T>;
        withOrder(order: ServerApi.IOrderClause[]): ResourceQuery<T>;
        private clone();
        private setFilterClauses(filterClauses);
        private setOrder(order);
        private setExtraParams(extraParams);
    }
}
declare module VizPortal.ServerApi {
    interface IFieldValue {
        value: string;
        label: string;
        count: number;
    }
}
declare module VizPortal.ServerApi {
    interface IFieldValuesParams extends IPagedItemsParams {
        field: string;
        labelMatchText: string;
        resourceType: string;
        resourceCountFilter?: ICompositeFilterClause;
    }
    var FieldValueResourceType: {
        dataConnection: string;
        datasource: string;
        project: string;
        view: string;
        workbook: string;
    };
}
declare module VizPortal {
    class FieldValuesQuery {
        private fetcher;
        private field;
        private resourceType;
        private filterClauses;
        private matchText;
        constructor(fetcher: IListFetcher<ServerApi.IFieldValue>, field: string, resourceType: string);
        getSlice(start: number, size: number): ng.IPromise<ListResult<ServerApi.IFieldValue>>;
        getFilters(): ServerApi.ILeafFilterClause[];
        withMatchText(matchText: string): FieldValuesQuery;
        withFilters(filterClauses: ServerApi.ILeafFilterClause[]): FieldValuesQuery;
        private clone();
        private setFilterClauses(filterClauses);
        private setMatchText(matchText);
    }
}
declare module VizPortal {
    interface IListResource<T> {
        all(): ResourceQuery<T>;
    }
    interface IDetailResource<T> {
        getById(id: string): ng.IPromise<T>;
    }
    interface IActionResource<T> {
        actions(id: string): ng.IPromise<T>;
    }
    interface IFieldValuesResource {
        valuesForField(field: string): FieldValuesQuery;
    }
    interface IListAndFieldValuesResource<T> extends IListResource<T> {
        valuesForField?(field: string): FieldValuesQuery;
    }
}
declare module VizPortal {
    module ServerFilterClauses {
        function create(filterValues: IContentFilters<string>): ServerApi.IFilterClause[];
    }
}
declare module VizPortal {
    interface IPlace {
        subplace(name: string): ISubplace<any>;
        subplaces(): ISubplace<any>[];
    }
    interface ISubplace<T> {
        name: string;
        type: IContentType;
        resource: IListAndFieldValuesResource<T>;
        defaultFilters: _.Dictionary<string>;
        filterKeys(): string[];
        query(): IResourceQuery<T>;
        filterValuesQuery(field: string): FieldValuesQuery;
    }
    class Place implements IPlace {
        private subplaceMap;
        private subplaceList;
        constructor();
        subplace(name: string): ISubplace<any>;
        subplaces(): ISubplace<any>[];
        addSubplace(subplace: ISubplace<any>): void;
    }
    class Subplace<T> implements ISubplace<T> {
        name: string;
        type: IContentType;
        private resourceQueryFn;
        private filterValuesQueryFn;
        resource: IListAndFieldValuesResource<T>;
        defaultFilters: _.Dictionary<string>;
        private excludeFilters;
        constructor(name: string, type: IContentType, resourceQueryFn: () => IResourceQuery<T>, filterValuesQueryFn: (filter: string) => FieldValuesQuery, resource: IListAndFieldValuesResource<T>, defaultFilters: _.Dictionary<string>, excludeFilters?: string[]);
        filterKeys(): string[];
        query(): IResourceQuery<T>;
        filterValuesQuery(field: string): FieldValuesQuery;
        static empty<T>(name: string, type: IContentType, $q: ng.IQService): Subplace<T>;
        static create<T>(name: string, type: IContentType, resource: IListAndFieldValuesResource<T>, urlParamsFn: () => _.Dictionary<any>, defaultFilters?: _.Dictionary<string>, excludeFilters?: string[]): Subplace<T>;
    }
}
declare module VizPortal {
    interface ICreatedItemInfo {
        createdAt: Date;
    }
    interface IDataConnectionTypeItemInfo {
        connectionType: string;
        connectionTypeDisplayName: string;
    }
    interface IDescriptionItemInfo {
        description: string;
    }
    interface IFavoriteItem {
        favorite: boolean;
    }
    interface IIdItemInfo {
        id: string;
    }
    interface INamedItemInfo extends IIdItemInfo {
        name?: string;
    }
    interface INamedThumbnailItemInfo extends INamedItemInfo, IThumbnailItemInfo {
    }
    interface IOwnedItemInfo {
        owner?: IUserInfo;
    }
    interface IProjectItemInfo {
        project?: INamedItemInfo;
    }
    interface ITaggedItemInfo {
        tags: string[];
    }
    interface IThumbnailItemInfo {
        thumbnailUrl: string;
    }
    interface IDownloadItemInfo {
        downloadUrl: string;
    }
    interface IUpdatedItemInfo {
        updatedAt: Date;
    }
    interface IEditableItemInfo {
        editUrl?: string;
    }
    interface IItemStatisticsInfoFields {
        hitsTotal: number;
        favoritesTotal: number;
        hitsLastTwoWeeksTotal?: number;
    }
    interface IItemStatisticsInfo extends IItemStatisticsInfoFields {
        maxStatValues: IItemStatisticsInfoFields;
    }
    interface IStatsTimeSeriesInfo {
        hitsTimeSeries?: number[];
    }
    interface IGroupBasicInfo extends INamedItemInfo {
        isAllUsersGroup: boolean;
        domainName?: string;
    }
    interface IExtractItemInfo {
        lastRefreshedAt?: Date;
        hasExtracts: boolean;
        hasAlert: boolean;
        hasIncrementalExtract: boolean;
    }
    interface IScheduledItemInfo {
        schedule: INamedItemInfo;
    }
    interface ISiteItemInfo {
        site: ServerApi.ISiteNameWithId;
    }
    interface INamedAndOwnedItemInfo extends INamedItemInfo, IOwnedItemInfo {
    }
    var NamedItemInfoKeys: {
        id: string;
        name: string;
    };
}
declare module VizPortal {
    interface IProjectBase extends ICreatedItemInfo, IDescriptionItemInfo, INamedItemInfo, IOwnedItemInfo {
        controlledPermissionsEnabled: boolean;
    }
    interface IProjectInfo extends IProjectBase {
        workbookCount: number;
        datasourceCount: number;
        viewCount: number;
    }
    interface IProjectDetailInfo extends IProjectBase {
    }
}
declare module VizPortal {
    interface IWorkbookBase extends IUpdatedItemInfo, INamedItemInfo, IOwnedItemInfo, IProjectItemInfo, ITaggedItemInfo, IThumbnailItemInfo, IFavoriteItem, IDownloadItemInfo, IExtractItemInfo {
        displayTabs: boolean;
        size: number;
    }
    interface IWorkbookInfo extends IWorkbookBase, IItemStatisticsInfo {
        numSheets: number;
        defaultViewId: string;
        repositoryUrl: string;
    }
    interface IWorkbookDetailInfo extends IWorkbookBase, ICreatedItemInfo, IDescriptionItemInfo, IEditableItemInfo, IStatsTimeSeriesInfo {
    }
    interface IWorkbookParentInfo extends INamedItemInfo, IOwnedItemInfo, IProjectItemInfo {
        numSheets: number;
        displayTabs: boolean;
    }
}
declare module VizPortal {
    class BreadcrumbsService {
        groupsUrl: string;
        siteUrl: string;
        project: IProjectBase;
        projectUrl: string;
        workbook: IWorkbookBase;
        workbookUrl: string;
        forgetWorkbook(): void;
        forgetProject(): void;
        rememberSiteUrl(url: string): void;
        rememberProjectUrl(project: IProjectBase, url: string): void;
        rememberWorkbookUrl(workbook: IWorkbookBase, url: string): void;
        workbookChanged(workbook: IWorkbookParentInfo): void;
        projectChanged(project: IIdItemInfo): void;
        rememberGroupsUrl(url: string): void;
    }
}
declare module VizPortal {
    var ModalSize: {
        medium: string;
        fitToContent: string;
    };
    interface IModalOptions {
        templateUrl: string;
        controller?: any;
        resolve?: {};
        scope?: ng.IScope;
        position?: IModalPositionOptions;
        keyboard?: boolean;
        classes?: string;
        size?: string;
        _showArrow?: boolean;
        backdrop?: any;
        backdropClasses?: string;
        closeX?: boolean;
        tbTestId?: string;
    }
    interface IAlertOptions {
        titleId?: string;
        translatedTitle?: string;
        messageId?: string;
        translatedMessage?: string;
    }
    interface IModalPositionOptions {
        hostElement?: JQuery;
        reserveHeight?: number;
    }
    interface IModalScope extends ng.IScope {
        close: (result: any) => void;
        dismiss: (reason?: any) => void;
        options: IModalOptions;
    }
    interface IModalInstance {
        close: (result: any) => void;
        dismiss: (reason?: any) => void;
        result: ng.IPromise<any>;
        _id?: string;
        _scope?: ng.IScope;
    }
    interface IBackdropScope extends ng.IScope {
        backdropClick(): void;
        options: IModalOptions;
    }
    interface IBackdrop {
        scope: IBackdropScope;
        element: JQuery;
    }
    class ModalService {
        private $window;
        private $compile;
        private $rootScope;
        private $q;
        private $controller;
        private $injector;
        private $templateCache;
        private $http;
        private StackedElementsService;
        static $inject: string[];
        static BackdropClass: string;
        static MinimumSpaceBetweenDialogAndViewport: number;
        private modalInstances;
        private id;
        constructor($window: ng.IWindowService, $compile: ng.ICompileService, $rootScope: ng.IScope, $q: ng.IQService, $controller: ng.IControllerService, $injector: ng.auto.IInjectorService, $templateCache: ng.ITemplateCacheService, $http: ng.IHttpService, StackedElementsService: StackedElementsService);
        /**
         * Creates an instance of IModalPositionOptions that will instruct the modal service to anchor
         * the dialog to the element.
         * @param element
         */
        static anchoredTo(element: JQuery): IModalPositionOptions;
        open(options: IModalOptions): IModalInstance;
        alert(options: IAlertOptions): IModalInstance;
        private createBackdrop(modalInstance, options);
        private attachKeydownHandler(modalInstance, options);
        private detachKeydownHandler(modalInstance);
        private getWindowSize();
        private position(modalElement, options);
        /**
        * Attempts to position the modal element relative to the host element.
        * First it will attempt to place the modal below the host element.
        * Next it will attempt to place the modal above the host element.
        * If both of these attempts fail, it will return null to signal that positioning failed.
        */
        private positionRelativeToHostElement(modalElement, options, reserveHeight);
        private getResolvePromises(resolves);
        private close(modalInstance, modalStackedElement, backdropStackedElement, backdropScope);
        dismissAll(): void;
    }
}
declare module VizPortal {
    interface IActionContext {
        scope: ng.IScope;
        targetElement?: JQuery;
    }
    module ActionContext {
        /**
         * Creates an ActionContext from a JQuery event, for example, from a button with a click
         * listener. The returned target element is that on which the event was defined, and the
         * returned scope is that of the target element.
         */
        function fromEvent($event: JQueryEventObject): IActionContext;
    }
}
declare module VizPortal {
    interface IErrorDetail {
        itemName: string;
        itemUrl?: string;
        errorMessage: string;
    }
    interface IMultipleResultTranslator<T> {
        describeSuccessSummary(successCount: number): string;
        describeErrorSummary(errorCount: number): string;
        describeErrorDetail(errorItem: IErrorItem<T>): IErrorDetail;
    }
    interface IMultipleResultNotificationOptions {
        successSummary?: string;
        errorSummary?: string;
        errorDetails?: IErrorDetail[];
    }
    module MultipleResultNotificationOptions {
        function create<T>(result: MultipleItemResult<T>, translator: IMultipleResultTranslator<T>): IMultipleResultNotificationOptions;
    }
    interface INotificationTranslationIds {
        successId: string;
        errorId: string;
    }
    class ContentActionNotification {
        private $translate;
        private scope;
        private toaster;
        private modal;
        private SliceableFactory;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, scope: ng.IScope, toaster: ToasterService, modal: ModalService, SliceableFactory: SliceableFactory);
        notifyResult(items: Set<INamedItemInfo>, errors: ServerApi.IError[], translations: INotificationTranslationIds, translationParams?: Object): void;
        notify(options: IMultipleResultNotificationOptions): void;
        notifySuccess(successMessage: string): void;
        notifyFailure(failureMessage: string): void;
    }
}
declare module VizPortal {
    class AbstractContentAction<TContentItem extends INamedItemInfo> {
        private ConfirmActionDialog;
        private ContentActionNotification;
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification);
        executeFromEvent(contentItems: Set<TContentItem>, $event: JQueryEventObject): ng.IPromise<ServerApi.IResult>;
        execute(contentItems: Set<TContentItem>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        private defaultDialogConfig(actionContext);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, contentItems: Set<TContentItem>): void;
        notificationTranslationIds(): INotificationTranslationIds;
        notificationTranslationValues(dialogScope: ng.IScope): Object;
    }
}
declare module VizPortal {
    interface IChangeSiteAvailabilityScope extends ng.IScope {
        dialog: {
            siteName: string;
        };
    }
    class ActivateSitesAction extends AbstractContentAction<ServerApi.ISiteSettingsForServerAdmin> {
        private $translate;
        private Sites;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, Sites: Sites);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, sites: Set<ServerApi.ISiteSettingsForServerAdmin>): void;
        notificationTranslationIds(): INotificationTranslationIds;
        notificationTranslationValues(scope: ng.IScope): Object;
    }
}
declare module VizPortal {
    module SliceableHelper {
        var BlockSize: number;
        function fetchAll<T>(sliceable: ISliceable<T>, itemsReceived?: (items: T[]) => boolean): ng.IPromise<ListResult<T>>;
    }
}
declare module VizPortal {
    module RequestHelper {
        var DefaultBlockSize: number;
        function makeBlocks<TItem>(items: TItem[], blockSize: number): TItem[][];
        function buildRequests<TItem, TParams, TResult>(items: TItem[], buildRequest: (block: TItem[]) => ServerApi.IRequest<TParams, TResult>, blockSize?: number): ServerApi.IRequest<TParams, TResult>[];
        function buildRequests2<TItem1, TItem2, TParams, TResult>(items1: TItem1[], items2: TItem2[], buildRequest: (block1: TItem1[], block2: TItem2[]) => ServerApi.IRequest<TParams, TResult>, blockSize?: number): ServerApi.IRequest<TParams, TResult>[];
        function buildRequests3<TItem1, TItem2, TItem3, TParams, TResult>(items1: TItem1[], items2: TItem2[], items3: TItem3[], buildRequest: (block1: TItem1[], block2: TItem2[], block3: TItem3[]) => ServerApi.IRequest<TParams, TResult>, blockSize?: number): ServerApi.IRequest<TParams, TResult>[];
    }
}
declare module VizPortal {
    class Set<T> {
        private items;
        private keyForItem;
        constructor(keyForItem: (item: T) => string);
        static fromKeyArray(keys: string[]): Set<string>;
        static fromIdItemArray<T extends IIdItemInfo>(items: T[]): Set<T>;
        static singleton<T>(item: T, keyForItem: (item: T) => string): Set<T>;
        keyFor(item: T): string;
        containsKey(key: string): boolean;
        contains(item: T): boolean;
        size(): number;
        isEmpty(): boolean;
        keys(): string[];
        get(itemId: string): T;
        add(item: T): void;
        addItems(items: T[]): void;
        update(item: T): void;
        updateItems(items: T[]): void;
        remove(item: T): void;
        removeItems(items: T[]): void;
        removeItemsIn<U>(set: Set<U>): void;
        removeItemsNotIn<U>(set: Set<U>): void;
        toggle(item: T): boolean;
        toggleItems(items: T[]): void;
        clear(): void;
        toArray(): any[];
        each(iterator: (item: T) => void, context?: any): void;
        find(iterator: (item: T) => boolean, context?: any): any;
        pluck(propertyName: string): any[];
        map<TResult>(iterator: _.ObjectIterator<T, TResult>, context?: any): any[];
        reduce<TResult>(iterator: _.MemoIterator<T, TResult>, memo?: TResult, context?: any): TResult;
        sum(iterator: (item: T) => number): number;
        all(iterator: _.ObjectIterator<T, boolean>): boolean;
        any(iterator: _.ObjectIterator<T, boolean>): boolean;
        filter(filterFunction: (item: T) => boolean): Set<T>;
        clone(): Set<T>;
        first(): T;
        getByIndex(index: number): T;
    }
}
declare module VizPortal {
    interface IImportUsersResult extends ServerApi.IResult {
        users: ServerApi.IUser[];
    }
    module ResultHelper {
        /**
         * Merges lists of properties from a list of result objects (typically from an action that was
         * split into multiple requests) into a single list of properties.
         * @param results An array of result objects from the server
         * @param getProperty A function that extracts the relevant property from each result item
         * @returns {T[]}
         */
        function combine<TResult, TProperty>(results: TResult[], getProperty: (result: TResult) => TProperty[]): TProperty[];
        /**
         * Merge objects from a list of result objects (typically from an action that was split into
         * multiple requests) by combining all the keys into a single object. If the same key appears
         * more than once in the source objects, the later one will take precedence.
         * @param results An array of result objects from the server
         * @param getProperty A function that extracts the relevant property from each result item
         * @returns {any}
         */
        function combineByKey<TResult, TProperty>(results: TResult[], getProperty: (result: TResult) => _.Dictionary<TProperty>): _.Dictionary<TProperty>;
        function combineErrors(results: ServerApi.IResult[]): ServerApi.IError[];
        function combineIds(results: {
            ids: string[];
        }[]): string[];
        function combineUsers(results: ServerApi.IUserActionResult[]): ServerApi.IUser[];
        function combineResults(results: ServerApi.IResult[]): ServerApi.IResult;
        function combineCodes(results: ServerApi.IUserActionResult[]): ServerApi.IResultCodes[];
        function combineUserResults(results: ServerApi.IUserActionResult[]): ServerApi.IUserActionResult;
        function combineImportUserResults(results: IImportUsersResult[]): IImportUsersResult;
        function hasErrors(result: ServerApi.IResult): boolean;
        function rejectResultOnError($q: ng.IQService): (result: ServerApi.IResult) => ng.IPromise<ServerApi.IResult>;
        function getErrorIds(result: ServerApi.IResult, options?: {
            excludeCode?: number;
        }): Set<string>;
        function getErrorIdsWithCode(result: ServerApi.IResult, code: number): Set<string>;
    }
}
declare module VizPortal.ServerApi {
    interface IScheduleFrequency {
        scheduleType: string;
        scheduleDetails: IDailySchedule;
    }
    interface ISchedule extends IScheduleFrequency {
        id: string;
        name: string;
        scheduledAction: string;
        priority: number;
        taskCount: number;
        parallel: boolean;
        runNextAt?: string;
    }
    var ScheduleTypes: {
        Hourly: string;
        Daily: string;
        Weekly: string;
        Monthly: string;
    };
    var ScheduleActions: {
        Extract: string;
        Subscription: string;
    };
    interface IHourlySchedule {
        startTime: number;
        endTime: number;
        recurrenceMinutes: number;
    }
    interface IDailySchedule {
        startTime: number;
    }
    interface IWeeklySchedule {
        startTime: number;
        recurrenceDaysOfWeek: string[];
    }
    var ScheduleDaysOfTheWeek: {
        Sun: string;
        Mon: string;
        Tue: string;
        Wed: string;
        Thu: string;
        Fri: string;
        Sat: string;
    };
    var ScheduleLastDayOfMonth: string;
    interface IMonthlySchedule {
        startTime: number;
        recurrenceDayOfMonth: string;
    }
}
declare module VizPortal.ServerApi {
    interface ICreateScheduleParams {
        name: string;
        scheduleType: string;
        scheduleDetails: IDailySchedule;
        scheduledAction: string;
        priority: number;
        parallel: boolean;
    }
    interface ICreateScheduleResult extends IResult {
        id: string;
    }
    class CreateScheduleRequest extends Request<ICreateScheduleParams, ICreateScheduleResult> {
        constructor(params: ICreateScheduleParams);
    }
}
declare module VizPortal.ServerApi {
    interface IMultipleIdsParams {
        ids: string[];
    }
    interface ISetOwnerParams extends IMultipleIdsParams {
        ownerId: string;
    }
    interface ITagsParams extends IMultipleIdsParams {
        tags: string[];
    }
    interface ISetPriorityParams extends IMultipleIdsParams {
        priority: number;
    }
    interface ISetScheduleParams extends IMultipleIdsParams {
        scheduleId: string;
    }
    interface ISingleIdParams {
        id: string;
    }
    interface ISetDescriptionParams extends ISingleIdParams {
        description: string;
    }
    interface ISetNameParams extends ISingleIdParams {
        name: string;
    }
    interface ISetProjectControlledPermissionsParams extends ISingleIdParams {
        controlledPermissionsEnabled: boolean;
    }
    interface IFavoriteParams {
        objectId: string;
        objectType: string;
    }
}
declare module VizPortal.ServerApi {
    class DeleteSchedulesRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal {
    module ServerApi {
        interface IGetItemsResult {
            totalCount?: number;
        }
    }
}
declare module VizPortal.ServerApi {
    interface IGetSchedulesResult extends IGetItemsResult {
        schedules: ISchedule[];
    }
    class GetSchedulesRequest extends Request<IGetItemsParams, IGetSchedulesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    class RunServerSchedulesRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class RunSchedulesRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class SetEnabledStatusForSchedulesRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[], enabled: boolean);
    }
}
declare module VizPortal.ServerApi {
    class SetScheduleNameRequest extends Request<ISetNameParams, IEmptyResult> {
        constructor(id: string, name: string);
    }
}
declare module VizPortal {
    class Resource<T> implements IListResource<T>, IDetailResource<T> {
        private fetcher;
        private allQuery;
        constructor(fetcher: IListFetcher<T>);
        all(): ResourceQuery<T>;
        getById(id: string, additionalFilterClauses?: ServerApi.ILeafFilterClause[]): ng.IPromise<T>;
    }
}
declare module VizPortal {
    class Schedules extends Resource<ServerApi.ISchedule> {
        private ErrorNotifyingServer;
        static filterByActionType(scheduledActionType: string): ServerApi.IValuedFieldFilterClause<string>;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        getByIdForSite(id: string, siteId?: string): ng.IPromise<ServerApi.ISchedule>;
        private setEnabledStatus(ids, status);
        disable(ids: string[]): ng.IPromise<ServerApi.IResult>;
        enable(ids: string[]): ng.IPromise<ServerApi.IResult>;
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        runServer(ids: string[]): ng.IPromise<ServerApi.IResult>;
        run(ids: string[]): ng.IPromise<ServerApi.IResult>;
        create(schedule: ServerApi.ICreateScheduleParams): ng.IPromise<ServerApi.ICreateScheduleResult>;
        update(schedule: ServerApi.IUpdateScheduleParams): ng.IPromise<ServerApi.IResult>;
        rename(id: string, newName: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    enum CreateExtractTasksMode {
        AllowRefreshNow = 0,
        AllowSchedule = 1,
        AllowBoth = 2,
    }
    class CreateExtractTasksAction {
        private ConfirmActionDialog;
        private ContentUrl;
        private $translate;
        private Workbooks;
        private Datasources;
        private SearchSuggestionsService;
        private ActionHelpers;
        private ModalService;
        static $inject: string[];
        private notificationTranslationIds;
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentUrl: ContentUrl, $translate: ng.translate.ITranslateService, Workbooks: Workbooks, Datasources: DataSources, SearchSuggestionsService: SearchSuggestionsService, ActionHelpers: ActionHelpers, ModalService: ModalService);
        private createDialogScope(parentScope, items, schedulePrompt, allowedMode);
        private execute<T>(items, context, schedulePrompt, scheduleRefreshAction, refreshNowPrompt, refreshNowAction, errorDetailFn, allowedMode);
        private dialogTitle(allowedMode);
        private createExtractErrorMessageFor(errorItem, schedule);
        forWorkbook(workbook: IWorkbookBase, context: IActionContext, allowedMode: CreateExtractTasksMode): ng.IPromise<ServerApi.IResult>;
        forWorkbooks(workbooks: Set<IWorkbookBase>, context: IActionContext, allowedMode: CreateExtractTasksMode): ng.IPromise<ServerApi.IResult>;
        private workbookErrorDetailFactory(schedule);
        private workbookErrorMessageFor(errorItem, schedule);
        forDatasource(datasource: IDataSourceInfo, context: IActionContext, allowedMode: CreateExtractTasksMode): ng.IPromise<any>;
        forDatasources(datasources: Set<IDataSourceInfo>, context: IActionContext, allowedMode: CreateExtractTasksMode): ng.IPromise<any>;
        private anyRefreshableDatasources(datasources);
        isRefreshableDatasource(datasource: IDataSourceInfo): boolean;
        private showCannotRefreshErrorAlert(datasources);
        private datasourceErrorDetailFactory(schedule);
        private datasourceErrorMessageFor(errorItem, schedule);
    }
}
declare module VizPortal {
    class ChangeDatasourceOwnerAction {
        private DataSourceErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private DataSources;
        private suggestions;
        private ModalService;
        static $inject: string[];
        constructor(DataSourceErrors: DataSourceErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, DataSources: DataSources, suggestions: SearchSuggestionsService, ModalService: ModalService);
        confirmChangeOwner(datasources: Set<IDataSourceInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(datasources, result);
    }
}
declare module VizPortal {
    module TagsHelper {
        interface ITagsChange {
            addTags: string[];
            removeTags: string[];
        }
        function tagsListFromTaggedItemSet(taggedSet: Set<ITaggedItemInfo>): ITagWithCount[];
        function tagSetFromTagsList(tagList: ITagWithCount[]): Set<ITagWithCount>;
        function getTagsChange(previousTagSet: Set<ITagWithCount>, newTagsList: ITagWithCount[]): ITagsChange;
        function parseTagString(tagString: string): string[];
        function quote(tag: string): string;
        function unquote(tag: string): string;
        function displayTagHtml(tag: string): string;
    }
}
declare module VizPortal {
    interface INamedAndTaggedItemInfo extends INamedItemInfo, ITaggedItemInfo {
    }
    interface IChangeTagsExecuteFnParams<T> {
        changeTagsAction: (ids: string[], addTags: string[], removeTags: string[]) => ng.IPromise<ServerApi.IResult>;
        getDescription: (itemSet: Set<T>) => string;
        notificationIds: INotificationTranslationIds;
        errorDetailFn: (errorItem: IErrorItem<T>) => IErrorDetail;
    }
    class ChangeTagsActionHelperService {
        private ConfirmActionDialog;
        private ActionHelpers;
        private $translate;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ActionHelpers: ActionHelpers, $translate: ng.translate.ITranslateService);
        createExecuteFn<T extends INamedAndTaggedItemInfo>(params: IChangeTagsExecuteFnParams<T>): (itemSet: Set<T>, context: IActionContext) => ng.IPromise<any>;
        private configureScope<T>(parentScope, itemSet, getDescription);
        errorMessageFor(errorItem: IErrorItem<any>): string;
    }
}
declare module VizPortal {
    class ChangeDatasourcesTagsAction {
        private ChangeTagsActionHelper;
        private $translate;
        private DataSources;
        private ContentUrl;
        private ModalService;
        static notificationTranslationIds: INotificationTranslationIds;
        private execute;
        static $inject: string[];
        constructor(ChangeTagsActionHelper: ChangeTagsActionHelperService, $translate: ng.translate.ITranslateService, DataSources: DataSources, ContentUrl: ContentUrl, ModalService: ModalService);
        private getDescription(datasources);
        showChangeTagsDialog(datasources: Set<IDataSourceInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        changeTagsErrorDetail(errorItem: IErrorItem<IDataSourceInfo>): IErrorDetail;
    }
}
declare module VizPortal {
    class ChangeProjectOwnerAction {
        private ProjectErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Projects;
        private suggestions;
        static $inject: string[];
        constructor(ProjectErrors: ProjectErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Projects: Projects, suggestions: SearchSuggestionsService);
        confirmChangeOwner(projects: Set<IProjectBase>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(projects, result);
    }
}
declare module VizPortal {
    class ChangeViewTagsAction {
        private ChangeTagsActionHelper;
        private $translate;
        private Views;
        private ContentUrl;
        static notificationTranslationIds: INotificationTranslationIds;
        execute: (itemSet: Set<IViewBase>, actionContext: IActionContext) => ng.IPromise<ServerApi.IResult>;
        static $inject: string[];
        constructor(ChangeTagsActionHelper: ChangeTagsActionHelperService, $translate: ng.translate.ITranslateService, Views: Views, ContentUrl: ContentUrl);
        private getDescription(views);
        changeTagsErrorDetail(errorItem: IErrorItem<IViewBase>): IErrorDetail;
    }
}
declare module VizPortal {
    class ChangeWorkbookOwnerAction {
        private WorkbookErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Workbooks;
        private suggestions;
        static $inject: string[];
        constructor(WorkbookErrors: WorkbookErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Workbooks: Workbooks, suggestions: SearchSuggestionsService);
        confirmChangeOwner(workbooks: Set<IWorkbookBase>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(workbooks, result);
    }
}
declare module VizPortal {
    class ChangeWorkbooksTagsAction {
        private ChangeTagsActionHelper;
        private $translate;
        private Workbooks;
        private ContentUrl;
        static notificationTranslationIds: INotificationTranslationIds;
        execute: (itemSet: Set<IWorkbookBase>, actionContext: IActionContext) => ng.IPromise<ServerApi.IResult>;
        static $inject: string[];
        constructor(ChangeTagsActionHelper: ChangeTagsActionHelperService, $translate: ng.translate.ITranslateService, Workbooks: Workbooks, ContentUrl: ContentUrl);
        private getDescription(workbooks);
        changeTagsErrorDetail(errorItem: IErrorItem<IWorkbookBase>): IErrorDetail;
    }
}
declare module VizPortal {
    class CreateProjectAction {
        private ConfirmActionDialog;
        private $translate;
        private toaster;
        private Projects;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, toaster: ToasterService, Projects: Projects);
        execute(actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        private errorMessage(errors);
    }
}
declare module VizPortal {
    interface IDeleteDatasourcesActionResult {
        allowed: boolean;
        serverResult?: ServerApi.IResult;
    }
    class DeleteDatasourcesAction {
        private DataSourceErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private DataSources;
        private ModalService;
        static $inject: string[];
        constructor(DataSourceErrors: DataSourceErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, DataSources: DataSources, ModalService: ModalService);
        confirmDeleteDatasource(datasource: IDataSourceInfo, context: IActionContext): ng.IPromise<IDeleteDatasourcesActionResult>;
        confirmDeleteDatasources(datasources: Set<IDataSourceInfo>, context: IActionContext): ng.IPromise<IDeleteDatasourcesActionResult>;
        private notifyResult(datasources, result);
    }
}
declare module VizPortal {
    class DeleteProjectsAction {
        private ProjectErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Projects;
        static $inject: string[];
        constructor(ProjectErrors: ProjectErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Projects: Projects);
        confirmDeleteProjects(projects: Set<IProjectInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(projects, result);
    }
}
declare module VizPortal {
    class DeleteSitesAction {
        private $translate;
        private $state;
        private server;
        private SiteSwitchService;
        private ConfirmActionDialog;
        private Sites;
        private ToasterService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, server: ServerService, SiteSwitchService: SiteSwitchService, ConfirmActionDialog: ConfirmActionDialog, Sites: Sites, ToasterService: ToasterService);
        private sites;
        private confirmActionDialogInstance;
        execute(sites: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        private deleteSites();
        private onComplete(actionResult);
        private onFail(errors);
        private onNotify(action);
    }
}
declare module VizPortal {
    class DeleteWorkbooksAction {
        private WorkbookErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Workbooks;
        static $inject: string[];
        constructor(WorkbookErrors: WorkbookErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Workbooks: Workbooks);
        confirmDeleteWorkbooks(workbooks: Set<IWorkbookInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(workbooks, result);
    }
}
declare module VizPortal.ServerApi {
    interface IWorkbookRevision extends IIdItem, IDownloadItemInfo {
        workbookId: string;
        versionNumber: number;
        size: number;
        publisher: string;
        publishTime: string;
        deleted: boolean;
    }
}
declare module VizPortal {
    class DownloadActions {
        private $translate;
        private $q;
        private toaster;
        private windowLocationService;
        private Workbooks;
        private DataSources;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, toaster: ToasterService, windowLocationService: WindowLocationService, Workbooks: Workbooks, DataSources: DataSources);
        private download(downloadItem);
        downloadWorkbook(workbook: IWorkbookBase): ng.IPromise<any>;
        downloadDatasource(datasource: IDataSourceInfo): ng.IPromise<any>;
        downloadWorkbookRevision(revision: ServerApi.IWorkbookRevision): void;
    }
}
declare module VizPortal {
    class EditSiteAction {
        private ConfirmActionDialog;
        private $translate;
        private $timeout;
        private $window;
        private $q;
        private toaster;
        private server;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService, $window: ng.IWindowService, $q: ng.IQService, toaster: ToasterService, server: ServerService);
        execute(site: ServerApi.ISiteSettingsForServerAdmin, actionContext: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    interface IErrorItem<T> {
        item: T;
        error: ServerApi.IError;
    }
    class MultipleItemResult<T> {
        private items;
        private serverResult;
        successCount: number;
        errorCount: number;
        constructor(items: Set<T>, serverResult: ServerApi.IResult);
        anySucceeded(): boolean;
        anyFailed(): boolean;
        errorItems(): IErrorItem<T>[];
        firstSuccessfulItem(): T;
    }
}
declare module VizPortal {
    class ActionHelpers {
        private $translate;
        private ContentActionNotification;
        static $inject: string[];
        private static DefaultItemNameFn;
        constructor($translate: ng.translate.ITranslateService, ContentActionNotification: ContentActionNotification);
        standardErrorDetails<T>(result: MultipleItemResult<T>, urlFn: (errorItem: T) => string, errorMessageFn: (errorItem: IErrorItem<T>) => string, itemNameFn?: (item: T) => string): {
            itemName: string;
            itemUrl: string;
            errorMessage: string;
        }[];
        standardErrorNotification<T>(result: MultipleItemResult<T>, translations: INotificationTranslationIds, describeErrorDetail: (errorItem: IErrorItem<T>) => IErrorDetail, itemNameFn?: (item: T) => string): IMultipleResultNotificationOptions;
        notifyStandardError<T>(items: Set<T>, translations: INotificationTranslationIds, describeErrorDetail: (errorItem: IErrorItem<T>) => IErrorDetail): (result: ServerApi.IResult) => ServerApi.IResult;
        static deselectNotFound<T>(selectedItems: Set<T>, result: ServerApi.IResult, notFoundCode: number): void;
        static deselectAllExceptErrors<T>(selectedItems: Set<T>, result: ServerApi.IResult, notFoundCode: number): void;
    }
}
declare module VizPortal {
    interface IConfirmMoveToProjectScope extends ng.IScope {
        projectPicker: {
            prompt: string;
            projectsQuery: (query: string) => ISliceable<ServerApi.IProjectName>;
            targetProject: ServerApi.IProjectName;
        };
    }
    class MoveToProjectAction {
        private ConfirmActionDialog;
        private $translate;
        private ContentActionNotification;
        private suggestions;
        private Workbooks;
        private WorkbookErrors;
        private DataSources;
        private DataSourceErrors;
        private ModalService;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, ContentActionNotification: ContentActionNotification, suggestions: SearchSuggestionsService, Workbooks: Workbooks, WorkbookErrors: WorkbookErrors, DataSources: DataSources, DataSourceErrors: DataSourceErrors, ModalService: ModalService);
        moveWorkbooks(workbooks: Set<IWorkbookBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        moveDatasources(datasources: Set<IDataSourceInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        private move(translations, items, itemType, moveFn, actionContext);
        private notification(result, translations, itemType, projectName);
    }
}
declare module VizPortal {
    interface IRenameProjectDialogScope extends ng.IScope {
        description: string;
        input: {
            text: string;
            maxLength?: number;
        };
    }
    class RenameProjectAction {
        private ConfirmActionDialog;
        private $translate;
        private toaster;
        private Projects;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, toaster: ToasterService, Projects: Projects);
        execute(project: IProjectBase, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        executeInPlace(project: IProjectBase, newName: string): ng.IPromise<ServerApi.IResult>;
        private getErrorMessage(error, project);
    }
}
declare module VizPortal {
    class WorkbookErrors {
        private $state;
        private $translate;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService);
        errorDetailsFor(workbookErrorItem: IErrorItem<IWorkbookBase>): IErrorDetail;
        private workbookUrl(workbook);
        errorMessageFor(errorItem: IErrorItem<IWorkbookBase>): string;
    }
}
declare module VizPortal {
    class SetDisplayTabsAction {
        private ConfirmActionDialog;
        private $translate;
        private Workbooks;
        private WorkbookErrors;
        private ActionHelpers;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Workbooks: Workbooks, WorkbookErrors: WorkbookErrors, ActionHelpers: ActionHelpers);
        setDisplayTabs(workbook: IWorkbookBase, displayTabs: boolean): ng.IPromise<void>;
        confirmSetDisplayTabs(workbooks: Set<IWorkbookBase>, context: IActionContext): ng.IPromise<any>;
        private setDisplayTabsAction(workbooks, displayTabs);
        private notifyResult(displayTabs, workbooks, result);
    }
}
declare module VizPortal {
    class SuspendSitesAction {
        private ConfirmActionDialog;
        private $translate;
        private toaster;
        private Sites;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, toaster: ToasterService, Sites: Sites);
        execute(sites: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface IConfirmDialogTypeaheadAttributes<T> {
        model: T;
        displayField: string;
        suggestions: (matchText: string) => ISliceable<any>;
        matchPrefixesOnly?: boolean;
    }
    interface IConfirmDialogFilterListScope<T> extends ng.IScope {
        descriptionTranslateKey: string;
        descriptionTranslateValues?: _.Dictionary<any>;
        filterList: IConfirmDialogTypeaheadAttributes<T>;
    }
    interface IConfirmDialogTypeaheadScope<T> extends ng.IScope {
        description: string;
        typeahead: IConfirmDialogTypeaheadAttributes<T>;
    }
    interface IConfirmChangeOwnerScope extends ng.IScope {
        ownerPicker: {
            prompt: string;
            ownerQuery: (query: string) => ISliceable<ServerApi.IUserName>;
            targetOwner: ServerApi.IUserName;
        };
    }
    interface IConfirmDialogTagsScope extends ng.IScope {
        description: string;
        tags: {
            model: ITagWithCount[];
        };
    }
    interface IDeleteAction {
        (set: Set<any>, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface IRenameAction {
        (namedItem: INamedItemInfo, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface IDownloadAction {
        (downloadItem: IDownloadItemInfo): any;
    }
    interface IPermissionsAction {
        (actionContext: IActionContext, template: string): any;
    }
    interface IChangeOwnerAction {
        (set: Set<INamedAndOwnedItemInfo>, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface IUpdateSiteAvailabilityAction {
        (set: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface IEditSiteAction {
        (site: ServerApi.ISiteSettingsForServerAdmin, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface IEditWorkbookAction {
        (item: IEditableItemInfo): any;
    }
    interface IChangeTagsAction {
        (set: Set<ITaggedItemInfo>, actionContext: IActionContext): ng.IPromise<any>;
    }
    interface ICreateExtractRefreshAction {
        (set: Set<IExtractItemInfo>, context: IActionContext): ng.IPromise<any>;
    }
    class ContentActions {
        private windowLocationService;
        private contentActionNotification;
        private ActionHelpers;
        private Projects;
        private Workbooks;
        private DataSources;
        private Views;
        private ChangeDatasourceOwnerAction;
        private ChangeProjectOwnerAction;
        private ChangeWorkbookOwnerAction;
        private MoveToProjectAction;
        private DeleteDatasourcesAction;
        private DeleteProjectsAction;
        private DeleteWorkbooksAction;
        private CreateProjectAction;
        private RenameProjectAction;
        private ChangeViewTagsAction;
        private ChangeWorkbooksTagsAction;
        private ChangeDatasourcesTagsAction;
        private SuspendSitesAction;
        private ActivateSitesAction;
        private DeleteSitesAction;
        private EditSiteAction;
        private CreateExtractTasksAction;
        private DownloadActions;
        static $inject: string[];
        constructor(windowLocationService: WindowLocationService, contentActionNotification: ContentActionNotification, ActionHelpers: ActionHelpers, Projects: Projects, Workbooks: Workbooks, DataSources: DataSources, Views: Views, ChangeDatasourceOwnerAction: ChangeDatasourceOwnerAction, ChangeProjectOwnerAction: ChangeProjectOwnerAction, ChangeWorkbookOwnerAction: ChangeWorkbookOwnerAction, MoveToProjectAction: MoveToProjectAction, DeleteDatasourcesAction: DeleteDatasourcesAction, DeleteProjectsAction: DeleteProjectsAction, DeleteWorkbooksAction: DeleteWorkbooksAction, CreateProjectAction: CreateProjectAction, RenameProjectAction: RenameProjectAction, ChangeViewTagsAction: ChangeViewTagsAction, ChangeWorkbooksTagsAction: ChangeWorkbooksTagsAction, ChangeDatasourcesTagsAction: ChangeDatasourcesTagsAction, SuspendSitesAction: SuspendSitesAction, ActivateSitesAction: ActivateSitesAction, DeleteSitesAction: DeleteSitesAction, EditSiteAction: EditSiteAction, CreateExtractTasksAction: CreateExtractTasksAction, DownloadActions: DownloadActions);
        deleteProject(projectDetail: IProjectDetailInfo, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        deleteProjects(projects: Set<IProjectInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        deleteWorkbook(workbookDetail: IWorkbookDetailInfo, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        deleteWorkbooks(workbooks: Set<IWorkbookInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        moveWorkbooksToProject(workbooks: Set<IWorkbookBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        moveDatasourcesToProject(datasources: Set<IDataSourceInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        createProject(actionContext: IActionContext): ng.IPromise<ServerApi.IProjectIdResult>;
        private singleton<T>(item);
        renameProjectPopup(project: IProjectDetailInfo, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        renameProject(project: IProjectDetailInfo, newName: string): ng.IPromise<ServerApi.IResult>;
        downloadWorkbook(workbook: IWorkbookBase): ng.IPromise<any>;
        downloadDatasource(datasource: IDataSourceInfo): ng.IPromise<any>;
        changeOwnerOnDatasources(datasources: Set<IDataSourceInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        changeOwnerOnProjects(projects: Set<IProjectBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        changeOwnerOnWorkbooks(workbooks: Set<IWorkbookBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        suspendSite(sites: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        activateSite(sites: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        editSite(site: ServerApi.ISiteSettingsForServerAdmin, actionContext: IActionContext): ng.IPromise<void>;
        deleteSites(sites: Set<ServerApi.ISiteSettingsForServerAdmin>, actionContext: IActionContext): ng.IPromise<any>;
        private authoring(authoringUrl);
        editWorkbook(workbook: IWorkbookDetailInfo): void;
        editView(view: IViewDetailInfo): void;
        newWorkbook(datasource: IDataSourceDetailInfo): void;
        private handleSingleItemResponse(item, translations);
        setTagsOnViews(views: Set<IViewBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        setTagsOnView(view: IViewBase, newTagsList: string[]): ng.IPromise<ServerApi.IResult>;
        setTagsOnWorkbook(workbook: IWorkbookBase, newTagsList: string[]): ng.IPromise<ServerApi.IResult>;
        setTagsOnWorkbooks(workbooks: Set<IWorkbookBase>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
        setTagsOnDatasource(datasource: IDataSourceDetailInfo, newTagsList: string[]): ng.IPromise<ServerApi.IResult>;
        setTagsOnDatasources(datasources: Set<IDataSourceInfo>, actionContext: IActionContext): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class ChangeDatasourceDescriptionAction {
        private $translate;
        private toaster;
        private DataSources;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, DataSources: DataSources);
        execute(datasource: IDataSourceInfo, newDescription: string): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error, datasource);
    }
}
declare module VizPortal {
    class ChangeProjectDescriptionAction {
        private $translate;
        private toaster;
        private Projects;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, Projects: Projects);
        execute(project: IProjectBase, newDescription: string): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error, project);
    }
}
declare module VizPortal {
    class ChangeWorkbookDescriptionAction {
        private $translate;
        private toaster;
        private Workbooks;
        private WorkbookErrors;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, Workbooks: Workbooks, WorkbookErrors: WorkbookErrors);
        execute(workbook: IWorkbookBase, newDescription: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class RevisionHistoryAction {
        private $translate;
        private $q;
        private $rootScope;
        private ConfirmActionDialog;
        private toaster;
        private Workbooks;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, $rootScope: ng.IRootScopeService, ConfirmActionDialog: ConfirmActionDialog, toaster: ToasterService, Workbooks: Workbooks);
        showRevisionHistory(workbook: IWorkbookBase): ng.IPromise<any>;
    }
    module RevisionHistoryAction {
        interface Scope extends ng.IScope {
            workbookId: string;
            selectedItems: Set<ServerApi.IWorkbookRevision>;
            prompt: string;
        }
    }
}
declare module VizPortal {
    interface IPlaceScope extends IMainScope, ISubplaceCountsScope {
        place: string;
        objectName: string;
        ownerId?: string;
    }
    interface ISitePlaceScope extends IPlaceScope, ISubplaceTabsScope {
    }
    class SitePlaceCtrl {
        static $inject: string[];
        constructor($location: ng.ILocationService, $scope: ISitePlaceScope, $state: ng.ui.IStateService, breadcrumbs: BreadcrumbsService, contentActions: ContentActions, place: IPlace, server: ServerService);
    }
    interface IAllowedActionScope {
        allowedAction(actionName: string): boolean;
    }
    interface IDeleteActionScope {
        del: ($event: BaseJQueryEventObject) => void;
    }
    interface IChangeDescriptionActionScope {
        changeDescription: (newDescription: string) => ng.IPromise<any>;
    }
    interface IChangeOwnerActionScope {
        changeOwner: ($event: BaseJQueryEventObject) => void;
    }
    interface IDownloadActionScope {
        download: ($event: BaseJQueryEventObject) => void;
    }
    interface IRenameActionScope {
        rename: ($event: BaseJQueryEventObject) => void;
    }
    interface IChangeTagsActionScope {
        changeTags: (newTagsList: string[]) => void;
    }
    interface IToggleFavoriteActionScope {
        addFavorite: () => ng.IPromise<ServerApi.IResult>;
        removeFavorite: () => ng.IPromise<ServerApi.IResult>;
    }
    interface IProjectPlaceScope extends IAllowedActionScope, IChangeDescriptionActionScope, IChangeOwnerActionScope, IDeleteActionScope, IPlaceScope, IRenameActionScope, ISubplaceTabsScope {
        contentBreadcrumbUrl: () => string;
        project: IProjectDetailInfo;
        projectSet: Set<IProjectDetailInfo>;
    }
    class ProjectPlaceCtrl {
        private $q;
        static $inject: string[];
        constructor($location: ng.ILocationService, $q: ng.IQService, $scope: IProjectPlaceScope, $state: ng.ui.IStateService, breadcrumbs: BreadcrumbsService, BrowserTitleService: BrowserTitleService, ContentActions: ContentActions, ChangeProjectDescriptionAction: ChangeProjectDescriptionAction, place: IPlace, project: IProjectDetailInfo, projectActions: ServerApi.IProjectActions);
    }
    interface IWorkbookPlaceScope extends IAllowedActionScope, IChangeDescriptionActionScope, IChangeOwnerActionScope, IChangeTagsActionScope, IDeleteActionScope, IDownloadActionScope, IPlaceScope, ISubplaceTabsScope, IToggleFavoriteActionScope {
        contentBreadcrumbUrl: () => string;
        editWorkbook($event: JQueryEventObject): void;
        moveToProject: ($event: JQueryEventObject) => void;
        refreshNow: ($event: JQueryEventObject) => void;
        projectBreadcrumbUrl: () => string;
        workbook: IWorkbookDetailInfo;
        workbookSet: Set<IWorkbookDetailInfo>;
        permissionsInfoMessage: string;
        showRevisionHistory: () => any;
        isWorkbookRevisionHistoryEnabled: boolean;
    }
    class WorkbookPlaceCtrl {
        private $q;
        static $inject: string[];
        constructor($location: ng.ILocationService, $q: ng.IQService, $scope: IWorkbookPlaceScope, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, breadcrumbs: BreadcrumbsService, ContentActions: ContentActions, ChangeWorkbookDescriptionAction: ChangeWorkbookDescriptionAction, SetDisplayTabsAction: SetDisplayTabsAction, DownloadActions: DownloadActions, CreateExtractTasksAction: CreateExtractTasksAction, Favorites: Favorites, place: IPlace, workbook: IWorkbookDetailInfo, workbookActions: ServerApi.IWorkbookActions, Workbooks: Workbooks, RevisionHistoryAction: RevisionHistoryAction);
    }
    interface IDataSourcePlaceScope extends IAllowedActionScope, IChangeDescriptionActionScope, IChangeOwnerActionScope, IChangeTagsActionScope, IDeleteActionScope, IDownloadActionScope, IPlaceScope, ISubplaceTabsScope {
        contentBreadcrumbUrl: () => string;
        datasource: IDataSourceDetailInfo;
        datasourceSet: Set<IDataSourceDetailInfo>;
        moveToProject: ($event: JQueryEventObject) => void;
        newWorkbook($event: JQueryEventObject): void;
        projectBreadcrumbUrl: () => string;
        refreshModeIsRemote: () => boolean;
        refreshModeIsServer: () => boolean;
    }
    class DatasourcePlaceCtrl {
        private $q;
        private server;
        private DeleteDatasourcesAction;
        private datasource;
        static $inject: string[];
        constructor($q: ng.IQService, $scope: IDataSourcePlaceScope, $state: ng.ui.IStateService, breadcrumbs: BreadcrumbsService, server: ServerService, ContentActions: ContentActions, ChangeDatasourceDescriptionAction: ChangeDatasourceDescriptionAction, DownloadActions: DownloadActions, DeleteDatasourcesAction: DeleteDatasourcesAction, datasource: IDataSourceDetailInfo, datasourceActions: ServerApi.IDatasourceActions, place: IPlace);
        private remoteRefreshesEnabled();
    }
}
declare module VizPortal {
    class ContentFilterService {
        static $inject: string[];
        private $location;
        constructor($location: ng.ILocationService);
        getFilter(explicitFilterKeys?: string[], implicitFilters?: IContentFilters<string>): ServerApi.ICompositeFilterClause;
        getFilterClauses(explicitFilterKeys?: string[], implicitFilters?: IContentFilters<string>): ServerApi.IFilterClause[];
    }
}
declare module VizPortal {
    module SiteRoleFilterHelper {
        var AnyRole: string;
        function siteRoleOptions(roles: string[], userCountsByRole?: _.Dictionary<number>): ISelectFilterDefinitionOption<string>[];
    }
}
declare module VizPortal {
    var FilterCategories: {
        general: string;
        datasource: string;
    };
    interface IFilterDefinition<TFilterValue> {
        name: string;
        type: string;
        category: string;
        valueToParams: (value: TFilterValue) => any;
        valueFromParams: (params: any) => ng.IPromise<TFilterValue>;
    }
    interface ITypeaheadFilterDefinition extends IFilterDefinition<ServerApi.IFieldValue> {
        field: string;
        matchPrefixesOnly: boolean;
    }
    interface ISelectFilterDefinitionOption<TFilterValue> {
        translate: string;
        value: TFilterValue;
        count?: number;
    }
    interface ISelectFilterDefinition<TFilterValue> extends IFilterDefinition<TFilterValue> {
        options: ISelectFilterDefinitionOption<TFilterValue>[];
    }
    enum PasswordStatus {
        Any = 0,
        Embedded = 1,
        NotEmbedded = 2,
    }
    enum DatasourceType {
        All = 1,
        Embedded = 2,
        Published = 3,
    }
    class FilterPanelService {
        static $inject: string[];
        private suggestions;
        private $q;
        private filterDefinitions;
        constructor(suggestions: SearchSuggestionsService, $q: ng.IQService);
        private createFilterDefinitions();
        private siteRoleFilterDefinition();
        private groupsMinimumSiteRoleDefinition();
        private maxSiteRoleDefinition();
        private siteRoleSelectFilterDefinition(name, roles);
        private selectFilterDefinition<TFilterValue>(name, paramToValueMap, options, category?);
        private booleanFilterDefinition(name, category?);
        private textFilterDefinition(name, category?);
        private textDropdownFilterDefinition(name, options, isValid, category?);
        private afterDateFilterDefinition(name, category?);
        private beforeDateFilterDefinition(name, category?);
        private dateFromISOString(paramValue);
        private fromSingleParam<TFilterValue>(paramName, valueFn);
        private toSingleParam<TFilterValue>(paramName, paramValueFn);
        getFilterDefinitions(filterNames: string[]): IFilterDefinition<any>[];
    }
}
declare module VizPortal {
    interface IFilterControl {
        definition: IFilterDefinition<any>;
        ready: boolean;
        value: any;
        clear?: () => void;
    }
    interface IFilterControls {
        clearAllFilters?: () => any;
    }
    interface IFilterPanelContainerScope extends ng.IScope {
        filterDefinitions?: IFilterDefinition<any>[];
        filterControls: IFilterControls;
    }
    interface IFilterPanelScope extends IFilterPanelContainerScope {
        searchText: string;
        filters: IFilterControl[];
        anyFiltersActive: boolean;
        submitSearch: (searchText: string, $event?: JQueryEventObject) => void;
        anyGeneralFilters: () => boolean;
        generalFilter: (filter: IFilterControl) => boolean;
        generalCheckbox: (filter: IFilterControl) => boolean;
        anyDatasourceFilters: () => boolean;
        datasourceFilter: (filter: IFilterControl) => boolean;
        datasourceCheckbox: (filter: IFilterControl) => boolean;
    }
    class FilterPanelCtrl {
        static $inject: string[];
        constructor($scope: IFilterPanelScope, $location: ng.ILocationService, BrowserSupportService: BrowserSupportService);
    }
}
declare module VizPortal {
    var SelectionEvent: {
        SelectionStarted: string;
        SelectionEnded: string;
    };
}
declare module VizPortal {
    interface IDropdownScope<TModel, TRow> extends ng.IScope {
        model: TModel;
        editMode: boolean;
        textValue: string;
        currentRow: {
            index: number;
            object: any;
        };
        select: (item: any) => void;
        cancel: () => void;
        clear: () => void;
        edit: () => void;
        handleKeyEvent: ($event: BaseJQueryEventObject) => void;
        mousedownOutside: ($event: BaseJQueryEventObject) => void;
        columnWidths?: IColumnWidths;
    }
    class DropdownHelper {
        static setupDropdownScope<TModel, TRow>(scope: IDropdownScope<TModel, TRow>, $timeout: ng.ITimeoutService, focusElement: JQuery, rowToModel: (TRow: any) => TModel): void;
    }
}
declare module VizPortal {
    interface ITypeaheadSource {
        (matchText: string): ISliceable<any>;
    }
}
declare module VizPortal {
    interface ISizeFilter {
        (sizeInBytes: number): string;
    }
    class ByteSizeConversionFactor {
        static ONE_KB: number;
        static ONE_MB: number;
        static ONE_GB: number;
    }
}
declare module VizPortal {
    interface ISize {
        height: number;
        width: number;
    }
}
declare module VizPortal {
    interface ILayoutMetrics {
        numberOfRows: number;
        numberOfCols: number;
        heightOfRowInPx: number;
    }
    interface ILayout {
        metrics: (dimensions: ISize) => ILayoutMetrics;
    }
}
declare module VizPortal {
    class ListLayout implements ILayout {
        static DefaultRowHeight: number;
        private rowHeight;
        constructor(rowHeight?: number);
        metrics(dimensions: ISize): ILayoutMetrics;
    }
}
declare module VizPortal.ServerApi {
    interface ICheckConnectionParams {
        id: string;
        server?: string;
        port?: string;
        username?: string;
        embedPassword?: boolean;
        encryptedPassword?: string;
        encryptedPasswordKeyId?: string;
    }
    interface ICheckConnectionResult extends IResult {
        succeeded: boolean;
        messages: string[];
    }
    class CheckConnectionRequest extends Request<ICheckConnectionParams, ICheckConnectionResult> {
        constructor(params: ICheckConnectionParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateConnectionsParams {
        ids: string[];
        server?: string;
        port?: string;
        username?: string;
        embedPassword?: boolean;
        encryptedPassword?: string;
        encryptedPasswordKeyId?: string;
    }
    class UpdateConnectionsRequest extends Request<IUpdateConnectionsParams, IActionResult> {
        constructor(params: IUpdateConnectionsParams);
    }
}
declare module VizPortal {
    interface IEditConnectionDialogScope extends ng.IScope {
        prompt: string;
        editModel: IDataConnectionEditModel;
        showTestConnection: boolean;
        testConnection: () => void;
        testConnectionResult: ITestConnectionResult;
        editConnectionForm: ng.IFormController;
    }
    interface IEditOAuthConnectionDialogScope extends ng.IScope {
        prompt?: string;
        withAuthenticationSubHeader?: boolean;
        promptEmbedCredential: string;
        promptNoCredential: string;
        describeEmbedCredential: string;
        describeNoCredential: string;
        connectionTypeDisplayName: string;
        credentials: ServerApi.IOAuthCredential[];
        addNewOAuthCredentialOptionValue?: string;
        oauthEditModel: IOAuthConnectionEditModel;
        allowOAuthWithPassword: boolean;
        showTestConnection: boolean;
        testConnectionDisabled: () => boolean;
        testConnection: () => void;
        testConnectionResult: ITestConnectionResult;
    }
    var PasswordUnchanged: string;
    interface IDataConnectionEditModel {
        serverName?: string;
        serverPort?: string;
        username?: string;
        password?: IEmbeddedPasswordUpdate;
    }
    interface IOAuthConnectionEditModel {
        credentialOption: string;
        credentialId?: string;
        credentialNoValueOptionText?: string;
        usernamePassword?: IDataConnectionEditModel;
    }
    interface ITestConnectionResult {
        isPending: boolean;
        succeeded?: boolean;
        messages?: string[];
    }
    class EditConnectionAction {
        private ConfirmActionDialog;
        private $translate;
        private ContentActionNotification;
        private ModalService;
        private DataConnections;
        private OAuthCredentials;
        private AddOAuthCredentialAction;
        static SalesforceConnectionType: string;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, ContentActionNotification: ContentActionNotification, ModalService: ModalService, DataConnections: DataConnections, OAuthCredentials: OAuthCredentials, AddOAuthCredentialAction: AddOAuthCredentialAction);
        confirmEditConnections(dataSources: Set<IDataSourceInfo>, context: IActionContext): ng.IPromise<any>;
        private haveSameConnectionType(datasources);
        private areEditable(datasources);
        private confirmEditDatabaseConnections(dataSources, context);
        private makePrompt(datasources);
        configureEditOAuthScope(scope: IEditOAuthConnectionDialogScope, dataSources: Set<IDataSourceInfo>): void;
        private confirmEditOAuthConnections(dataSources, context);
        createOAuthEditModel(datasources: Set<IDataSourceInfo>): IOAuthConnectionEditModel;
        updateOAuthConnections(dataSources: Set<IDataSourceInfo>, editModel: IOAuthConnectionEditModel): ng.IPromise<ServerApi.IActionResult>;
        private uniqueValueOrMixed<T>(items, iterator);
        private uniqueValueOrUndefined<T, TResult>(items, iterator);
        applyConnectionEdits(datasources: Set<IDataSourceInfo>, editModel: IDataConnectionEditModel): ng.IPromise<ServerApi.IResult>;
        private updateConnections(datasources, editModel);
        private editModelToConnectionUpdate(editModel);
        private notifyResult(result, datasources);
        private errorMessage(error);
        checkEditedConnection(datasourceId: string, editModel: IDataConnectionEditModel): ITestConnectionResult;
        checkExistingConnection(datasourceId: string): ITestConnectionResult;
        private updateTestConnectionResult(testConnectionResult, serverResponse);
        checkOAuthConnection(oauthCredentialId: string): ITestConnectionResult;
    }
}
declare module VizPortal {
    /**
     * The interface required by the data grid body
     */
    interface IColumnWidths {
        getActual(index: number): number;
        getMin?: (index: number) => number;
        resetActual?: () => void;
    }
    class ColumnWidths implements IColumnWidths {
        private static MaxStartWidth;
        resizer: ColumnWidthsResizer;
        private minWidths;
        private preferredWidths;
        private containerWidth;
        private actualWidths;
        private totalActualWidth;
        getTotal(): number;
        updateTotal(): void;
        getActual(index: number): number;
        setActual(index: number, width: number): void;
        resetActual(): void;
        getMin(index: number): number;
        setMinWidths(minWidths: number[]): void;
        hasMinWidths(): boolean;
        getPreferred(index: number): number;
        private getPreferredWithMax(index, max);
        setPreferredWidths(preferredWidths: number[], containerWidth?: number): void;
        hasPreferredWidths(): boolean;
        setContainerWidth(containerWidth: number): void;
        hasContainerWidth(): boolean;
        private maybeExpand();
        private expandToFill(availableWidth);
    }
    class ColumnWidthsResizer {
        private widths;
        private index;
        private startX;
        private startWidth;
        private minWidth;
        constructor(widths: ColumnWidths);
        startResize(index: number, x: number): void;
        continueResize(x: number): void;
    }
}
declare module VizPortalReact {
    module CommonStyles {
        module Colors {
            var White: string;
            var Black: string;
            var Grey40: string;
            var Grey68: string;
            var Grey89: string;
            var Grey102: string;
            var Grey136: string;
            var Grey153: string;
            var Grey178: string;
            var Grey218: string;
            var Grey224: string;
            var Grey230: string;
            var Grey245: string;
            var Grey250: string;
            var BlueHighlight: string;
            var BorderColor: string;
            var GreyTextColor: string;
            var NormalTextColor: string;
            var DisabledTextColor: string;
            var ActionOrange: string;
            var ActionOrangeDark: string;
        }
        module Sizes {
            var MinSupportedAppWidth: number;
            var TextBoxPadding: number;
            var TextBoxBorderSize: number;
            var LineWidth: number;
            var SmallSpace: number;
            var DefaultSpace: number;
            var LineHeight: number;
            var LargeSpace: number;
            var RowHeight: number;
            var XLargeSpace: number;
            var SmallFontSize: number;
            var NormalFontSize: number;
            var HeaderFontSize: number;
            var SmallIconSize: number;
            var NormalIconSize: number;
            var DataGridHeaderHeight: number;
            var DropdownOffset: number;
        }
        module Fonts {
            var BodyFont: string;
            var HeaderFont: string;
        }
        module IconUrls {
            var Workbook: string;
            var View: string;
        }
        module Helpers {
            function Edges(distanceToEdge: number): any;
        }
    }
}
declare module VizPortal {
    interface PermissionsPanelColumnWidths extends ColumnWidths {
        /**
         * Returns the width, in pixels, that the permissions dialog should be for the given content type
         */
        getPermissionsDialogWidth: (viewportWidth: number) => number;
    }
    function getPermissionsPanelColumnWidths(contentType: string): PermissionsPanelColumnWidths;
    class PermissionsPanelColumnWidthsImpl extends ColumnWidths implements PermissionsPanelColumnWidths {
        private contentType;
        private MinColumnWidthsByField;
        private DefaultColumnWidthsByField;
        private ColumnIndicesByContentType;
        private CapabilityColumnWidth;
        private MinDialogWidth;
        constructor(contentType: string, MinColumnWidthsByField: _.Dictionary<number>, DefaultColumnWidthsByField: _.Dictionary<number>, ColumnIndicesByContentType: IContentTypes<_.Dictionary<number[]>>, CapabilityColumnWidth: number, MinDialogWidth: number);
        private orderedWidthsFromFieldNames(widthsByField);
        /**
         * Sets the preferred widths for each field type to the maximum of the measured widths for that
         * field and its default width (overrides superclass method)
         */
        setPreferredWidths(measuredWidths: number[], containerWidth?: number): void;
        private getPreferredColumnWidths(measuredWidths);
        getPermissionsDialogWidth(viewportWidth: number): number;
        private calculatePermissionsDialogWidths();
    }
}
declare module VizPortal {
    module DateHelpers {
        function fromISOString(dateString: string): Date;
        function toISOString(date: Date): string;
        function midnight(date: Date): Date;
        function endOfDay(date: Date): Date;
    }
}
declare module VizPortal {
    module MapperHelper {
        function toNumber(value: any): number;
        function toDate(value: string): Date;
        function arrayToMap(values: string[]): _.Dictionary<string>;
        function sortTags(tags: string[]): string[];
    }
}
declare module VizPortal {
    interface IExtractTaskInfo extends INamedItemInfo {
        priority: number;
        type: string;
        lastRunAt?: Date;
        runNextAt?: Date;
        schedule: INamedItemInfo;
        site: ServerApi.ISiteNameWithId;
        workbook?: INamedItemInfo;
        datasource?: INamedItemInfo;
    }
}
declare module VizPortal {
    module AlertListMapper {
        function map(total: number, alerts: ServerApi.IAlert[], workbooks: _.Dictionary<INamedItemInfo>, datasources: _.Dictionary<INamedItemInfo>): IAlertListInfo;
    }
}
declare module VizPortal {
    interface ICommentInfo extends IUpdatedItemInfo, ICreatedItemInfo, IOwnedItemInfo {
        id: string;
        text: string;
    }
}
declare module VizPortal.ServerApi {
    interface IComment extends IUpdatedItem, ICreatedItem, IOwnedItem {
        id: string;
        text: string;
    }
}
declare module VizPortal {
    module CommentMapper {
        function map(comments: ServerApi.IComment[], users: _.Dictionary<IUserInfo>): ICommentInfo[];
    }
}
declare module VizPortal {
    module DatasourceMapper {
        function map(serverApiDatasources: ServerApi.IDataSource[], users: _.Dictionary<IUserInfo>, projects?: _.Dictionary<INamedItemInfo>, workbooks?: _.Dictionary<IWorkbookInfo>, favoriteDatasources?: _.Dictionary<any>): IDataSourceInfo[];
        function mapDetail(ds: ServerApi.IDataSourceDetail): IDataSourceDetailInfo;
    }
}
declare module VizPortal {
    module ExtractTaskMapper {
        function map(dcs: ServerApi.IExtractTask[], schedule: _.Dictionary<INamedItemInfo>, site: _.Dictionary<ServerApi.ISiteNameWithId>, workbooks: _.Dictionary<INamedItemInfo>, datasources: _.Dictionary<INamedItemInfo>): IExtractTaskInfo[];
    }
}
declare module VizPortal {
    module ProjectMapper {
        function map(serverApiProjects: ServerApi.IProject[], users: _.Dictionary<IUserInfo>): IProjectInfo[];
        function mapOne(p: ServerApi.IProject, owner?: IUserInfo): IProjectInfo;
        function mapDetail(p: ServerApi.IProjectDetail): IProjectDetailInfo;
        function mapName(p: ServerApi.INamedItem): INamedItemInfo;
        function mapNames(serverApiProjects: ServerApi.INamedItem[]): INamedItemInfo[];
    }
}
declare module VizPortal {
    module RemoteRefreshAgentMapper {
        function mapToResource(agents: ServerApi.IRemoteRefreshAgent[]): IRemoteRefreshAgentInfo[];
    }
}
declare module VizPortal {
    interface IRemoteRefreshScheduleInfo {
        definition: string;
        refreshType: string;
        runNextAt?: string;
        lastRunAt?: string;
    }
}
declare module VizPortal {
    module RemoteRefreshScheduleMapper {
        function mapToResource(schedules: ServerApi.IRemoteRefreshSchedule[]): IRemoteRefreshScheduleInfo[];
        function mapToApi(schedules: IRemoteRefreshScheduleInfo[]): ServerApi.IRemoteRefreshSchedule[];
        function mapSingleToApi(schedule: IRemoteRefreshScheduleInfo): ServerApi.IRemoteRefreshSchedule;
    }
}
declare module VizPortal {
    var SubscriptionTargetTypes: {
        view: string;
        workbook: string;
    };
    interface ISubscriptionInfo extends IIdItemInfo, IScheduledItemInfo, ISiteItemInfo {
        subject: string;
        user: IUserInfo;
        lastSentAt?: Date;
        runNextAt?: Date;
        targetId: string;
        targetName: string;
        targetType: string;
        targetPath: string;
    }
}
declare module VizPortal {
    module SubscriptionMapper {
        function map(subscriptions: ServerApi.ISubscription[], schedules: _.Dictionary<ServerApi.INamedItem>, sites: _.Dictionary<ServerApi.ISiteNameWithId>, users: _.Dictionary<ServerApi.IUser>): ISubscriptionInfo[];
    }
}
declare module VizPortal {
    module UserMapper {
        function map(serverApiUsers: ServerApi.IUser[]): IUserInfo[];
        function mapOne(u: ServerApi.IUser): IUserInfo;
    }
}
declare module VizPortal {
    module ViewMapper {
        function map(serverApiViews: ServerApi.IView[], workbooks: _.Dictionary<IWorkbookParentInfo>, favoriteViews?: _.Dictionary<any>): IViewInfo[];
        function mapDetail(v: ServerApi.IViewDetail): IViewDetailInfo;
    }
}
declare module VizPortal {
    module WorkbookMapper {
        function map(serverApiWorkbooks: ServerApi.IWorkbook[], users: _.Dictionary<IUserInfo>, projects: _.Dictionary<INamedItemInfo>, workbooksStatisticsMax?: ServerApi.IItemStatisticsFields, favoriteWorkbooks?: _.Dictionary<any>): IWorkbookInfo[];
        function mapOne(w: ServerApi.IWorkbook, owner: IUserInfo, project: INamedItemInfo, workbooksStatisticsMax?: ServerApi.IItemStatisticsFields, favorite?: boolean): IWorkbookInfo;
        function mapDetail(w: ServerApi.IWorkbookDetail): IWorkbookDetailInfo;
        function mapParents(serverApiWorkbooks: ServerApi.IWorkbookParent[], users: _.Dictionary<IUserInfo>, projects?: _.Dictionary<INamedItemInfo>, favoriteWorkbooks?: _.Dictionary<any>): IWorkbookParentInfo[];
        function mapParent(w: ServerApi.IWorkbookParent, owner: IUserInfo, project: INamedItemInfo, favorite?: boolean): IWorkbookParentInfo;
    }
}
declare module VizPortal {
    interface IAlertInfo {
        id: string;
        statusCode: number;
        taskId: string;
        mostRecentFailureAt: Date;
        lastSuccessAt: Date;
        workbooks: INamedItemInfo[];
        alertType: string;
        datasource?: INamedItemInfo;
        suspended: boolean;
        consecutiveFailureCount: number;
    }
    interface IAlertListInfo {
        total: number;
        alerts: IAlertInfo[];
    }
}
declare module VizPortal {
    interface IRemoteRefreshPropertiesInfo {
        refreshMode: string;
        remoteAgentName: string;
        remoteRunNextAt: string;
    }
}
declare module VizPortal {
    interface IDataSourceInfo extends IUpdatedItemInfo, INamedItemInfo, IOwnedItemInfo, IProjectItemInfo, IFavoriteItem, IDownloadItemInfo, ITaggedItemInfo, IExtractItemInfo, IRemoteRefreshPropertiesInfo {
        connectionType: string;
        connectionTypeDisplayName: string;
        connectionDetails: any;
        connectionTypeEditable: boolean;
        connectionOAuth: boolean;
        workbook?: IWorkbookInfo;
    }
    interface IDataSourceDetailInfo extends IDataSourceInfo, ICreatedItemInfo, IDescriptionItemInfo {
        newWorkbookUrl: string;
    }
}
declare module VizPortal {
    interface IRemoteRefreshAgentInfo extends INamedItemInfo, IOwnedItemInfo {
        content: Set<INamedItemInfo>;
    }
}
declare module VizPortal {
    interface IUserInfo extends INamedItemInfo {
        authId: string;
        displayName: string;
        username: string;
        domainName?: string;
        readOnly?: boolean;
    }
}
declare module VizPortal {
    interface IViewBase extends IUpdatedItemInfo, INamedItemInfo, ITaggedItemInfo, IThumbnailItemInfo, IFavoriteItem {
        path: string;
        index: number;
        workbook: IWorkbookParentInfo;
    }
    interface IViewInfo extends IViewBase {
    }
    interface IViewDetailInfo extends IViewBase, ICreatedItemInfo, IEditableItemInfo {
    }
}
declare module VizPortal.ServerApi {
    interface IGetCommentsParams extends IGetItemsParams {
        viewId: string;
    }
    interface IGetCommentsResult extends IGetItemsResult {
        comments: IComment[];
        users: IUser[];
    }
    class GetCommentsRequest extends Request<IGetCommentsParams, IGetCommentsResult> {
        constructor(params: IGetCommentsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDataConnectionType {
        connectionTypeDisplayName: string;
        connectionType: string;
    }
    var DataConnectionTypeKeys: {
        connectionTypeDisplayName: string;
        connectionType: string;
    };
}
declare module VizPortal.ServerApi {
    var ConnectionDetailType: {
        Database: string;
        TableauServer: string;
        File: string;
    };
    interface IDataSourceProperties extends INamedItem, IUpdatedItem, IDataConnectionType, IDownloadItem, ITaggedItem, IExtractItem, IRemoteRefreshProperties {
        connectionDetails: any;
        connectionTypeEditable: boolean;
        connectionOAuth: boolean;
    }
    interface IConnectionDetail {
        type: string;
    }
    interface IDatabaseConnectionDetails extends IConnectionDetail {
        serverName: string;
        serverPort?: string;
        databaseUsername?: string;
        hasEmbeddedPassword?: boolean;
    }
    interface ITableauServerConnectionDetail extends INamedItem, IConnectionDetail {
        hasEmbeddedPassword?: boolean;
    }
    interface IFileConnectionDetail extends IConnectionDetail {
        fileName: string;
        hasEmbeddedPassword?: boolean;
    }
    interface IDataSource extends IDataSourceProperties, IOwnedItem, IProjectItem {
        workbookId?: string;
    }
    interface IDataSourceDetail extends IDataSourceProperties, IFavoriteDetailItem, IDescriptionItem, ICreatedItem, IOwnedDetailItem, IProjectDetailItem {
        workbook?: IWorkbook;
        newWorkbookUrl: string;
    }
}
declare module VizPortal.ServerApi {
    interface IProjectName extends INamedItem {
    }
    interface IProject extends ICreatedItem, IDescriptionItem, IProjectName, IOwnedItem {
        workbookCount: number;
        datasourceCount: number;
        viewCount: number;
        controlledPermissionsEnabled: boolean;
    }
    interface IProjectDetail extends ICreatedItem, IDescriptionItem, IProjectName, IOwnedDetailItem, IUpdatedItem {
        controlledPermissionsEnabled: boolean;
    }
    var ProjectKeys: {
        id: string;
        name: string;
    };
}
declare module VizPortal.ServerApi {
    interface IGetDatasourcesParams extends IGetItemsParams {
    }
    interface IGetDatasourcesResult extends IGetItemsResult {
        datasources?: IDataSource[];
        projects?: INamedItem[];
        users?: IUser[];
        favorites?: string[];
        workbooks?: IWorkbook[];
    }
    class GetDatasourcesRequest extends Request<IGetDatasourcesParams, IGetDatasourcesResult> {
        constructor(params: IGetDatasourcesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetProjectsParams extends IGetItemsParams {
    }
    interface IGetProjectsResult extends IGetItemsResult {
        projects?: IProject[];
        users?: IUser[];
    }
    class GetProjectsRequest extends Request<IGetProjectsParams, IGetProjectsResult> {
        constructor(params: IGetProjectsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetUsersParams extends IGetItemsParams {
    }
    interface IGetUsersResult extends IGetItemsResult {
        users: IUser[];
    }
    class GetUsersRequest extends Request<IGetUsersParams, IGetUsersResult> {
        constructor(params: IGetUsersParams);
    }
}
declare module VizPortal.ServerApi {
    interface IViewProperties extends IUpdatedItem, INamedItem, ITaggedItem, IThumbnailItem {
        path: string;
        index: number;
    }
    interface IView extends IViewProperties, IItemStatisticsFields {
        workbookId: string;
    }
    interface IViewDetail extends IViewProperties, ICreatedItem, IFavoriteDetailItem, IOwnedDetailItem, IProjectDetailItem, IEditableItem, IResult {
        workbook: IWorkbookParent;
    }
}
declare module VizPortal.ServerApi {
    interface IWorkbookProperties extends INamedItem, ITaggedItem, IThumbnailItem, IUpdatedItem, IDownloadItem, IExtractItem {
        displayTabs: boolean;
        size: number;
    }
    interface IWorkbook extends IWorkbookProperties, IOwnedItem, IProjectItem, IItemStatisticsFields {
        sheetCount: number;
        defaultViewId: string;
        repositoryUrl: string;
    }
    interface IWorkbookDetail extends IWorkbookProperties, IDescriptionItem, IFavoriteDetailItem, IOwnedDetailItem, IProjectDetailItem, ICreatedItem, IEditableItem, IStatsTimeSeries {
    }
    interface IWorkbookParent extends INamedItem, IProjectItem, IOwnedItem {
        sheetCount: number;
        displayTabs: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IGetViewsParams extends IGetItemsParams {
    }
    interface IGetViewsResult extends IGetItemsResult {
        views?: IView[];
        workbooks?: IWorkbookParent[];
        projects?: INamedItem[];
        users?: IUser[];
        favorites?: string[];
    }
    class GetViewsRequest extends Request<IGetViewsParams, IGetViewsResult> {
        constructor(params: IGetViewsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetWorkbooksParams extends IGetItemsParams {
    }
    interface IGetWorkbooksResult extends IGetItemsResult {
        workbooks?: IWorkbook[];
        projects?: INamedItem[];
        users?: IUser[];
        stats?: ServerApi.IItemStatisticsFields;
        favorites?: string[];
    }
    class GetWorkbooksRequest extends Request<IGetWorkbooksParams, IGetWorkbooksResult> {
        constructor(params: IGetWorkbooksParams);
    }
}
declare module VizPortal.ServerApi {
    var RefreshModeTypes: {
        Server: string;
        Remote: string;
    };
    interface IRemoteRefreshProperties {
        refreshMode: string;
        remoteAgentName: string;
        remoteRunNextAt: string;
    }
}
declare module VizPortal {
    module ServerApiMapper {
        function projects(projectResult: ServerApi.IGetProjectsResult): IProjectInfo[];
        function dataSources(dataSourcesResult: ServerApi.IGetDatasourcesResult): IDataSourceInfo[];
        function workbooks(workbooksResult: ServerApi.IGetWorkbooksResult): IWorkbookInfo[];
        function views(viewResult: ServerApi.IGetViewsResult): IViewInfo[];
        function alertList(alertList: ServerApi.IAlertList): IAlertListInfo;
        function comments(commentResult: ServerApi.IGetCommentsResult): ICommentInfo[];
        function extractTasks(extractTaskResult: ServerApi.IGetExtractTasksResult): IExtractTaskInfo[];
        function remoteRefreshSchedules(remoteRefreshSchedulesResult: ServerApi.IRemoteRefreshSchedulesResult): IRemoteRefreshScheduleInfo[];
        function remoteRefreshAgents(remoteRefreshAgentsResult: ServerApi.IGetRemoteRefreshAgentsResult): IRemoteRefreshAgentInfo[];
        function subscriptions(subscriptionResult: ServerApi.IGetSubscriptionsResult): ISubscriptionInfo[];
        function fieldValues(fieldValueResult: ServerApi.IGetFieldValuesResult): ServerApi.IFieldValue[];
    }
}
declare module VizPortal.ServerApi {
    class AddTagsToWorkbooksRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal.ServerApi {
    var ExtractTaskTargetType: {
        Workbook: string;
        Datasource: string;
    };
    var ExtractTaskType: {
        RefreshExtract: string;
        IncrementExtract: string;
    };
    interface IExtractTask extends IIdItem, IScheduledItem, ISiteItem {
        priority: number;
        type: string;
        lastRunAt?: string;
        runNextAt?: string;
        targetType: string;
        targetId: string;
    }
}
declare module VizPortal.ServerApi {
    interface ICreateExtractTasksParams {
        targetType: string;
        targetIds: string[];
        scheduleId: string;
        type: string;
    }
    class CreateExtractTasksRequest extends Request<ICreateExtractTasksParams, IResult> {
        constructor(params: ICreateExtractTasksParams);
    }
}
declare module VizPortal.ServerApi {
    class DeleteWorkbooksRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteAction {
        del: boolean;
    }
    interface IDownloadAction {
        download: boolean;
    }
    interface ILaunchWebAuthoringAction {
        launchWebAuthoring: boolean;
    }
    interface IRefreshExtractAction {
        refreshExtract: boolean;
    }
    interface ISetDescriptionAction {
        setDescription: boolean;
    }
    interface ISetNameAction {
        setName: boolean;
    }
    interface ISetOwnerAction {
        setOwner: boolean;
    }
    interface ISetPermissionsAction {
        setPermissions: boolean;
    }
    interface ISetProjectAction {
        setProject: boolean;
    }
    interface ISetTagsAction {
        setTags: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IWorkbookActions extends IDeleteAction, IDownloadAction, ILaunchWebAuthoringAction, IRefreshExtractAction, ISetDescriptionAction, ISetOwnerAction, ISetPermissionsAction, ISetProjectAction, ISetTagsAction, _.Dictionary<boolean> {
        setDisplayTabs: boolean;
    }
}
declare module VizPortal.ServerApi {
    class GetWorkbookActionsRequest extends Request<ISingleIdParams, IWorkbookActions> {
        constructor(id: string);
    }
}
declare module VizPortal.ServerApi {
    var RecentlyViewedObjectType: {
        View: string;
        Workbook: string;
    };
    class MarkRecentlyViewedRequest extends Request<IFavoriteParams, IResult> {
        constructor(params: IFavoriteParams);
    }
}
declare module VizPortal.ServerApi {
    interface IMoveToProjectParams {
        ids: string[];
        projectId: string;
    }
}
declare module VizPortal.ServerApi {
    class MoveWorkbooksToProjectRequest extends Request<IMoveToProjectParams, IResult> {
        constructor(params: IMoveToProjectParams);
    }
}
declare module VizPortal.ServerApi {
    class RemoveTagsFromWorkbooksRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IRevertWorkbookParams {
        id: string;
        version: number;
    }
    interface IRevertWorkbookResult extends IResult {
    }
    class RevertWorkbookRequest extends Request<IRevertWorkbookParams, IRevertWorkbookResult> {
        constructor(params: IRevertWorkbookParams);
    }
}
declare module VizPortal.ServerApi {
    interface IRunExtractRefreshesOnWorkbooksParams extends IMultipleIdsParams {
        type: string;
    }
    class RunExtractRefreshesOnWorkbooksRequest extends Request<IRunExtractRefreshesOnWorkbooksParams, IResult> {
        constructor(ids: string[], type: string);
    }
}
declare module VizPortal.ServerApi {
    interface ISetDisplayTabsParams {
        ids: string[];
        displayTabs: boolean;
    }
    interface ISetDisplayTabsResult extends IResult {
    }
    class SetDisplayTabsRequest extends Request<ISetDisplayTabsParams, ISetDisplayTabsResult> {
        constructor(params: ISetDisplayTabsParams);
    }
}
declare module VizPortal.ServerApi {
    class SetWorkbookDescriptionRequest extends Request<ISetDescriptionParams, IEmptyResult> {
        constructor(id: string, description: string);
    }
}
declare module VizPortal.ServerApi {
    class SetWorkbooksOwnerRequest extends Request<ISetOwnerParams, IResult> {
        constructor(ids: string[], ownerId: string);
    }
}
declare module VizPortal {
    class Workbooks implements IListResource<IWorkbookInfo>, IFieldValuesResource, IDetailResource<IWorkbookDetailInfo>, IActionResource<ServerApi.IWorkbookActions> {
        private $q;
        private ErrorNotifyingServer;
        static $inject: string[];
        private server;
        private listFetcher;
        private allQuery;
        private detailFetcher;
        private fieldValuesFetcher;
        constructor($q: ng.IQService, ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        all(): ResourceQuery<IWorkbookInfo>;
        getById(id: string): ng.IPromise<IWorkbookDetailInfo>;
        valuesForField(field: string): FieldValuesQuery;
        actions(id: string): ng.IPromise<ServerApi.IWorkbookActions>;
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        setDescription(id: string, description: string): ng.IPromise<ServerApi.IResult>;
        setOwner(ids: string[], ownerId: string): ng.IPromise<ServerApi.IResult>;
        moveToProject(targetProjectId: string, workbookIds: string[]): ng.IPromise<ServerApi.IResult>;
        setDisplayTabs(ids: string[], displayTabs: boolean): ng.IPromise<ServerApi.IResult>;
        addTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        removeTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        revertWorkbook(workbookId: string, versionNum: number): ng.IPromise<ServerApi.IResult>;
        changeTags(ids: string[], tagsToAdd: string[], tagsToRemove: string[]): ng.IPromise<ServerApi.IResult>;
        createExtractTask(ids: string[], scheduleId: string, extractType: string): ng.IPromise<ServerApi.IResult>;
        refreshExtracts(ids: string[], extractType: string): ng.IPromise<ServerApi.IResult>;
        markRecentlyViewed(id: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface IPermissionsDialogScope extends IContentSubplaceScope {
        authorizables: Set<any>;
        authorizableType: string;
        permissionsContainerWidth: number;
        permissionsPanelHeight: number;
        permissionsTitle: string;
        editPermissionsDescription: string;
        readOnly: boolean;
        actionableItems: Set<ServerApi.INamedItem>;
        permissionsInfoMessage: string;
        templateType: string;
    }
    class EditPermissionsAction {
        private modalService;
        private $q;
        private $window;
        private $translate;
        private getActionableObjectsForAction;
        static $inject: string[];
        private static descriptionStringIdMap;
        private static cannotViewAllSelectedMessageIdMap;
        constructor(modalService: ModalService, $q: ng.IQService, $window: ng.IWindowService, $translate: ng.translate.ITranslateService, getActionableObjectsForAction: GetActionableObjectsForAction);
        showEditPermissionsDialog(actionContext: IActionContext): ng.IPromise<any>;
        private determineInfoMessageFromAuthorizables(scope);
        private openPermissionsDialog(scope);
        private alertCantShowPermissions(message);
        /**
        * Calculates the width required by the header
        * TODO: remove this when the projectControlledPermissionsEnabled feature flag dies.
        * Equivalent functionality exists in PermissionsPanelColumnWidths.ts
        */
        private headerWidth(authorizableType, readOnly);
        /**
        * Calculates a height to make the permissions panel fit in smaller screen sizes.
        * TODO: refactor the layout of the permissions panel so this isn't needed.
        */
        private calculatePermissionsPanelHeightWithoutPCP(hasInfoMessage);
        /**
         * Calculates a height to make the permissions panel fit in smaller screen sizes.
         * TODO: refactor the layout of the permissions panel so this isn't needed.
         */
        private calculatePermissionsPanelHeight();
        private setupDescriptionOnScope(scope, readOnly);
        /**
        * If any of the workbooks have tabs disabled, puts a translated message on the scope explaining that view permissions
        * are set on the individual views.
        */
        private setupPermissionsInfoMessageForWorkbooksOnScope(scope, workbooks);
        /**
        * Puts a translated message on the scope explaining that tabbed view permissions are controlled by the parent workbook
        */
        private setupPermissionsInfoMessageForTabbedViewsOnScope(scope, views);
        private getCannotViewAllSelectedMessage(authorizableType, unactionableItems);
        private areAnyEmbeddedDatasourcesSelected(datasources);
    }
}
declare module VizPortal {
    class HideViewsAction {
        private ViewErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Views;
        static $inject: string[];
        constructor(ViewErrors: ViewErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Views: Views);
        confirmDeleteViews(views: Set<IViewInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private workbooksWithNoViews(views);
        private notifyResult(views, result);
    }
}
declare module VizPortal {
    interface IDetailActionButton<TSummary, TDetail> {
        name: string;
        translate?: string;
        isAvailable(items: Set<TSummary>, detailedItem?: TDetail, allowedActions?: any): boolean;
        isDisabled?(items: Set<TSummary>, detailedItem?: TDetail, allowedActions?: any): boolean;
        execute(items: Set<TSummary>, context: IActionContext, detailedItem?: TDetail): void;
    }
    interface IActionButton<TItem> extends IDetailActionButton<TItem, TItem> {
    }
    interface IListActionButton {
        name: string;
        translate?: string;
        isAvailable(): boolean;
        execute($event: JQueryEventObject): void;
    }
    class ActionPanelService {
        private $state;
        private ServerService;
        private contentActions;
        private EditConnectionAction;
        private EditPermissionsAction;
        private HideViewsAction;
        private SetDisplayTabsAction;
        private CreateExtractTasksAction;
        private DeleteDatasourcesAction;
        private RevisionHistoryAction;
        private contentActionDefinitions;
        static $inject: string[];
        private bind<T>(fn);
        constructor($state: ng.ui.IStateService, ServerService: ServerService, contentActions: ContentActions, EditConnectionAction: EditConnectionAction, EditPermissionsAction: EditPermissionsAction, HideViewsAction: HideViewsAction, SetDisplayTabsAction: SetDisplayTabsAction, CreateExtractTasksAction: CreateExtractTasksAction, DeleteDatasourcesAction: DeleteDatasourcesAction, RevisionHistoryAction: RevisionHistoryAction);
        static anySelected<T>(items: Set<T>): boolean;
        private static oneSelected<T>(items);
        private static oneSelectedEmbeddedDatasource(items);
        private oneSelectedUnrefreshableItem(items);
        private oneSelectedUnrefreshableDatasource(datasources);
        private isAdminOrOwner(ownerId);
        private getUpdateSiteAvailabilityDisabledFn(toAvailabilityStateName);
        private moveDatasourcesToProjectAction();
        private moveWorkbooksToProjectAction();
        private deleteProjectsAction();
        private deleteDatasourcesAction();
        private deleteWorkbooksAction();
        private deleteViewsAction();
        private viewWorkbookRevisionHistoryAction();
        private renameAction(renameAction);
        private downloadDatasourceAction();
        private downloadWorkbookAction();
        private permissionsAction();
        private datasourcePermissionsAction();
        private changeOwnerAction(changeOwnerAction, notFoundCode);
        private changeOwnerOnDatasourcesAction();
        private suspendSiteAction(suspendSiteAction);
        private activateSiteAction(activateSiteAction);
        private editSiteSettingsAction(editSiteAction);
        private deleteSitesAction(deleteSitesAction);
        private editAction(editAction, translate);
        private newWorkbookAction();
        private changeTags(changeTags, notFoundCode);
        private setTagsOnDatasourcesAction();
        private createExtractRefreshForDatasourcesAction();
        private createExtractRefreshForWorkbooksAction();
        private editConnectionAction();
        private setDisplayTabsAction();
        private isConnectionEditable(datasource);
        getContentActionButtons(contentType: string, place: string): IActionButton<any>[];
    }
}
declare module VizPortal {
    interface IActionButtonsScope extends ng.IScope {
        availableAction: (action: IActionButton<any>) => boolean;
        menuActions: IActionButton<any>[];
        showActionMenu: () => boolean;
        actionButtonContext: ($event: JQueryEventObject) => IActionContext;
        actionMenuContext: (menuButton: JQuery) => IActionContext;
    }
    module ActionButtonsHelper {
        function setupActionButtons(scope: IActionButtonsScope, actionButtons: IActionButton<any>[]): void;
    }
}
declare module VizPortal {
    class SubplaceEvents {
        static Refresh: string;
        static RefreshCounts: string;
    }
    interface ISubplaceTabsScope extends ng.IScope {
        subplaceTabClicked: (name: string) => void;
    }
    module SubplaceTabsHelper {
        function refreshWhenCurrentTabClicked($scope: ISubplaceTabsScope, $state: ng.ui.IStateService): void;
    }
    interface ISubplaceCountsScope extends ng.IScope {
        subplaceCounts: _.Dictionary<number>;
    }
    module SubplaceCountsHelper {
        function updateCountsFromSubplace($scope: ISubplaceCountsScope, subplace: ISubplace<any>, count: number): void;
        function keepSubplaceCountsUpdated($scope: ISubplaceCountsScope, place: IPlace): void;
    }
}
declare module VizPortal {
    class FlowLayout implements ILayout {
        private itemWidth;
        private itemHeight;
        constructor(itemWidth: number, itemHeight: number);
        metrics(dimensions: ISize): ILayoutMetrics;
    }
}
declare module VizPortal {
    interface ITemplate {
        attrs: _.Dictionary<any>;
        linkFn: ng.ITranscludeFunction;
    }
}
declare module VizPortal {
    class HelpService {
        private $window;
        private server;
        private static ONLINE_TOKEN_OFFLINE_PAGE_DICT;
        private static tableauUrl;
        static $inject: string[];
        constructor($window: ng.IWindowService, server: ServerService);
        search(searchText: string): void;
        getServerHelpUrlByCategory(category?: string): string;
        getGeneralSupportUrl(): string;
        getDatasourceHelpUrl(): string;
        getHelpLinkLocKey(): string;
        private supportUrlPrefix();
        private offlineHelpRoute(page?);
        private externalVersion();
        private helpUrlLanguage();
    }
}
declare module VizPortalReact {
    module Dispatcher {
        interface Payload {
            actionType: string;
        }
        var instance: Flux.Dispatcher<Payload>;
    }
}
declare module VizPortalReact {
    function SetOrderAction(order: VizPortal.ServerApi.IOrderClause[]): void;
    module SetOrderAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            order: VizPortal.ServerApi.IOrderClause[];
        }
    }
}
declare module VizPortalReact {
    /**
    * TODO: use Event Emitter?
    */
    class Store<T extends Function> {
        constructor();
        protected changeListeners: T[];
        addChangeListener(cb: T): void;
        removeChangeListener(cb: T): void;
        protected broadcast(...args: any[]): void;
    }
    module Store {
        interface ChangeListener {
            (changeEvent: string): any;
        }
    }
}
declare module VizPortalReact {
    class OrderStore extends Store<Store.ChangeListener> {
        private order;
        constructor(order: VizPortal.ServerApi.IOrderClause[]);
        getOrderClauses(): VizPortal.ServerApi.IOrderClause[];
    }
}
declare module VizPortal {
    class SorterFactory {
        private $location;
        static $inject: string[];
        constructor($location: ng.ILocationService);
        create(defaultOrder: ServerApi.IOrderClause[]): Sorter;
    }
    class Sorter {
        private $location;
        private defaultOrder;
        private orderStore;
        constructor($location: ng.ILocationService, defaultOrder: ServerApi.IOrderClause[]);
        setPrimary(field: string, direction: string): void;
        removeFieldFromOrder(field: string): void;
        setOrder(order: ServerApi.IOrderClause[]): void;
        getOrderClauses(): ServerApi.IOrderClause[];
        isSortAscending(): boolean;
        selectedColumnKey(): string;
        isSortAscendingBy(key: string): boolean;
        isSortDescendingBy(key: string): boolean;
        /**
         * Returns the order store so that react components can be notified when the order changes.
         * TODO: Refactor this so that the OrderStore is a dependency that is injected to the Sorter's constructor.
         *       Then this method can be removed.
         */
        getOrderStore(): VizPortalReact.OrderStore;
        private updateOrder();
    }
}
declare module VizPortalReact {
    class SiteUrls {
        private prefix;
        private queryString;
        constructor(config: {
            siteUrlName: string;
            queryString: string;
        });
        forSiteUrlName(siteUrlName: string): SiteUrls;
        home(): string;
        projectUrl(projectId: string): string;
        projectViewsUrl(projectId: string): string;
        projectsUrl(): string;
        workbookUrl(workbookId: string): string;
        workbookViewsUrl(workbookId: string): string;
        workbookDatasourcesUrl(workbookId: string): string;
        favoriteWorkbook(workbookId: string): string;
        viewUrl(viewPath: string): string;
        favoriteView(viewId: string): string;
        usersUrl(): string;
        userContentUrl(user: VizPortal.IUserInfo): string;
        userSettingsUrl(user: VizPortal.IUserInfo): string;
        datasourceUrl(datasourceId: string): string;
        datasourceDetailsUrl(datasourceId: string): string;
        datasourceDataConnectionUrl(datasourceId: string): string;
        groupsUrl(): string;
        group(groupId: string): string;
        schedule(scheduleId: string, scheduledAction: string): string;
        schedulesUrl(): string;
        settingsUrl(): string;
        statusUrl(): string;
        tasksUrl(): string;
    }
}
declare module VizPortal {
    interface IListScope<T> extends ng.IScope {
        refreshItems: () => void;
        selectedItems: Set<T>;
    }
}
declare module VizPortal {
    /**
    * This class is used as a facade for react components to communicate back with the angular world.
    * TODO: rename this file to AngularContextFactory
    */
    class AngularContext {
        private $scope;
        private $injector;
        private $compile;
        constructor($scope: ng.IScope, $injector: ng.auto.IInjectorService, $compile: ng.ICompileService);
        compileElement(element: JQuery, setupScope?: ($scope: ng.IScope) => ng.IScope): JQuery;
        getService(name: string): any;
        enqueueDigest(): void;
        evalAsync(fn: () => any): void;
    }
    interface AngularContextFactory {
        create($scope: ng.IScope): AngularContext;
    }
}
declare module VizPortalReact {
    class DataGridFavoriteToggle extends React.Component<DataGridFavoriteToggle.Props, any> {
        static displayName: string;
        static element: React.Factory<DataGridFavoriteToggle.Props>;
        shouldComponentUpdate(nextProps: DataGridFavoriteToggle.Props, nextState: any): boolean;
        render(): React.DOMElement<React.HTMLAttributes>;
        private handleClick(event);
    }
    module DataGridFavoriteToggle {
        interface Props {
            isFavorite: boolean;
            onSetFavorite?: (isFavorite: boolean) => void;
            testId?: string;
        }
    }
}
declare module VizPortalReact {
    module DataGridCells {
        interface ICheckboxCellOptions {
            onCheckboxClicked: (row: DataGrid.Row) => void;
            checkboxCellTestId?: string;
        }
        function CheckboxCell(options: ICheckboxCellOptions): React.ClassicFactory<DataGrid.BodyCell.Props>;
        interface IFavoriteCellOptions {
            onAddFavorite: (row: DataGrid.Row) => void;
            onRemoveFavorite: (row: DataGrid.Row) => void;
            favoriteCellTestId?: string;
        }
        function FavoriteCell(options: IFavoriteCellOptions): React.ClassicFactory<DataGrid.BodyCell.Props>;
        interface ISelectedItemsScope extends ng.IScope {
            selectedItems: VizPortal.Set<any>;
        }
        interface ActionsCellOptions {
            actions: VizPortal.IActionButton<any>[];
            translate: IReactTranslateService;
            getActionTarget: () => IActionTarget;
            testId?: string;
            menuDisabled?: (row: DataGrid.Row) => boolean;
        }
        function ActionsCell(contentFormatter: React.ClassicFactory<DataGrid.BodyCell.Props>, options: ActionsCellOptions): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function SiteRoleCell(propertyName: string, $translate: ng.translate.ITranslateService, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function UserDisplayNameCell(testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        interface ILink {
            text: string;
            url: string;
            iconClassName?: string;
            iconTitle?: string;
            testId?: string;
            style?: any;
        }
        function Link(linkFn: (row: DataGrid.Row) => ILink): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function FixedValue(value: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function PlainTextCell(propertyName: string, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function PlainTextCellWithTransform(propertyName: string, transform: (value: any) => string, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function DateTimeCell(propertyName: string, nullDateTimeLabel?: string, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function SizeCell(propertyName: string, sizeFilter: VizPortal.ISizeFilter, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function Checkmark(propertyName: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function AngularActionsCell(angularContext: VizPortal.AngularContext): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function LocalizedCount(propertyName: string, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function LocalizedCountWithBar(dataKey: string, maxStatsObject: (data: any) => any, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function AlertCell(type: string, translate: IReactTranslateService, angularContext: VizPortal.AngularContext, testId?: string): React.ClassicFactory<DataGrid.BodyCell.Props>;
        function ScheduleDescriptionCell(scheduleUrlFn: (row: DataGrid.Row) => string, scheduleFrequencyDescriptionFilter: VizPortal.IScheduleFrequencyDescriptionFilter): React.ClassicFactory<DataGrid.BodyCell.Props>;
    }
}
declare module VizPortalReact {
    module CommonDataGridColumns {
        function withActions(originalColumn: VizPortalReact.DataGrid.Column, actionOptions: DataGridCells.ActionsCellOptions): any;
        interface ISelectColumnScope extends ng.IScope {
            selectedItems: VizPortal.Set<any>;
        }
        function selected($scope: ISelectColumnScope): {
            name: string;
            dataKey: string;
            text: string;
            cellFormatter: React.ClassicFactory<DataGrid.BodyCell.Props>;
            resizable: boolean;
            sortable: boolean;
            cellStyle: {
                padding: number;
            };
        };
        interface IFavoriteColumnScope extends ng.IScope {
            addFavorite(item: VizPortal.IFavoriteItem): ng.IPromise<VizPortal.ServerApi.IResult>;
            removeFavorite(item: VizPortal.IFavoriteItem): ng.IPromise<VizPortal.ServerApi.IResult>;
            dataGridProps: DataGrid.Props;
        }
        function favorite($scope: IFavoriteColumnScope): {
            name: string;
            dataKey: string;
            text: string;
            cellFormatter: React.ClassicFactory<DataGrid.BodyCell.Props>;
            resizable: boolean;
            sortable: boolean;
            cellStyle: {
                padding: number;
            };
        };
        function owner(translate: IReactTranslateService, siteUrls: SiteUrls, getOwnerFn?: (row: DataGrid.Row) => VizPortal.IUserInfo): {
            name: string;
            dataKey: string;
            text: string;
            direction: string;
            cellFormatter: React.ClassicFactory<DataGrid.BodyCell.Props>;
        };
        function alert(type: string, translate: IReactTranslateService, angularContext: VizPortal.AngularContext): DataGrid.Column;
    }
}
declare module VizPortalReact {
    class DataGrid extends React.Component<DataGrid.Props, DataGrid.State> {
        static displayName: string;
        static element: React.Factory<DataGrid.Props>;
        private static MaxInitialColumnWidth;
        private static ScrollbarWidth;
        static MinimumColumnWidth: number;
        state: DataGrid.State;
        private gridWidth;
        componentDidMount(): void;
        componentWillReceiveProps(nextProps: DataGrid.Props): void;
        private fetchInitialData(props);
        private fetch(start, end);
        private fetchUsingProps(props, start, end);
        private onColumnResize(column, width);
        private handleClick(row, col);
        private handleMeasureHeaderWidths(widths);
        private handleMeasureColumnWidths(widths);
        private maybeUpdateColumnWidths();
        render(): React.DOMElement<React.HTMLAttributes>;
        private getProvisionalColumnWidths();
        private bodyScrollLeft(scrollLeft);
    }
    module DataGrid {
        interface Props extends React.Props<any> {
            cols: Column[];
            rowStore?: RowStore;
            update: number;
            sortKey?: string;
            sortAscending?: boolean;
            onHeaderClicked?: (columnKey: string, direction: string) => void;
            onCellClick?: (item: any, columnKey: string) => void;
            selectedKeys?: _.Dictionary<any>;
            emptyChild?: React.ReactChild;
            updated?: (rows: DataGrid.Row[]) => void;
        }
        interface State {
            rows?: Row[];
            measuredHeaderWidths?: _.Dictionary<number>;
            measuredColumnWidths?: _.Dictionary<number>;
            colWidths?: ColumnWidths;
            scrollLeft?: number;
            isShowingLoadingIndicator?: boolean;
        }
        interface Column {
            name: string;
            dataKey: string;
            text: string;
            tooltip?: string;
            direction?: string;
            headerFormatter?: React.ClassicFactory<HeaderColumn.HeaderFormatterProps>;
            cellFormatter?: React.ClassicFactory<BodyCell.Props>;
            resizable?: boolean;
            sortable?: boolean;
            headerStyle?: any;
            cellStyle?: any;
            growToFit?: boolean;
            preferredWidth?: number;
        }
        interface ColumnWidths {
            [key: string]: number;
        }
        interface Row {
            key: string;
            data: any;
            rowStyle?: any;
        }
        interface RowStore {
            getItems(start: number, end: number): Q.Promise<Row[]>;
        }
        interface ReportWidthFn {
            (columnKey: string, width: number): void;
        }
        interface ScrollLeftFn {
            (scrollLeft: number): any;
        }
        module BodyCell {
            interface Props extends React.Props<any> {
                width?: number;
                col: Column;
                row: Row;
                value: any;
                isSelected: boolean;
                reportWidthFn: ReportWidthFn;
                onClick: (row: Row, col: Column) => void;
            }
        }
        class BodyRow extends React.Component<BodyRow.Props, any> {
            static displayName: string;
            static element: React.Factory<BodyRow.Props>;
            static InnerHeight: number;
            static OuterHeight: number;
            private static SelectedColor;
            private static HoverColor;
            shouldComponentUpdate(nextProps: BodyRow.Props, nextState: any): boolean;
            render(): React.DOMElement<React.HTMLAttributes>;
        }
        module BodyRow {
            interface Props extends React.Props<any> {
                row: Row;
                cols: Column[];
                colWidths: ColumnWidths;
                isSelected: boolean;
                isHovered: boolean;
                onClick: (row: Row, col: Column) => void;
                handleReportCellWidth: (columnKey: string, width: number) => void;
                handleMouseEnter: (row: Row) => void;
                handleMouseLeave: () => void;
            }
        }
        class Body extends React.Component<Body.Props, Body.State> {
            static displayName: string;
            static element: React.Factory<Body.Props>;
            static SectionRows: number;
            static SectionHeight: number;
            state: Body.State;
            render(): React.DOMElement<React.HTMLAttributes>;
            private renderSections();
            componentDidMount(): void;
            componentWillUnmount(): void;
            private onScroll();
            private updateSections();
            private fetch();
        }
        module Body {
            interface Props extends React.Props<any> {
                cols: Column[];
                colWidths: ColumnWidths;
                measureColumnWidths: (colWidths: _.Dictionary<number>) => any;
                reportScrollLeftFn: ScrollLeftFn;
                rows: Row[];
                selectedKeys?: _.Dictionary<any>;
                onClick: (row: Row, col: Column) => void;
                fetch: (start: number, end: number) => void;
            }
            interface State {
                indexOfFirstVisibleSection?: number;
                indexOfLastVisibleSection?: number;
                sections?: Section[];
            }
        }
        interface Section {
            index: number;
            rows: Row[];
        }
        module HeaderColumn {
            interface Props extends React.Props<any> {
                col: Column;
                sorted: boolean;
                sortAscending: boolean;
                reportWidthFn: ReportWidthFn;
                width: number;
                onHeaderClicked: (columnKey: string, direction: string) => void;
                onColumnResize: (column: Column, width: number) => any;
            }
            interface State {
                hovered: boolean;
            }
            interface HeaderFormatterProps extends Props, State {
            }
        }
        class HeaderRow extends React.Component<HeaderRow.Props, any> {
            static displayName: string;
            static element: React.Factory<HeaderRow.Props>;
            private measuredWidths;
            componentWillMount(): void;
            componentDidMount(): void;
            handleReportHeaderWidth(columnKey: string, width: number): void;
            shouldComponentUpdate(nextProps: HeaderRow.Props, nextState: any): boolean;
            render(): React.DOMElement<React.HTMLAttributes>;
        }
        module HeaderRow {
            interface Props extends React.Props<any> {
                cols: Column[];
                colWidths: ColumnWidths;
                measureColumnWidths: (colWidths: _.Dictionary<number>) => any;
                sortKey?: string;
                sortAscending: boolean;
                onHeaderClicked: (columnKey: string, direction: string) => void;
                onColumnResize: (column: Column, width: number) => any;
                scrollLeft: number;
            }
        }
        class EmptyBody extends React.Component<EmptyBody.Props, any> {
            static displayName: string;
            static element: React.Factory<EmptyBody.Props>;
            shouldComponentUpdate(nextProps: EmptyBody.Props, nextState: any): boolean;
            render(): React.DOMElement<React.HTMLAttributes>;
        }
        module EmptyBody {
            interface Props {
                emptyChild: React.ReactChild;
            }
        }
    }
}
declare module VizPortalReact {
    module DatasourceGrid {
        function columns(translate: IReactTranslateService, scope: CommonDataGridColumns.ISelectColumnScope, siteUrls: SiteUrls, actions: VizPortal.IActionButton<any>[], getActionTarget: () => IActionTarget, anyActionsAllowed: boolean, inProjectPlace: boolean, inWorkbookPlace: boolean, angularContext: VizPortal.AngularContext): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    module ProjectGrid {
        function columns(translate: IReactTranslateService, siteUrls: SiteUrls, actions: VizPortal.IActionButton<any>[], getActionTarget: () => IActionTarget, scope: VizPortal.IContentSubplaceScope, anyActionsAllowed: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    module SiteGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, sizeFilter: VizPortal.ISizeFilter, actions: VizPortal.IActionButton<any>[], getActionTarget: () => IActionTarget, siteUrls: SiteUrls, showLiveDatabaseConnectionsColumn: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    module ViewGrid {
        function columns(translate: IReactTranslateService, scope: VizPortal.IContentSubplaceScope, siteUrls: SiteUrls, actions: VizPortal.IActionButton<any>[], getActionTarget: () => IActionTarget, anyActionsAllowed: boolean, inProjectPlace: boolean, inWorkbookPlace: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    interface SorterActions {
        setPrimaryOrder(columnKey: string, direction: string): any;
        removeFieldFromOrder(field: string): any;
    }
}
declare module VizPortalReact {
    function SelectableSortKeyDataGridColumn(columnSpec: DataGrid.Column, keyToTextMap: _.Dictionary<string>, orderStore: OrderStore, sorterActions: SorterActions, cellFormatterForKey?: _.Dictionary<React.ClassicFactory<any>>): DataGrid.Column;
}
declare module VizPortalReact {
    module WorkbookGrid {
        function columns(translate: IReactTranslateService, sizeFilter: VizPortal.ISizeFilter, scope: VizPortal.IContentSubplaceScope, angularContext: VizPortal.AngularContext, siteUrls: SiteUrls, actions: VizPortal.IActionButton<any>[], getActionTarget: () => IActionTarget, anyActionsAllowed: boolean, showProjectColumn: boolean, orderStore: VizPortalReact.OrderStore, sorterActions: VizPortalReact.SorterActions): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortal {
    interface IContentSubplaceResolve {
        subplace: any;
        resource: any;
        detailsUrl: any;
        projectUrl: any;
        workbookUrl: any;
        defaultOrder: any;
        shouldFetchDetails: any;
    }
    interface IContentSubplaceScope extends IPlaceScope, IActionButtonsScope {
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
        detailsUrl(item: INamedItemInfo, subplaceName?: string): string;
        projectUrl(item: INamedItemInfo, subplaceName?: string): string;
        workbookUrl(item: INamedItemInfo, subplaceName?: string): string;
        refreshContent: () => void;
        sliceChanged: (newSlice: ListResult<any>) => any;
        filterDefinitions: IFilterDefinition<any>[];
        filterFieldValues: (filterField: string) => ITypeaheadSource;
        getFieldValueQuery: (filterField: string) => FieldValuesQuery;
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        gridLayout: (width: number, height: number) => VizPortal.FlowLayout;
        getItemDetails: (item: INamedItemInfo) => ng.IPromise<any>;
        shouldShowReadMore: ($event: JQueryEventObject) => boolean;
        selectedItems: Set<ServerApi.INamedItem>;
        sliceable: ISliceable<INamedItemInfo>;
        contentType: string;
        showModeSwitcher(): boolean;
        addFavorite(item: IFavoriteItem): ng.IPromise<ServerApi.IResult>;
        removeFavorite(item: IFavoriteItem): ng.IPromise<ServerApi.IResult>;
        anyActionsAllowed(): boolean;
        sorter: Sorter;
        detailedItem: any;
        allowedActions: any;
        isEmpty: boolean;
        isTouch: boolean;
        isLiveDBAvailable: boolean;
        filterControls: IFilterControls;
        emptyTemplateModel: IEmptyTemplateModel;
        busy: boolean;
    }
    class ContentSubplaceCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private sizeFilter;
        private actionPanelService;
        private ServerService;
        private HelpService;
        private AngularContextFactory;
        private subplace;
        private projectUrl;
        static $inject: string[];
        private query;
        constructor($scope: IContentSubplaceScope, $translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, sizeFilter: ISizeFilter, BrowserTitleService: BrowserTitleService, ContentActions: ContentActions, CreateSiteAction: CreateSiteAction, queryService: QueryService, filterPanelService: FilterPanelService, actionPanelService: ActionPanelService, ServerService: ServerService, SorterFactory: SorterFactory, Favorites: Favorites, BrowserSupportService: BrowserSupportService, HelpService: HelpService, AngularContextFactory: AngularContextFactory, subplace: ISubplace<any>, resource: IListResource<INamedItemInfo>, detailsUrl: (item: INamedItemInfo, subplaceName?: string) => string, projectUrl: (item: INamedItemInfo, subplaceName?: string) => string, workbookUrl: (item: INamedItemInfo, subplaceName?: string) => string, defaultOrder: ServerApi.IOrderClause[], shouldFetchDetails: (item: INamedItemInfo) => boolean);
        private isReactDataGridEnabled(contentType);
        private configureForReactDataGrid(contentType, place, sorter);
        private reactDataGridColumnsFor(contentType, place, orderStore, sorterActions);
        private anyActionsAllowed(contentType, place, ownerId);
        private refresh();
        private createEmptyTemplateModel(contentType, place);
    }
}
declare module VizPortal {
    interface IErrorStateParams {
        detailsLocKey?: string;
        redirectState?: string;
        redirectLocKey?: string;
        redirectSiteUrlName?: string;
        errorCode?: any;
    }
    interface IErrorScope extends ng.IScope {
        detailsLocKey: string;
        redirectUrl: string;
        redirectLocKey: string;
    }
    class ErrorCtrl {
        static StateParamKeys: {
            DetailsLocKey: string;
            RedirectState: string;
            RedirectLocKey: string;
            RedirectSiteUrlName: string;
        };
        static $inject: string[];
        constructor($scope: IErrorScope, $state: ng.ui.IStateService, $stateParams: IErrorStateParams, server: ServerService);
    }
}
declare module VizPortalReact {
    module ExtractTasksGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, anyActionsAllowed: boolean, actions: VizPortal.IActionButton<any>[], isServerPage: boolean, serverUrls: ServerUrls, siteUrls: SiteUrls, scheduleFrequencyDescriptionFilter: VizPortal.IScheduleFrequencyDescriptionFilter, showWorkbookOrDatasourceColumn: boolean, showScheduleColumn: boolean, showSiteColumn: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    module RemoteRefreshScheduleGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, anyActionsAllowed: boolean, actions: VizPortal.IActionButton<any>[], remoteRefreshScheduleTypeNameFilter: VizPortal.IRemoteRefreshScheduleTypeNameFilter, cronExpressionFilter: VizPortal.IStringStringFilter): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortalReact {
    interface IDataGridPropsScope extends ng.IScope {
        dataGridProps: DataGrid.Props;
        selectedItems: VizPortal.Set<any>;
        sorter: VizPortal.Sorter;
    }
    class AngularToReactDataGridBridge {
        private $translate;
        private locLinkifier;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, locLinkifier: VizPortal.ILocLinkifierFilter);
        attachReactDataGridToScope($scope: IDataGridPropsScope, columns: DataGrid.Column[], emptyTemplateModel: VizPortal.IEmptyTemplateModel): void;
        private emptyTemplateElementFor(emptyTemplateModel);
        updateReactDataGridRowStore<T>(config: {
            scope: {
                dataGridProps: DataGrid.Props;
            };
            sliceable: VizPortal.ISliceable<any>;
            getRowStyle?: (item: T) => any;
            keyForItem?: (item: T) => string;
        }): void;
    }
}
declare module VizPortal {
    class LocalSorter<T> {
        private comparableValueTransforms;
        constructor();
        addTransformForValueComparison(fieldName: string, transformFunc: Function): void;
        sortByClauses<T>(unsortedItems: T[], clauses: ServerApi.IOrderClause[]): T[];
        private compareByClauses<T>(a, b, clauses, clauseIndex);
    }
}
declare module VizPortal {
    module RefreshPropertyHelper {
        function getAvailableRefreshTypes(item: IExtractItemInfo): string[];
        function canBeRefreshedRemotely(datasource: IDataSourceInfo): boolean;
        function getCurrentRefreshLocation($translate: ng.translate.ITranslateService, refreshed: IRemoteRefreshPropertiesInfo): string;
        function redirectByDatasourceRefreshMode($state: ng.ui.IStateService, refreshMode: string): void;
    }
}
declare module VizPortal {
    interface IEmptyTemplateParagraphs {
        statements: ILocLinkifierModel[];
    }
    interface IEmptyTemplateModel {
        title?: string;
        body?: IEmptyTemplateParagraphs[];
        help?: ILocLinkifierModel;
        action?: () => any;
    }
}
declare module VizPortal {
    interface IRemoteRefreshPropertiesEditModel {
        refreshMode: string;
        remoteAgentName: string;
    }
    interface IRemoteRefreshAgentOption {
        display: string;
        name: string;
    }
    interface IChangeDatasourceRemoteRefreshPropertiesScope extends ng.IScope {
        prompt: string;
        remoteRefreshModeOptions: string[];
        remoteAgentOptions: IRemoteRefreshAgentOption[];
        remoteAgentOptionsEnabled: () => boolean;
        remoteRefreshDescription: () => ILocLinkifierModel;
        existingRefreshSchedules: () => number;
        warnRefreshesToBeDeleted: () => boolean;
        warnEmbeddedPassword: () => boolean;
        remoteAgentSelectClicked: () => void;
        editModel: IRemoteRefreshPropertiesEditModel;
    }
    class ChangeDatasourceRemoteRefreshPropertiesAction {
        private $q;
        private $translate;
        private $window;
        private $state;
        private ConfirmActionDialog;
        private ToasterService;
        private HelpService;
        private ServerService;
        private RemoteRefreshAgents;
        private ChangeDatasourceRefreshModeAction;
        private ChangeDatasourceRemoteAgentAction;
        private CreateExtractTasksAction;
        private CreateRemoteRefreshScheduleAction;
        static $inject: string[];
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, $window: ng.IWindowService, $state: ng.ui.IStateService, ConfirmActionDialog: ConfirmActionDialog, ToasterService: ToasterService, HelpService: HelpService, ServerService: ServerService, RemoteRefreshAgents: RemoteRefreshAgents, ChangeDatasourceRefreshModeAction: ChangeDatasourceRefreshModeAction, ChangeDatasourceRemoteAgentAction: ChangeDatasourceRemoteAgentAction, CreateExtractTasksAction: CreateExtractTasksAction, CreateRemoteRefreshScheduleAction: CreateRemoteRefreshScheduleAction);
        private AddNewAgentOption;
        execute($event: JQueryEventObject, datasource: IDataSourceInfo, openCreateRefreshScheduleOnSave: boolean, existingRefreshSchedulesCount: number): ng.IPromise<any>;
        private refreshAvailableRemoteAgents(datasource, scope);
    }
}
declare module VizPortal {
    interface ICronExpressionFields<T> {
        seconds: T;
        minutes: T;
        hours: T;
        dayOfMonth: T;
        month: T;
        dayOfWeek: T;
        year?: T;
    }
    interface ICronExpressionFieldTimeSubsetParts {
        specific?: number;
        increment?: number;
        from?: number;
        to?: number;
    }
    class CronExpressionDefaultValues {
        static seconds: string;
        static minutes: string;
        static hours: string;
        static dayOfMonth: string;
        static month: string;
        static dayOfWeek: string;
        static year: string;
        static expression: string;
    }
    class CronExpressionFieldValues implements ICronExpressionFields<string> {
        seconds: string;
        minutes: string;
        hours: string;
        dayOfMonth: string;
        month: string;
        dayOfWeek: string;
        year: string;
        constructor(seconds?: string, minutes?: string, hours?: string, dayOfMonth?: string, month?: string, dayOfWeek?: string, year?: string);
    }
    class CronExpressionFieldSubsetTypes {
        static All: string;
        static Any: string;
        static Specific: string;
        static SpecificIncrement: string;
        static Range: string;
        static RangeIncrement: string;
        static Invalid: string;
    }
    interface IDayOfWeekViewModel {
        sunday: boolean;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
    }
    interface IHoursOfDayViewModel {
        specific: number;
        increment: number;
        from: number;
        to: number;
    }
    class RemoteRefreshScheduleEditorViewModel {
        static minuteIncrementOptions: number[];
        private static defaultHoursOfDay;
        private static defaultDayOfWeek;
        private static emptyDayOfWeek;
        private static defaultEditorModeIsDaily;
        hoursOfDay: IHoursOfDayViewModel;
        dayOfWeek: IDayOfWeekViewModel;
        editorModeIsDaily: boolean;
        constructor();
        getCronExpression(): string;
        setFromCronExpression(expression: string): void;
        isValid(): boolean;
        static isEqual(objThis: RemoteRefreshScheduleEditorViewModel, objThat: RemoteRefreshScheduleEditorViewModel): boolean;
        isEqual(that: RemoteRefreshScheduleEditorViewModel): boolean;
        static clone(objThis: RemoteRefreshScheduleEditorViewModel, objThat: RemoteRefreshScheduleEditorViewModel): RemoteRefreshScheduleEditorViewModel;
        clone(that: RemoteRefreshScheduleEditorViewModel): RemoteRefreshScheduleEditorViewModel;
        private intervalIsValid();
        private dayOfWeekNotEmpty();
        private buildMinutesExpression();
        private buildHoursExpression();
        private buildDayOfWeekExpression();
    }
    module CronExpressionHelper {
        function buildFromFields(fields: ICronExpressionFields<string>): string;
        function buildFromExpression(expression: string): ICronExpressionFields<string>;
        function getTypeFromFieldSubset(field: string): CronExpressionFieldSubsetTypes;
        function getSpecificPartFromSubset(subset: string): number;
        function getFromPartFromSubset(subset: string): number;
        function getToPartFromSubset(subset: string): number;
        function getIncrementPartFromSubset(subset: string): number;
        function getTimeFieldSubsetParts(subset: string): ICronExpressionFieldTimeSubsetParts;
        function getSecondsField(expression: string): string;
        function getMinutesField(expression: string): string;
        function getHoursField(expression: string): string;
        function getDayOfMonthField(expression: string): string;
        function getMonthField(expression: string): string;
        function getDayOfWeekField(expression: string): string;
        function getYearField(expression: string): string;
        function setSecondsField(expression: string, val: string): string;
        function setMinutesField(expression: string, val: string): string;
        function setHoursField(expression: string, val: string): string;
        function setDayOfMonthField(expression: string, val: string): string;
        function setMonthField(expression: string, val: string): string;
        function setDayOfWeekField(expression: string, val: string): string;
        function setYearField(expression: string, val: string): string;
    }
}
declare module VizPortal {
    class ServerResourceFetcher<TResource, TRequestResult extends ServerApi.IGetItemsResult> implements IListFetcher<TResource> {
        private server;
        private requestType;
        private resultMapper;
        constructor(server: ServerService, requestType: new (params: ServerApi.IPagedItemsParams) => ServerApi.IRequest<ServerApi.IPagedItemsParams, TRequestResult>, resultMapper: (result: TRequestResult) => TResource[]);
        fetchList(params: ServerApi.IPagedItemsParams): ng.IPromise<ListResult<TResource>>;
    }
}
declare module VizPortal.ServerApi {
    interface ICreateRemoteRefreshScheduleParams {
        targetId: string;
        definition: string;
        refreshType: string;
    }
    class CreateRemoteRefreshScheduleRequest extends Request<ICreateRemoteRefreshScheduleParams, IResult> {
        constructor(params: ICreateRemoteRefreshScheduleParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteRemoteRefreshSchedulesParams {
        targetId: string;
        schedules: IRemoteRefreshSchedule[];
    }
    class DeleteRemoteRefreshSchedulesRequest extends Request<IDeleteRemoteRefreshSchedulesParams, IResult> {
        constructor(params: IDeleteRemoteRefreshSchedulesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IRemoteRefreshSchedule {
        definition: string;
        refreshType: string;
        runNextAt?: string;
        lastRunAt?: string;
    }
}
declare module VizPortal.ServerApi {
    var RemoteRefreshTypes: {
        Full: string;
        Incremental: string;
    };
    interface IRemoteRefreshSchedulesResult extends IGetItemsResult {
        schedules: IRemoteRefreshSchedule[];
    }
    class GetRemoteRefreshSchedulesRequest extends Request<IGetItemsParams, IRemoteRefreshSchedulesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateRemoteRefreshScheduleParams {
        targetId: string;
        initial: IRemoteRefreshSchedule;
        final: IRemoteRefreshSchedule;
    }
    class UpdateRemoteRefreshScheduleRequest extends Request<IUpdateRemoteRefreshScheduleParams, IResult> {
        constructor(params: IUpdateRemoteRefreshScheduleParams);
    }
}
declare module VizPortal {
    class ErrorNotifyingServer implements ServerApi.IServer {
        private ServerService;
        private toaster;
        private $translate;
        private $timeout;
        static ResponseDelay: number;
        static $inject: string[];
        constructor(ServerService: ServerService, toaster: ToasterService, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService);
        notifyOnFail<TResult>(result: ng.IPromise<TResult>): ng.IPromise<TResult>;
        addDelay<T>(result: ng.IPromise<T>): ng.IPromise<T>;
        sendRequest<TParams, TResult extends ServerApi.IResult>(request: ServerApi.IRequest<TParams, TResult>): ng.IPromise<TResult>;
        sendRequestAndDelay<TParams, TResult extends ServerApi.IResult>(request: ServerApi.IRequest<TParams, TResult>): ng.IPromise<TResult>;
        sendRequests<TItem, TParams, TResult>(requests: ServerApi.IRequest<TParams, TResult>[], combineResults: (results: TResult[]) => TResult): ng.IPromise<TResult>;
        sendRequestsAndDelay<TItem, TParams, TResult>(requests: ServerApi.IRequest<TParams, TResult>[], combineResults: (results: TResult[]) => TResult): ng.IPromise<TResult>;
        getServerService(): ServerService;
    }
}
declare module VizPortal {
    class RemoteRefreshSchedules extends Resource<IRemoteRefreshScheduleInfo> {
        private ErrorNotifyingServer;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        create(targetId: string, item: IRemoteRefreshScheduleInfo): ng.IPromise<ServerApi.IResult>;
        update(targetId: string, initialSchedule: IRemoteRefreshScheduleInfo, finalSchedule: IRemoteRefreshScheduleInfo): ng.IPromise<ServerApi.IResult>;
        del(targetId: string, items: Set<IRemoteRefreshScheduleInfo>): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface ICreateRemoteRefreshScheduleScope extends ng.IScope {
        availableTypeOptions: string[];
        prompt: string;
        scheduleInfo: IRemoteRefreshScheduleInfo;
        startOnMonday: boolean;
        editorViewModel: RemoteRefreshScheduleEditorViewModel;
        minuteIncrementOptions: number[];
    }
    class CreateRemoteRefreshScheduleAction {
        private $translate;
        private $filter;
        private ConfirmActionDialog;
        private ContentActionNotification;
        private RemoteRefreshSchedules;
        private scope;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $filter: ng.IFilterService, ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, RemoteRefreshSchedules: RemoteRefreshSchedules);
        execute($event: JQueryEventObject, item: INamedItemInfo, availableTypes: string[]): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error);
    }
}
declare module VizPortal {
    class DeleteRemoteRefreshSchedulesAction {
        private $translate;
        private ConfirmActionDialog;
        private ContentActionNotification;
        private RemoteRefreshSchedules;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, RemoteRefreshSchedules: RemoteRefreshSchedules);
        execute(context: IActionContext, item: IIdItemInfo, selected: Set<IRemoteRefreshScheduleInfo>): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error);
    }
}
declare module VizPortal {
    class EditRemoteRefreshScheduleAction {
        private $translate;
        private $filter;
        private ConfirmActionDialog;
        private ContentActionNotification;
        private RemoteRefreshSchedules;
        private scope;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $filter: ng.IFilterService, ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, RemoteRefreshSchedules: RemoteRefreshSchedules);
        execute(context: IActionContext, item: INamedItemInfo, schedule: IRemoteRefreshScheduleInfo, availableTypes: string[]): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error);
    }
}
declare module VizPortal {
    interface ISortableParams {
        order?: string;
    }
    class QueryService {
        private $location;
        static $inject: string[];
        constructor($location: ng.ILocationService);
        createQueryUpdaterFromSubplace<T>($scope: ng.IScope, subplace: ISubplace<T>, refreshFn: (resourceQuery: ResourceQuery<T>) => any): IQueryUpdater;
        createQueryUpdater<T>($scope: ng.IScope, type: IContentType, resource: IListAndFieldValuesResource<T>, refreshFn: (resourceQuery: ResourceQuery<T>) => any, defaultFilters: _.Dictionary<string>): IQueryUpdater;
    }
    interface IQueryUpdater {
        refresh(): void;
    }
}
declare module VizPortal {
    class SelectionService {
        rowClicked<T>(selectedItems: Set<T>, row: T, colIndex: number): void;
    }
}
declare module VizPortal {
    interface IRemoteRefreshPropertiesButtonScope {
        currentRefreshLocation: () => string;
        refreshPropertiesAreEditable: () => boolean;
        changeRemoteRefreshProperties: ($event: JQueryEventObject) => any;
    }
    interface IRemoteRefreshSchedulesScope extends IRemoteRefreshPropertiesButtonScope, ISubplaceCountsScope, IActionButtonsScope {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        sorter: Sorter;
        selectedItems: Set<IRemoteRefreshScheduleInfo>;
        sliceable: ISliceable<IRemoteRefreshScheduleInfo>;
        datasource: IDataSourceInfo;
        anyActionsAllowed: () => boolean;
        headerClicked(header: ITemplate): any;
        rowClicked(row: IRemoteRefreshScheduleInfo, colIndex: number): any;
        sliceChanged(newSlice: ListResult<IRemoteRefreshScheduleInfo>): any;
        objectName: string;
        emptyTemplateModel: IEmptyTemplateModel;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    class RemoteRefreshSchedulesCtrl {
        private $q;
        private $translate;
        private AngularToReactDataGridBridge;
        private $scope;
        private $filter;
        private serverService;
        private HelpService;
        private datasource;
        private DeleteRemoteRefreshSchedulesAction;
        private EditRemoteRefreshScheduleAction;
        static $inject: string[];
        private query;
        private waitForCountOfSchedules;
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, $scope: IRemoteRefreshSchedulesScope, $state: ng.ui.IStateService, $filter: ng.IFilterService, BrowserTitleService: BrowserTitleService, subplace: ISubplace<IRemoteRefreshScheduleInfo>, serverService: ServerService, queryService: QueryService, selectionService: SelectionService, HelpService: HelpService, sorterFactory: SorterFactory, datasource: IDataSourceInfo, CreateRemoteRefreshScheduleAction: CreateRemoteRefreshScheduleAction, DeleteRemoteRefreshSchedulesAction: DeleteRemoteRefreshSchedulesAction, EditRemoteRefreshScheduleAction: EditRemoteRefreshScheduleAction, ChangeDatasourceRemoteRefreshPropertiesAction: ChangeDatasourceRemoteRefreshPropertiesAction);
        private static keyForSchedule(remoteRefreshSchedule);
        private anyActionsAllowed();
        private emptyTemplateModel();
        private configureForReactDataGrid(actions);
        private redirectByExtractsAndRefreshMode($state, datasource);
        private createActions(selectedItems);
        private refreshRemoteRefreshSchedules();
    }
}
declare module VizPortal {
    module CreateOrEditScheduleViewModelMapper {
        function defaultSchedule(): IScheduleViewModel;
        function defaultScheduleFrequency(): IScheduleFrequencyViewModel;
        function viewModelFromSchedule(schedule: ServerApi.ISchedule): IScheduleViewModel;
        function viewModelFromScheduleFrequency(schedule: ServerApi.IScheduleFrequency): IScheduleViewModel;
        function createScheduleParamsFromViewModel(viewModel: IScheduleViewModel): ServerApi.ICreateScheduleParams;
        function updateScheduleParamsFromViewModel(viewModel: IScheduleViewModel): ServerApi.IUpdateScheduleParams;
        function scheduleFrequencyFromViewModel(viewModel: IScheduleFrequencyViewModel): ServerApi.IScheduleFrequency;
    }
}
declare module VizPortal {
    interface IScheduleViewModel extends IScheduleFrequencyViewModel {
        id?: string;
        name: string;
        priority: number;
        parallel: boolean;
        scheduledAction: string;
    }
    interface IScheduleFrequencyViewModel {
        scheduleType: string;
        daily: ServerApi.IDailySchedule;
        hourly: ServerApi.IHourlySchedule;
        weekly: ServerApi.IWeeklySchedule;
        monthly: ServerApi.IMonthlySchedule;
    }
    interface ICreateOrEditScheduleScope extends ng.IScope {
        scheduleActions: string[];
        hourlyFrequencies: ICreateOrEditScheduleSelectOption[];
        daysOfMonth: ICreateOrEditScheduleSelectOption[];
        scheduleViewModel: IScheduleViewModel;
    }
    interface ICreateOrEditScheduleSelectOption {
        label: string;
        value: any;
    }
    class CreateOrEditScheduleCtrl {
        private $translate;
        static $inject: string[];
        constructor($scope: ICreateOrEditScheduleScope, $translate: ng.translate.ITranslateService);
        private hourlyFrequencies();
        private daysOfMonth();
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateScheduleParams {
        id: string;
        name: string;
        scheduleType: string;
        scheduleDetails: IDailySchedule;
        priority: number;
        parallel: boolean;
    }
    class UpdateScheduleRequest extends Request<IUpdateScheduleParams, IResult> {
        constructor(params: IUpdateScheduleParams);
    }
}
declare module VizPortal {
    class CreateScheduleAction {
        private ConfirmActionDialog;
        private $translate;
        private ContentActionNotification;
        private Schedules;
        private ScheduleErrors;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, ContentActionNotification: ContentActionNotification, Schedules: Schedules, ScheduleErrors: ScheduleErrors);
        createSchedule(context: IActionContext): ng.IPromise<ServerApi.IResult>;
        editSchedule(schedule: ServerApi.ISchedule, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private showDialog(mode, scheduleViewModel, context);
        submitScheduleCreate(scheduleViewModel: IScheduleViewModel, dialogInstance: IConfirmActionDialogInstance): ng.IPromise<ServerApi.IResult>;
        submitScheduleUpdate(scheduleViewModel: IScheduleViewModel, originalScheduleName: string, dialogInstance?: IConfirmActionDialogInstance): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class DeleteSchedulesAction {
        private ScheduleErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Schedules;
        static $inject: string[];
        constructor(ScheduleErrors: ScheduleErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Schedules: Schedules);
        deleteSchedules(schedules: Set<ServerApi.ISchedule>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private notifyResult(schedules, result);
        private countExtractTasks(schedules);
        private countSubscriptionSchedules(schedules);
    }
}
declare module VizPortal {
    interface IRenameScheduleDialogScope extends ng.IScope {
        description: string;
        input: {
            text: string;
            maxLength?: number;
        };
    }
    class RenameScheduleAction {
        private toaster;
        private ConfirmActionDialog;
        private $translate;
        private Schedules;
        private ScheduleErrors;
        static $inject: string[];
        constructor(toaster: ToasterService, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Schedules: Schedules, ScheduleErrors: ScheduleErrors);
        confirmRename(schedule: ServerApi.ISchedule, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        renameInPlace(schedule: ServerApi.ISchedule, newName: string): ng.IPromise<ServerApi.IResult>;
        private handleResult(schedule, newName, result, dialogInstance?);
    }
}
declare module VizPortal {
    class RunSchedulesAction extends AbstractContentAction<ServerApi.ISchedule> {
        private $translate;
        private Schedules;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, Schedules: Schedules);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, schedules: Set<ServerApi.ISchedule>): void;
        notificationTranslationIds(): INotificationTranslationIds;
    }
}
declare module VizPortal {
    class RunServerSchedulesAction extends AbstractContentAction<ServerApi.ISchedule> {
        private $translate;
        private Schedules;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, Schedules: Schedules);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, schedules: Set<ServerApi.ISchedule>): void;
        notificationTranslationIds(): INotificationTranslationIds;
    }
}
declare module VizPortal {
    class SchedulePermissions {
        private ServerService;
        static $inject: string[];
        constructor(ServerService: ServerService);
        canEditSchedule(): boolean;
        canRunSchedule(): boolean;
    }
}
declare module VizPortal {
    class ScheduleErrors {
        private ServerService;
        private SchedulesConfig;
        private $translate;
        static $inject: string[];
        constructor(ServerService: ServerService, SchedulesConfig: SchedulesConfig, $translate: ng.translate.ITranslateService);
        errorDetailsFor(scheduleErrorItem: IErrorItem<ServerApi.ISchedule>): IErrorDetail;
        private scheduleUrl(schedule);
        private errorMessageForItem(errorItem);
        errorMessageFor(error: ServerApi.IError, scheduleName?: string): string;
    }
}
declare module VizPortal {
    class SetScheduleStatusAction {
        private ScheduleErrors;
        private ActionHelpers;
        private ConfirmActionDialog;
        private $translate;
        private Schedules;
        static $inject: string[];
        private static EnableTranslationIds;
        private static DisableTranslationIds;
        constructor(ScheduleErrors: ScheduleErrors, ActionHelpers: ActionHelpers, ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, Schedules: Schedules);
        enableSchedule(schedule: ServerApi.ISchedule): ng.IPromise<void>;
        disableSchedule(schedule: ServerApi.ISchedule): ng.IPromise<void>;
        private singleton(schedule);
        confirmEnableSchedules(schedules: Set<ServerApi.ISchedule>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        confirmDisableSchedules(schedules: Set<ServerApi.ISchedule>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private confirmAction(schedules, context, action, translationIds);
        private enableSchedules(schedules);
        private disableSchedules(schedules);
        private notifyResult(schedules, result, translationIds);
    }
}
declare module VizPortal {
    interface IScheduleScope extends IMainScope, ISubplaceCountsScope, ISubplaceTabsScope {
        schedule: ServerApi.ISchedule;
        scheduleViewModel: IScheduleViewModel;
        scheduleStatus: {
            enabled: boolean;
        };
        isSubscription: boolean;
        rename: ($event: JQueryEventObject) => void;
        editMode: boolean;
        busy: boolean;
        beginEdit: ($event: JQueryEventObject) => void;
        cancelEdit: ($event: JQueryEventObject) => void;
        save: ($event: JQueryEventObject) => void;
        del: ($event: JQueryEventObject) => void;
        runNow: ($event: JQueryEventObject) => void;
        canRunNow: () => boolean;
        canEditSchedule: () => boolean;
        objectName: string;
    }
    class ScheduleCtrl {
        private SchedulePermissions;
        private CreateScheduleAction;
        private DeleteSchedulesAction;
        private SetScheduleStatusAction;
        private RunServerSchedulesAction;
        private RunSchedulesAction;
        private RenameScheduleAction;
        static $inject: string[];
        constructor($scope: IScheduleScope, $state: ng.ui.IStateService, schedule: ServerApi.ISchedule, place: IPlace, SchedulePermissions: SchedulePermissions, CreateScheduleAction: CreateScheduleAction, DeleteSchedulesAction: DeleteSchedulesAction, SetScheduleStatusAction: SetScheduleStatusAction, RunServerSchedulesAction: RunServerSchedulesAction, RunSchedulesAction: RunSchedulesAction, RenameScheduleAction: RenameScheduleAction, siteId: string);
    }
}
declare module VizPortal {
    class ChangeExtractTaskPriorityAction extends AbstractContentAction<IExtractTaskInfo> {
        private $translate;
        private ExtractTasks;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, ExtractTasks: ExtractTasks);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, extractTasks: Set<IExtractTaskInfo>): void;
        notificationTranslationIds(): INotificationTranslationIds;
    }
}
declare module VizPortal {
    class ChangeScheduleAction {
        private $translate;
        private ConfirmActionDialog;
        private SearchSuggestionsService;
        private Subscriptions;
        private ExtractTasks;
        private ActionHelpers;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, SearchSuggestionsService: SearchSuggestionsService, Subscriptions: Subscriptions, ExtractTasks: ExtractTasks, ActionHelpers: ActionHelpers);
        private createDialogScope<T>(parentScope, items, options);
        private execute<T>(items, context, options);
        private setScheduleErrorMessageFor(errorItem, schedule);
        forSubscriptions(subscriptions: Set<ISubscriptionInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private subscriptionErrorDetailFactory(schedule);
        private subscriptionErrorMessageFor(errorItem, schedule);
        forExtractTasks(extractTasks: Set<IExtractTaskInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private extractTaskErrorDetailFactory(schedule);
        private extractTaskErrorMessageFor(errorItem, schedule);
    }
}
declare module VizPortal {
    class DeleteExtractTasksAction {
        private ConfirmActionDialog;
        private ActionHelpers;
        private ContentUrl;
        private $translate;
        private ExtractTasks;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ActionHelpers: ActionHelpers, ContentUrl: ContentUrl, $translate: ng.translate.ITranslateService, ExtractTasks: ExtractTasks);
        executeWithContext(extractTasks: Set<IExtractTaskInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private urlFor(errorItem);
        private errorMessageFor(errorItem);
    }
}
declare module VizPortal.ServerApi {
    class DeleteExtractTasksRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IGetExtractTasksResult extends IGetItemsResult {
        tasks: IExtractTask[];
        datasources?: INamedItem[];
        workbooks?: INamedItem[];
        schedules: INamedItem[];
        sites: ISiteNameWithId[];
    }
    class GetExtractTasksRequest extends Request<IGetItemsParams, IGetExtractTasksResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    class RunExtractTasksRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class SetExtractTasksPriorityRequest extends Request<ISetPriorityParams, IResult> {
        constructor(ids: string[], priority: number);
    }
}
declare module VizPortal.ServerApi {
    class SetExtractTasksScheduleRequest extends Request<ISetScheduleParams, IResult> {
        constructor(ids: string[], scheduleId: string);
    }
}
declare module VizPortal {
    class ExtractTasks extends Resource<IExtractTaskInfo> {
        private ErrorNotifyingServer;
        static MAX_PRIORITY: number;
        static MIN_PRIORITY: number;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        run(ids: string[]): ng.IPromise<ServerApi.IResult>;
        setPriority(ids: string[], priority: number): ng.IPromise<ServerApi.IResult>;
        setSchedule(ids: string[], scheduleId: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class RunExtractTasksAction extends AbstractContentAction<IExtractTaskInfo> {
        private $translate;
        private ExtractTasks;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, ExtractTasks: ExtractTasks);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, extractTasks: Set<IExtractTaskInfo>): void;
        notificationTranslationIds(): INotificationTranslationIds;
    }
}
declare module VizPortal.ServerApi {
    class DeleteSubscriptionsRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface ISubscription extends IIdItem, IScheduledItem, ISiteItem {
        subject: string;
        userId: string;
        lastSentAt?: string;
        runNextAt?: string;
        targetId: string;
        targetName: string;
        targetType: string;
        targetPath: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetSubscriptionsResult extends IGetItemsResult {
        subscriptions: ISubscription[];
        schedules: INamedItem[];
        sites: ISiteNameWithId[];
        users: IUser[];
    }
    class GetSubscriptionsRequest extends Request<IGetItemsParams, IGetSubscriptionsResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    class SetSubscriptionsScheduleRequest extends Request<ISetScheduleParams, IResult> {
        constructor(ids: string[], scheduleId: string);
    }
}
declare module VizPortal.ServerApi {
    interface ISetSubscriptionSubjectParams extends ISingleIdParams {
        subject: string;
    }
    class SetSubscriptionSubjectRequest extends Request<ISetSubscriptionSubjectParams, IEmptyResult> {
        constructor(id: string, subject: string);
    }
}
declare module VizPortal {
    class Subscriptions extends Resource<ISubscriptionInfo> {
        private ErrorNotifyingServer;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        setSchedule(ids: string[], scheduleId: string): ng.IPromise<ServerApi.IResult>;
        changeSubject(id: string, subject: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class TaskPlace {
        private $location;
        private ExtractTasks;
        private Subscriptions;
        private urlParamsFn;
        private static ExcludeFilterKeys;
        static $inject: string[];
        constructor($location: ng.ILocationService, ExtractTasks: ExtractTasks, Subscriptions: Subscriptions);
        create(siteId?: string, implicitFilters?: {}): IPlace;
    }
}
declare module VizPortal {
    interface ITasksScope extends IMainScope, ISubplaceCountsScope, ISubplaceTabsScope {
    }
    class TasksCtrl {
        static $inject: string[];
        constructor($scope: ITasksScope, $state: ng.ui.IStateService, place: IPlace);
    }
}
declare module VizPortal {
    interface IExtractTasksScope extends IRemoteRefreshPropertiesButtonScope, ITasksScope, IActionButtonsScope, IPlaceScope {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        sorter: Sorter;
        selectedItems: Set<IExtractTaskInfo>;
        sliceable: ISliceable<IExtractTaskInfo>;
        rowClicked(row: IExtractTaskInfo, colIndex: number): any;
        headerClicked(header: ITemplate): any;
        sliceChanged(newSlice: ListResult<IExtractTaskInfo>): any;
        extractTypeTranslationKey(extractTask: IExtractTaskInfo): string;
        objectName: string;
        anyActionsAllowed(): boolean;
        emptyTemplateModel: IEmptyTemplateModel;
        showRefreshProperties: () => boolean;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    interface IExtractTasksContext {
        createExtractTaskFn: (context: IActionContext) => ng.IPromise<any>;
        modifyExtractTasksPermission: boolean;
        datasource?: IDataSourceInfo;
    }
    class ExtractTasksCtrl {
        private $q;
        private $translate;
        private AngularToReactDataGridBridge;
        private $filter;
        private $scope;
        private $state;
        private extractTasksContext;
        private DeleteExtractTasksAction;
        private RunExtractTasksAction;
        private ChangeExtractTaskPriorityAction;
        private ChangeScheduleAction;
        private ServerService;
        private HelpService;
        static $inject: string[];
        private query;
        private waitForCountOfSchedules;
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, $filter: ng.IFilterService, $scope: IExtractTasksScope, $state: ng.ui.IStateService, BrowserTitleService: BrowserTitleService, subplace: ISubplace<IExtractTaskInfo>, extractTasksContext: IExtractTasksContext, queryService: QueryService, selectionService: SelectionService, sorterFactory: SorterFactory, DeleteExtractTasksAction: DeleteExtractTasksAction, RunExtractTasksAction: RunExtractTasksAction, ChangeExtractTaskPriorityAction: ChangeExtractTaskPriorityAction, ChangeScheduleAction: ChangeScheduleAction, ChangeDatasourceRemoteRefreshPropertiesAction: ChangeDatasourceRemoteRefreshPropertiesAction, ServerService: ServerService, HelpService: HelpService);
        private anyActionsAllowed();
        private isServerPage();
        private showWorkbookOrDatasourceColumn();
        private showScheduleColumn();
        private showSiteColumn();
        private redirectByExtractsAndRefreshMode($state, datasource);
        private createActions(selectedItems);
        private refreshExtractTasks();
        private createEmptyTemplateModel(extractTasksContext);
        private configureForReactDataGrid(actions);
    }
}
declare module VizPortal.ServerApi {
    interface ICreateGroupParams {
        name: string;
    }
    interface ICreateGroupResult {
    }
    class CreateGroupRequest extends Request<ICreateGroupParams, ICreateGroupResult> {
        constructor(params: ICreateGroupParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteGroupsParams {
        ids: string[];
    }
    interface IDeleteGroupsResult extends IResult {
    }
    class DeleteGroupsRequest extends Request<IDeleteGroupsParams, IDeleteGroupsResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IGroup extends INamedItem {
        userCount?: number;
        isAllUsersGroup: boolean;
        domainName?: string;
    }
    var LocalGroupDomainName: string;
    var GroupKeys: {
        id: string;
        name: string;
    };
}
declare module VizPortal.ServerApi {
    interface IGetGroupsParams extends IGetItemsParams {
    }
    interface IGetGroupsResult extends IGetItemsResult {
        groups: IGroup[];
    }
    class GetGroupsRequest extends Request<IGetGroupsParams, IGetGroupsResult> {
        constructor(params: IGetGroupsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateGroupNameParams {
        groupId: string;
        name: string;
    }
    interface IUpdateGroupNameResult {
    }
    class UpdateGroupNameRequest extends Request<IUpdateGroupNameParams, IUpdateGroupNameResult> {
        constructor(params: IUpdateGroupNameParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateGroupsMinimumSiteRoleParams {
        groupIds: string[];
        minimumSiteRole: string;
    }
    class UpdateGroupsMinimumSiteRoleRequest extends Request<IUpdateGroupsMinimumSiteRoleParams, IResult> {
        constructor(params: IUpdateGroupsMinimumSiteRoleParams);
    }
}
declare module VizPortal {
    class Groups extends Resource<ServerApi.IGroup> {
        private ErrorNotifyingServer;
        static isActiveDirectory(group: ServerApi.IGroup): boolean;
        static $inject: string[];
        private server;
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        createGroup(groupName: string): ng.IPromise<ServerApi.IResult>;
        deleteGroups(ids: string[]): ng.IPromise<ServerApi.IResult>;
        updateGroupName(groupId: string, name: string): ng.IPromise<ServerApi.IResult>;
        getGroupDetails(groupId: string): ng.IPromise<ServerApi.IGetGroupDetailsResult>;
        updateGroupsMinimumSiteRole(groupIds: string[], siteRole: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class SiteRoles {
        private serverService;
        static All: string[];
        static WithoutGuest: string[];
        static WithoutGuestOrServerAdmin: string[];
        static Mixed: string;
        static $inject: string[];
        constructor(serverService: ServerService);
        optionsForCurrentUser(): string[];
    }
}
declare module VizPortal.ServerApi {
    interface IGetGroupDetailsParams {
        id: string;
    }
    interface IGetGroupDetailsResult extends IResult {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        domainType: string;
        domainName?: string;
        isAllUsersGroup: boolean;
        minimumSiteRole?: string;
    }
    class GetGroupDetailsRequest extends Request<IGetGroupDetailsParams, IGetGroupDetailsResult> {
        constructor(params: IGetGroupDetailsParams);
    }
}
declare module VizPortal {
    interface IGroupDetailsInfo extends IGroupBasicInfo {
        createdAt: string;
        updatedAt: string;
        domainType: string;
    }
}
declare module VizPortal {
    interface ISiteUserInfo extends IUserInfo {
        groupCount: number;
        lastSignIn?: string;
        siteRole: string;
        authSetting?: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISearchActiveDirectoryGroupNameParams extends IGetItemsParams {
    }
    interface ISearchActiveDirectoryGroupNameResult extends IGetItemsResult {
        groups: IGroup[];
        hasMoreItems: boolean;
    }
    class SearchActiveDirectoryGroupNameRequest extends Request<ISearchActiveDirectoryGroupNameParams, ISearchActiveDirectoryGroupNameResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IActionResult extends IResult {
        actionId?: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISyncActiveDirectoryGroupParams {
        name: string;
        domainName: string;
        siteRole: string;
    }
    interface ISyncAdGroupCompleteResult extends IResult {
        usersAddedToGroup: number;
        usersAddedToSite: number;
        usersInActiveDirectoryGroup: number;
        usersProcessed: number;
        usersRemovedFromGroup: number;
        usersSiteRoleUpdated: number;
        usersSkipped: number;
        usersUnlicensed: number;
        usersUpdated: number;
        usersWithInsufficientLicenses: number;
    }
    class SyncActiveDirectoryGroupRequest extends Request<ISyncActiveDirectoryGroupParams, IActionResult> {
        constructor(params: ISyncActiveDirectoryGroupParams);
    }
}
declare module VizPortal.ServerApi {
    interface IActiveDirectoryGroup {
        name: string;
        domainName: string;
    }
    interface ISyncActiveDirectoryGroupsParams {
        groups: IActiveDirectoryGroup[];
    }
    class SyncActiveDirectoryGroupsRequest extends Request<ISyncActiveDirectoryGroupsParams, IResult> {
        constructor(groups: IActiveDirectoryGroup[]);
    }
}
declare module VizPortal {
    class ActiveDirectoryGroups {
        private ErrorNotifyingServer;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer);
        searchActiveDirectoryGroupName(searchInputText: string): ng.IPromise<any>;
        syncAdGroup(groupName: string, groupDomainName: string, siteRole?: string): ng.IPromise<any>;
        syncAdGroups(groups: IGroupBasicInfo[]): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    var SyncGroupEvent: {
        groupSynced: string;
    };
    interface IAddAdGroupDialogScope extends ng.IScope {
        group: {
            model?: IGroupBasicInfo;
            siteRole?: string;
        };
    }
    class ActiveDirectoryGroupAction {
        private $timeout;
        private $translate;
        private $q;
        private ActiveDirectoryGroups;
        private ConfirmActionDialog;
        private longRunningActionService;
        private toaster;
        static $inject: string[];
        private static Mode;
        constructor($timeout: ng.ITimeoutService, $translate: ng.translate.ITranslateService, $q: ng.IQService, ActiveDirectoryGroups: ActiveDirectoryGroups, ConfirmActionDialog: ConfirmActionDialog, longRunningActionService: LongRunningActionService, toaster: ToasterService);
        showSyncAdGroupDialog(group: IGroupBasicInfo, scope: ng.IScope): ng.IPromise<any>;
        showSyncAdGroupsDialog(selectedGroups: IGroupBasicInfo[], scope: ng.IScope): ng.IPromise<any>;
        showAddAdGroupDialog(scope: ng.IScope): ng.IPromise<any>;
        private handleSyncErrorResultFor(scope, actionType);
        private handleSyncCompleteFor(scope, actionType);
    }
}
declare module VizPortal {
    interface ISetGroupsMinimumSiteRoleDialogScope extends ng.IScope {
        description: string;
        siteRole: string;
        siteRoleOptions: string[];
        setSiteRole: (role: string) => void;
    }
    class UpdateGroupsMinimumSiteRoleAction {
        private $translate;
        private $q;
        private $filter;
        private Groups;
        private toaster;
        private confirmActionDialog;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, $filter: ng.IFilterService, Groups: Groups, toaster: ToasterService, confirmActionDialog: ConfirmActionDialog);
        executeInPlace(group: IGroupDetailsInfo, siteRole: string): ng.IPromise<any>;
        showUpdateGroupsMinimumSiteRoleDialog(groupsToSet: Set<IGroupInfo>, context: IActionContext): ng.IPromise<any>;
        private setGroupsSiteRoles(selectedGroups, siteRole);
        private handleSuccessResult(groups, siteRole);
        private handleErrorResult(groups, siteRole, result);
    }
}
declare module VizPortal {
    class CheckboxState {
        static checked: string;
        static mixed: string;
        static empty: string;
        static toggle(checkboxState: string): string;
    }
}
declare module VizPortal {
    interface IApplyCancelButtons {
        applyString: string;
        cancelString: string;
        apply(): ng.IPromise<any>;
        cancel(): void;
        disableApply(): boolean;
        disableCancel(): boolean;
        isBusy(): boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IImportExternalSiteUsersParams {
        emailAddresses: string[];
        siteRole: string;
    }
    interface IImportExternalUsersResult extends IResult {
        users: IUser[];
    }
    class ImportExternalSiteUsersRequest extends Request<IImportExternalSiteUsersParams, IImportExternalUsersResult> {
        constructor(params: IImportExternalSiteUsersParams);
    }
}
declare module VizPortal.ServerApi {
    interface IImportThirdPartySiteUsersParams {
        emailAddresses: string[];
        siteRole: string;
    }
    interface IImportThirdPartyUsersResult extends IResult {
        users: IUser[];
    }
    class ImportThirdPartySiteUsersRequest extends Request<IImportThirdPartySiteUsersParams, IImportThirdPartyUsersResult> {
        constructor(params: IImportThirdPartySiteUsersParams);
    }
}
declare module VizPortal.ServerApi {
    interface IAddUsersToSiteParams {
        usernames: string[];
        siteRole: string;
    }
    interface IAddUsersToSiteResult extends IResult {
    }
    class AddUsersToSiteRequest extends Request<IAddUsersToSiteParams, IAddUsersToSiteResult> {
        constructor(usernames: string[], siteRole: string);
    }
}
declare module VizPortal.ServerApi {
    interface ICreateLocalUserParams {
        username: string;
        displayName: string;
        email: string;
        encryptedPassword: string;
        keyId: string;
        admin?: boolean;
        siteRole?: string;
    }
    class CreateLocalUserRequest extends Request<ICreateLocalUserParams, IUserActionResult> {
        constructor(params: ICreateLocalUserParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteUsersParams {
        ids: string[];
    }
    interface IDeleteUsersResult extends IUserActionResult {
    }
    class DeleteUsersRequest extends Request<IDeleteUsersParams, IDeleteUsersResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IGetRemainingUserQuotaParams {
    }
    interface IGetRemainingUserQuotaResult {
        usersRemaining?: number;
    }
    class GetRemainingUserQuotaRequest extends Request<IGetRemainingUserQuotaParams, IGetRemainingUserQuotaResult> {
        constructor();
    }
}
declare module VizPortal.ServerApi {
    interface ISiteUser extends IUser {
        groupCount: number;
        lastSignIn?: string;
        siteRole: string;
        authSetting?: string;
    }
    var SiteUserAuthSetting: {
        Saml: string;
        Default: string;
    };
}
declare module VizPortal.ServerApi {
    interface IGetSiteUsersParams extends IGetItemsParams {
    }
    interface IGetSiteUsersResult extends IGetItemsResult {
        users: ISiteUser[];
    }
    class GetSiteUsersRequest extends Request<IGetSiteUsersParams, IGetSiteUsersResult> {
        constructor(params: IGetSiteUsersParams);
    }
}
declare module VizPortal.ServerApi {
    interface IImportSiteUsersFromActiveDirectoryParams {
        usernames: string[];
        siteRole?: string;
        admin?: boolean;
    }
    interface IImportServerUsersFromActiveDirectoryParams {
        usernames: string[];
    }
    interface IImportUsersFromActiveDirectoryResult extends IResult {
        results?: IResultCodes[];
        users: IUser[];
        errors?: IUserActionError[];
    }
    class ImportSiteUsersFromActiveDirectoryRequest extends Request<IImportSiteUsersFromActiveDirectoryParams, IImportUsersFromActiveDirectoryResult> {
        constructor(params: IImportSiteUsersFromActiveDirectoryParams);
    }
    class ImportServerUsersFromActiveDirectoryRequest extends Request<IImportServerUsersFromActiveDirectoryParams, IImportUsersFromActiveDirectoryResult> {
        constructor(params: IImportServerUsersFromActiveDirectoryParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUsersAdminStatusParams {
        userIds: string[];
        admin: boolean;
    }
    interface IUpdateUsersAdminStatusResult extends IResult {
    }
    class UpdateUsersAdminStatusRequest extends Request<IUpdateUsersAdminStatusParams, IUpdateUsersAdminStatusResult> {
        constructor(params: IUpdateUsersAdminStatusParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUsersGroupMembershipParams {
        userIds: string[];
        addToGroupIds: string[];
        removeFromGroupIds: string[];
    }
    interface IUpdateUsersGroupMembershipResult extends IResult {
    }
    class UpdateUsersGroupMembershipRequest extends Request<IUpdateUsersGroupMembershipParams, IUpdateUsersGroupMembershipResult> {
        constructor(params: IUpdateUsersGroupMembershipParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUsersSiteRoleParams {
        userIds: string[];
        siteRole: string;
    }
    interface IUpdateUsersSiteRoleResult extends IResult {
    }
    class UpdateUsersSiteRoleRequest extends Request<IUpdateUsersSiteRoleParams, IUpdateUsersSiteRoleResult> {
        constructor(params: IUpdateUsersSiteRoleParams);
    }
}
declare module VizPortal {
    class SiteUsers extends Resource<ServerApi.ISiteUser> {
        private ErrorNotifyingServer;
        private $q;
        static $inject: string[];
        private server;
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory, $q: ng.IQService);
        getUserByUsernameAndDomain(username: string, domainName: string): ng.IPromise<any>;
        removeFromGroups(userIds: string[], groupIds: string[]): ng.IPromise<ServerApi.IResult>;
        getUserCountsBySiteRole(baseQuery: ResourceQuery<ServerApi.ISiteUser>): ng.IPromise<_.Dictionary<number>>;
        addToGroups(userIds: string[], groupIds: string[]): ng.IPromise<ServerApi.IResult>;
        updateUsersGroupMembership(userIds: string[], addToGroupIds: string[], removeFromGroupIds: string[]): ng.IPromise<ServerApi.IResult>;
        createLocalUser(username: string, displayName: string, email: string, password: string, admin: boolean, siteRole: string): ng.IPromise<ServerApi.IUserActionResult>;
        addUsersToSite(usernames: string[], siteRole: string): ng.IPromise<ServerApi.IResult>;
        deleteUsers(userIds: string[]): ng.IPromise<ServerApi.IUserActionResult>;
        importUsersFromActiveDirectory(userIds: string[], siteRole: string, serverAdmin?: boolean): ng.IPromise<IImportUsersResult>;
        importExternalUsers(emails: string[], siteRole: string): ng.IPromise<IImportUsersResult>;
        importThirdPartyUsers(emails: string[], siteRole: string): ng.IPromise<IImportUsersResult>;
        updateUsersSiteRole(userIds: string[], siteRole: string): ng.IPromise<ServerApi.IResult>;
        updateServerAdminStatusAndDelay(userIds: string[], admin: boolean): ng.IPromise<ServerApi.IResult>;
        updateServerAdminStatusNoDelay(userIds: string[], admin: boolean): ng.IPromise<ServerApi.IResult>;
        getRemainingUserQuota(): ng.IPromise<number>;
    }
}
declare module VizPortal.ServerApi {
    interface IGroupMember {
        userId: string;
        groupId: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetUsersGroupMembershipParams {
        userIds: string[];
        siteId?: string;
    }
    interface IGetUsersGroupMembershipResult {
        members: IGroupMember[];
        groups: IGroup[];
    }
    class GetUsersGroupMembershipRequest extends Request<IGetUsersGroupMembershipParams, IGetUsersGroupMembershipResult> {
        constructor(params: IGetUsersGroupMembershipParams);
    }
}
declare module VizPortal {
    class SliceableFactory {
        private $q;
        static $inject: string[];
        constructor($q: ng.IQService);
        fromArray<T>(list?: T[]): ISliceable<T>;
        searchArray<T>(searchFilterFn: (item: T, search: string) => boolean, listPromise: ng.IPromise<T[]>): ITypeaheadSource;
    }
}
declare module VizPortal.ServerApi {
    interface IResultCodes {
        id: string;
        codes: number[];
    }
    interface IUserActionError extends IError {
        username?: string;
    }
    interface IUserActionResult extends IResult {
        users?: IUser[];
        results?: IResultCodes[];
    }
}
declare module VizPortal {
    interface UserActionErrorNotificationParams {
        users: VizPortal.Set<ServerApi.IUser>;
        errors: ServerApi.IUserActionError[];
        showErrorMsgFunc?: (errorMsg: string) => void;
    }
    interface UserActionNotificationParams extends UserActionErrorNotificationParams {
        results: ServerApi.IResultCodes[];
        successCode: string;
    }
    class UserActionNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(params: UserActionNotificationParams): void;
        notifyErrors(params: UserActionErrorNotificationParams): void;
        private errorMessageFor(error, username);
        private ldapErrorMessage(error, username);
        private resultMessageFor(resultCode, username);
        private multiResultMessageFor(resultCode, count);
        private getUsersByResultMap(users, results, successCode, errorsByUserId);
        private isErrorResult(resultCode);
    }
    class AddUserToSiteActionNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(showErrorMsgFunc: (errorMsg: string) => void, result: ServerApi.IResult, username: string, siteRoleEnum: string): void;
        private errorMessageFor(error, username);
    }
    class SiteRolesUpdateActionNotification {
        private $state;
        private $filter;
        private $translate;
        private contentActionNotification;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $filter: ng.IFilterService, $translate: ng.translate.ITranslateService, contentActionNotification: ContentActionNotification);
        notify(result: ServerApi.IResult, users: Set<IUserInfo>, siteRoleEnum: string): void;
        private errorMessageFor(errorItem, siteRole);
    }
    class SiteMembershipUpdateActionNotification {
        private $state;
        private $translate;
        private contentActionNotification;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, contentActionNotification: ContentActionNotification);
        notify(result: ServerApi.IUpdateServerUsersSiteMembershipResult, users: Set<IUserInfo>, userCount: number, addedUser: IUserInfo, addedToSiteCount: number, addedToSiteName: string, removedFromSiteCount: number, removedFromSiteName: string): void;
        private errorMessageFor(errorItem);
    }
    class ServerAdminUpdateActionNotification {
        private $filter;
        private $state;
        private $translate;
        private contentActionNotification;
        static $inject: string[];
        constructor($filter: ng.IFilterService, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, contentActionNotification: ContentActionNotification);
        notify(result: ServerApi.IResult, users: Set<IUserInfo>, newAdminState: boolean): void;
        private errorMessageFor(errorItem);
    }
    class GroupMembershipUpdateActionNotification {
        private $state;
        private $translate;
        private contentActionNotification;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, contentActionNotification: ContentActionNotification);
        notify(result: ServerApi.IUpdateUsersGroupMembershipResult, users: Set<IUserInfo>, addedToGroupCount: number, addedToGroupName: string, removedFromGroupCount: number, removedFromGroupName: string): void;
        private errorMessageFor(errorItem);
    }
}
declare module VizPortal {
    var GroupMembershipEvent: {
        MembershipChanged: string;
    };
    var GroupMembershipDialogFilters: {
        AllGroups: string;
        AssignedGroups: string;
        SearchResults: string;
    };
    interface IGroupMembershipDialogScope extends ng.IScope {
        applyCancelButtons: IApplyCancelButtons;
        busy: boolean;
        checkboxClicked: (group: ServerApi.IGroup, colIndex?: number) => void;
        clientState: _.Dictionary<string>;
        close: (result: any) => void;
        dismiss: (reason?: any) => void;
        editGroupMembershipDescription: string;
        isGroupDirty: (group: ServerApi.IGroup) => boolean;
        isDirty: () => boolean;
        sliceable: ISliceable<ServerApi.IGroup>;
        users: Set<ServerApi.IUser>;
        submitSearch: (searchText: string, $event?: JQueryEventObject) => void;
        groupFilters: string[];
        groupFilter: GroupMembershipDialogCtrl.IFilterSelection;
        lastGroupFilter: string;
        searchInput: GroupMembershipDialogCtrl.ISearchInput;
        refreshAssignedGroups: () => void;
        needsAssignedGroupsRefresh: boolean;
        columnWidths: IColumnWidths;
    }
    class GroupMembershipDialogCtrl {
        private $q;
        private $translate;
        private groupMembershipUpdateActionNotification;
        private groups;
        private SiteUsers;
        private toaster;
        private sliceableFactory;
        static $inject: string[];
        private static ListOrder;
        private clientChanges;
        private scope;
        private server;
        private serverState;
        private groupIdToGroup;
        private uncheckedAssignedGroups;
        constructor($q: ng.IQService, $scope: IGroupMembershipDialogScope, $translate: ng.translate.ITranslateService, groupMembershipUpdateActionNotification: GroupMembershipUpdateActionNotification, groups: Groups, server: ServerService, SiteUsers: SiteUsers, toaster: ToasterService, BrowserSupportService: BrowserSupportService, sliceableFactory: SliceableFactory);
        private getColumnWidths(index);
        private updateGroupFilters();
        private getAssignedGroupsList();
        private isClientAndServerStateEqualFor(groupId);
        private clone(group);
        private getServerState(users);
        private apply();
        private isValidParamsForUpdate(params);
        private stringForGroupState(memberCount, selectedUsersCount);
    }
    module GroupMembershipDialogCtrl {
        interface IFilterSelection {
            selection: string;
        }
        interface ISearchInput {
            text: string;
        }
    }
}
declare module VizPortal {
    class EditGroupMembershipAction {
        private modalService;
        static $inject: string[];
        constructor(modalService: ModalService);
        showEditGroupMembershipDialog(users: Set<ISiteUserInfo>, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class RemoveUsersFromSiteAction {
        private $state;
        private $translate;
        private ConfirmActionDialog;
        private userActionNotification;
        private serverService;
        private SiteUsers;
        private toaster;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, userActionNotification: UserActionNotification, serverService: ServerService, SiteUsers: SiteUsers, toaster: ToasterService);
        showRemoveUsersFromSiteDialog(siteUsersToRemove: Set<ISiteUserInfo>, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    interface ISetUsersSiteRoleDialogScope extends ng.IScope {
        description: string;
        siteRole: string;
        siteRoleOptions: string[];
        setSiteRole: (role: string) => void;
    }
    class SetSiteUsersSiteRoleAction {
        private $translate;
        private $q;
        private confirmActionDialog;
        private serverAdminUpdateActionNotification;
        private serverService;
        private siteRolesUpdateActionNotification;
        private siteRoles;
        private siteUsers;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, confirmActionDialog: ConfirmActionDialog, serverAdminUpdateActionNotification: ServerAdminUpdateActionNotification, serverService: ServerService, siteRolesUpdateActionNotification: SiteRolesUpdateActionNotification, siteRoles: SiteRoles, siteUsers: SiteUsers, toaster: ToasterService);
        showSetSiteUsersSiteRoleDialog(siteUsersToSet: Set<ISiteUserInfo>, context: IActionContext): ng.IPromise<any>;
        private setSiteUsersSiteRoles(selectedUsers, siteRole);
        private demoteServerAdminsNoDelay(serverAdmins);
        private updateUsersSiteRole(users, siteRole);
        private makeUsersServerAdmins(users);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserAuthSettingsParams {
        userIds: string[];
        authSetting: string;
    }
    class UpdateUserAuthSettingsRequest extends ServerApi.Request<IUpdateUserAuthSettingsParams, ServerApi.IResult> {
        constructor(userIds: string[], authSetting: string);
    }
}
declare module VizPortal {
    class UpdateUserAuthenticationAction {
        private modal;
        static $inject: string[];
        constructor(modal: ModalService);
        showUpdateUserAuthenticationDialog(siteUsersToUpdate: Set<ServerApi.ISiteUser>, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class SiteUsersActions {
        private EditGroupMembershipAction;
        private RemoveUsersFromSiteAction;
        private SetSiteUsersSiteRoleAction;
        private serverService;
        private UpdateUserAuthenticationAction;
        private siteUsersActionDefinition;
        static $inject: string[];
        constructor(EditGroupMembershipAction: EditGroupMembershipAction, RemoveUsersFromSiteAction: RemoveUsersFromSiteAction, SetSiteUsersSiteRoleAction: SetSiteUsersSiteRoleAction, serverService: ServerService, UpdateUserAuthenticationAction: UpdateUserAuthenticationAction);
        getSiteUsersActionsButtons(): IActionButton<any>[];
        editUsersGroupMembershipAction(): IActionButton<any>;
        private removeUsersFromSiteAction();
        private updateUserAuthenticationAction();
        canEditAuthenticationSetting(items: Set<ServerApi.ISiteUser>): boolean;
        setSiteUsersSiteRoleAction(): IActionButton<any>;
        private canChangeRole(users);
        private canRemove(users);
        private static isSingleSelectAndGuest(users);
        private static areAllSelectedUsersServerAdmins(users);
    }
}
declare module VizPortal {
    var GroupUsersEvent: {
        usersRemoved: string;
        usersAdded: string;
    };
    class GroupActions {
        private $q;
        private $translate;
        private ActiveDirectoryGroupAction;
        private AddUsersToGroupAction;
        private CreateGroupDialogAction;
        private DeleteGroupAction;
        private UpdateGroupsMinimumSiteRoleAction;
        private EditGroupMembershipAction;
        private RemoveUsersFromGroupAction;
        private SiteUsersActions;
        private UpdateGroupNameAction;
        static $inject: string[];
        private groupsActionDefinition;
        private groupUsersActionDefinition;
        private allUsersGroupUsersActionDefinition;
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, ActiveDirectoryGroupAction: ActiveDirectoryGroupAction, AddUsersToGroupAction: AddUsersToGroupAction, CreateGroupDialogAction: CreateGroupDialogAction, DeleteGroupAction: DeleteGroupAction, UpdateGroupsMinimumSiteRoleAction: UpdateGroupsMinimumSiteRoleAction, EditGroupMembershipAction: EditGroupMembershipAction, RemoveUsersFromGroupAction: RemoveUsersFromGroupAction, SiteUsersActions: SiteUsersActions, UpdateGroupNameAction: UpdateGroupNameAction);
        getGroupsActionButtons(): IActionButton<any>[];
        getGroupUsersActionButtons(isAllUsersGroup: boolean): IActionButton<any>[];
        createGroup(dialogScope: ng.IScope): ng.IPromise<any>;
        deleteGroup(group: IGroupBasicInfo, dialogScope: ng.IScope): ng.IPromise<any>;
        addUsersToGroup(group: IGroupInfo): ng.IPromise<any>;
        renameGroup(group: IGroupInfo, dialogScope: ng.IScope): ng.IPromise<ServerApi.IResult>;
        syncAdGroup(group: IGroupBasicInfo, dialogScope: ng.IScope): ng.IPromise<ServerApi.IResult>;
        private removeUsersFromGroupAction();
        editUsersGroupMembershipAction(): IActionButton<any>;
        setGroupSiteRoleAction(): IActionButton<any>;
        private deleteGroupAction();
        private updateGroupNameAction();
        private syncGroupsAction();
        private isDeletable(group);
        private isRenamable(group);
        private isSyncable(group);
        private isActiveDirectoryGroup(group);
    }
}
declare module VizPortal {
    interface IGroupDetailsModel {
        domainName: string;
        createdAt: string;
        updatedAt: string;
        isAllUsersGroup: boolean;
        minimumSiteRole?: string;
    }
    interface IGroupDetailsCtrl extends ng.IScope {
        canSessionUserManageUsers: boolean;
        deleteGroup: ($event: JQueryEventObject) => void;
        groupDetailsModel: IGroupDetailsModel;
        isLocalGroup: () => boolean;
        isAllUsersGroup: () => boolean;
        objectName: string;
        allowMinimumSiteRole: boolean;
        isEditingMinimumSiteRole: boolean;
        isSavingMinimumSiteRole: boolean;
        siteRoleOptions: string[];
        editSiteRole: () => void;
        saveSiteRole: () => void;
        cancelSiteRole: () => void;
    }
    class GroupDetailsCtrl {
        private $scope;
        private $state;
        private groupDetails;
        private groupActions;
        static $inject: string[];
        constructor($scope: IGroupDetailsCtrl, $state: ng.ui.IStateService, BrowserTitleService: BrowserTitleService, canSessionUserManageUsers: boolean, groupDetails: ServerApi.IGetGroupDetailsResult, groupActions: GroupActions, serverService: ServerService, updateGroupsMinimumSiteRoleAction: UpdateGroupsMinimumSiteRoleAction);
    }
}
declare module VizPortal {
    interface IGroupInfo extends IGroupBasicInfo {
        userCount?: number;
        minimumSiteRole?: string;
    }
}
declare module VizPortal {
    interface IGroupPlaceScope extends IMainScope, ISubplaceTabsScope {
        group: IGroupInfo;
        groupsBreadcrumbUrl: () => string;
        canRename: () => boolean;
        rename: ($event: JQueryEventObject) => void;
        synchronize: ($event: JQueryEventObject) => void;
        canSynchronize: () => boolean;
        objectName: string;
    }
    class GroupPlaceCtrl {
        private $scope;
        private $state;
        private groupsResource;
        private groupActions;
        private serverService;
        static $inject: string[];
        constructor($scope: IGroupPlaceScope, $state: ng.ui.IStateService, breadcrumbs: BreadcrumbsService, group: IGroupInfo, groupsResource: Groups, groupActions: GroupActions, serverService: ServerService);
        private refreshGroup();
        private isActiveDirectoryGroup(group);
    }
}
declare module VizPortal {
    interface ITabsBannerModel {
        itemsCount: number;
    }
}
declare module VizPortal {
    class AddGroupsOptionsAction {
        private modal;
        static $inject: string[];
        private static reserveHeight;
        constructor(modal: ModalService);
        showAddGroupsOptionsDialog(context: IActionContext): ng.IPromise<any>;
    }
    interface IAddGroupsOptionsDialogScope extends ng.IScope {
        title: string;
        addLocalGroup(): void;
        importAdGroup(): void;
        close: (result: any) => void;
        options: IModalOptions;
    }
    class AddGroupsOptionsDialogCtrl {
        private createGroupDialogAction;
        private activeDirectoryGroupAction;
        static $inject: string[];
        constructor($scope: IAddGroupsOptionsDialogScope, createGroupDialogAction: CreateGroupDialogAction, activeDirectoryGroupAction: ActiveDirectoryGroupAction);
    }
}
declare module VizPortalReact {
    interface IActionTarget {
        items: VizPortal.Set<any>;
        detailedItem?: any;
        allowedActions?: any;
        actionContext: VizPortal.IActionContext;
    }
    class ActionsMenuColumnCell extends React.Component<ActionsMenuColumnCell.Props, any> {
        static displayName: string;
        static element: React.Factory<ActionsMenuColumnCell.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module ActionsMenuColumnCell {
        interface Props extends React.Props<ActionsMenuColumnCell> {
            actions: VizPortal.IActionButton<any>[];
            getActionTarget: () => IActionTarget;
            translate: IReactTranslateService;
            testId?: string;
        }
        class MenuButton extends React.Component<MenuButton.Props, any> {
            static displayName: string;
            static element: React.Factory<MenuButton.Props>;
            render(): React.DOMElement<React.HTMLAttributes>;
        }
        module MenuButton {
            interface Props extends Menu.ButtonProps {
            }
        }
    }
}
declare module VizPortalReact {
    class SparseCachedList<T, TSliceableItem> {
        private sliceable;
        private transform;
        private blockSize;
        static DefaultBlockSize: number;
        private cachedData;
        private fetching;
        constructor(sliceable: VizPortal.ISliceable<TSliceableItem>, transform: (item: TSliceableItem) => T, blockSize?: number);
        getItems(start: number, end: number): Q.Promise<T[]>;
        private fetchBlock(blockIndex);
    }
}
declare module VizPortal {
    interface IGroupsPlaceScope extends IMainScope, IPlaceTitleScope, IActionButtonsScope, IFilterPanelContainerScope {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        getDomainString(row: ServerApi.IGroup): void;
        headerClicked(header: ITemplate): any;
        canSessionUserManageUsers: boolean;
        isAD: boolean;
        showMinimumSiteRole: boolean;
        model: ITabsBannerModel;
        refreshItems(): void;
        rowClicked(row: ServerApi.IGroup, colIndex: number): any;
        selectedItems: Set<ServerApi.IGroup>;
        sliceable: ISliceable<ServerApi.IGroup>;
        sliceChanged: (newSlice: ListResult<ServerApi.IGroup>) => any;
        sorter: Sorter;
        emptyTemplateModel: IEmptyTemplateModel;
        dataGridProps: VizPortalReact.DataGrid.Props;
        reactDataGridInGroupsPlace: boolean;
    }
    class GroupsPlaceCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private groups;
        private groupActions;
        private addGroupsOptionsAction;
        private queryService;
        private ServerService;
        private AngularContextFactory;
        private filterPanelService;
        static $inject: string[];
        private static emptyTemplateModel;
        constructor($location: ng.ILocationService, $scope: IGroupsPlaceScope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, breadcrumbs: BreadcrumbsService, BrowserTitleService: BrowserTitleService, groups: Groups, groupActions: GroupActions, addGroupsOptionsAction: AddGroupsOptionsAction, queryService: QueryService, SelectionService: SelectionService, SorterFactory: SorterFactory, ServerService: ServerService, AngularContextFactory: AngularContextFactory, filterPanelService: FilterPanelService);
        private configureForReactDataGrid(showMinimumSiteRole);
        private createQueryUpdater();
        private dataGridColumns($scope, showMinimumSiteRole);
        private groupNameCellFormatter($scope);
    }
}
declare module VizPortalReact {
    module GroupUsersGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, siteUrls: SiteUrls, siteRoleFilter: VizPortal.ISiteRoleFilter, actions: VizPortal.IActionButton<any>[]): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortal {
    interface IGroupUsersSubplaceScope extends IGroupPlaceScope, IActionButtonsScope, IListScope<ServerApi.IUser> {
        sorter: Sorter;
        sliceable: ISliceable<ServerApi.ISiteUser>;
        rowClicked(row: ServerApi.ISiteUser, colIndex: number): any;
        headerClicked(header: ITemplate): any;
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        group: IGroupInfo;
        emptyTemplateModel: IEmptyTemplateModel;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    class GroupUsersSubplaceCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private siteRoleFilter;
        private ServerService;
        static $inject: string[];
        private static emptyTemplateModel;
        constructor($scope: IGroupUsersSubplaceScope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, siteRoleFilter: ISiteRoleFilter, ServerService: ServerService, BrowserTitleService: BrowserTitleService, SorterFactory: SorterFactory, users: SiteUsers, group: IGroupInfo, queryService: QueryService, selectionService: SelectionService, groupActions: GroupActions);
        private configureForReactDataGrid(actions);
    }
}
declare module VizPortal.ServerApi {
    class AddFavoriteRequest extends Request<IFavoriteParams, IResult> {
        constructor(params: IFavoriteParams);
    }
}
declare module VizPortal.ServerApi {
    interface IFavorite {
        id: string;
        objectType: string;
        objectId: string;
        objectName: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetFavoritesResult extends IGetItemsResult {
        favorites: IFavorite[];
    }
    class GetFavoritesRequest extends Request<IGetItemsParams, IGetFavoritesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    class RemoveFavoriteRequest extends Request<IFavoriteParams, IResult> {
        constructor(params: IFavoriteParams);
    }
}
declare module VizPortal {
    class FavoriteObjectType {
        static VIEW: string;
        static WORKBOOK: string;
    }
    class Favorites extends Resource<ServerApi.IFavorite> {
        private server;
        static $inject: string[];
        constructor(server: ServerService, FetcherFactory: FetcherFactory);
        addView(view: IViewBase): ng.IPromise<ServerApi.IResult>;
        addWorkbook(workbook: IWorkbookBase): ng.IPromise<ServerApi.IResult>;
        removeView(view: IViewBase): ng.IPromise<ServerApi.IResult>;
        removeViewById(id: string): ng.IPromise<ServerApi.IResult>;
        removeWorkbook(workbook: IWorkbookBase): ng.IPromise<ServerApi.IResult>;
        removeWorkbookById(id: string): ng.IPromise<ServerApi.IResult>;
        private add(objectId, objectType);
        private remove(objectId, objectType);
    }
}
declare module VizPortal.ServerApi {
    class AddTagsToViewsRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IGetFieldValuesResult extends IGetItemsResult {
        fieldValues: IFieldValue[];
    }
    class GetFieldValuesRequest extends Request<IFieldValuesParams, IGetFieldValuesResult> {
        constructor(params: IFieldValuesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IViewActions extends IDeleteAction, ILaunchWebAuthoringAction, ISetPermissionsAction, ISetTagsAction, _.Dictionary<boolean> {
        addComment: boolean;
        seeComments: boolean;
    }
}
declare module VizPortal.ServerApi {
    class GetViewActionsRequest extends Request<ISingleIdParams, IViewActions> {
        constructor(id: string);
    }
}
declare module VizPortal.ServerApi {
    interface IGetViewByPathParams {
        path: string;
    }
    class GetViewByPathRequest extends Request<IGetViewByPathParams, IViewDetail> {
        constructor(path: string);
    }
}
declare module VizPortal.ServerApi {
    class HideViewsRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class RemoveTagsFromViewsRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal {
    class Views implements IListResource<IViewInfo>, IFieldValuesResource, IDetailResource<IViewDetailInfo>, IActionResource<ServerApi.IViewActions> {
        private $q;
        private ErrorNotifyingServer;
        static $inject: string[];
        private server;
        private listFetcher;
        private allQuery;
        private detailFetcher;
        private fieldValuesFetcher;
        constructor($q: ng.IQService, ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        all(): ResourceQuery<IViewInfo>;
        getById(id: string): ng.IPromise<IViewDetailInfo>;
        getByPath(path: string): ng.IPromise<IViewDetailInfo>;
        valuesForField(field: string): FieldValuesQuery;
        actions(id: string): ng.IPromise<ServerApi.IViewActions>;
        hide(ids: string[]): ng.IPromise<ServerApi.IResult>;
        addTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        removeTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        changeTags(ids: string[], tagsToAdd: string[], tagsToRemove: string[]): ng.IPromise<ServerApi.IResult>;
        markRecentlyViewed(id: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface IHomeScope extends ng.IScope {
        favoriteViews: IViewInfo[];
        favoriteWorkbooks: IWorkbookInfo[];
        recentViews: IViewInfo[];
        recentWorkbooks: IWorkbookInfo[];
        updatedWorkbooks: IWorkbookInfo[];
        viewUrl: (view: IViewInfo) => string;
        workbookUrl: (workbook: IWorkbookInfo) => string;
        recentViewsUrl: () => string;
        recentWorkbooksUrl: () => string;
        favoriteViewsUrl: () => string;
        favoriteWorkbooksUrl: () => string;
        updatedWorkbooksUrl: () => string;
        addViewFavorite: (view: IViewInfo) => any;
        removeViewFavorite: (view: IViewInfo) => any;
        addWorkbookFavorite: (workbook: IWorkbookInfo) => any;
        removeWorkbookFavorite: (workbook: IWorkbookInfo) => any;
        getItemDetails: (item: IViewInfo | IWorkbookInfo) => any;
        scrollLeft: (section: string) => void;
        scrollRight: (section: string) => void;
        showScrollControls: (section: string) => boolean;
        canScrollLeft: (section: string) => boolean;
        canScrollRight: (section: string) => boolean;
    }
    class HomeCtrl {
        private static ItemsPerSection;
        static $inject: string[];
        constructor($scope: IHomeScope, $state: ng.ui.IStateService, Favorites: Favorites, Views: Views, Workbooks: Workbooks);
    }
}
declare module VizPortal {
    interface IInitializationFormModelScope {
        username: string;
        password: string;
        confirmPassword: string;
        displayName: string;
    }
    interface IInitializationScope extends ng.IScope {
        maybeInitialize: () => void;
        isActiveDirectory: () => boolean;
        isLocal: () => boolean;
        passwordFieldsAreNonEmpty: () => boolean;
        initializationForm: ng.IFormController;
        formData: IInitializationFormModelScope;
        result: string;
        busy: boolean;
        errorMessageKey: string;
    }
    class InitializationCtrl {
        static $inject: string[];
        constructor($scope: IInitializationScope, $state: ng.ui.IStateService, server: ServerService);
    }
}
declare module VizPortal.ServerApi {
    interface ILicensingInfo {
        isCore: boolean;
        productKeyInfos: IProductKeyInfo[];
        coreLicensingInfos?: ICoreLicensingInfo[];
        totalCoreLicenses?: number;
        seatLicensingInfo?: ISeatLicensingInfo;
    }
    interface IProductKeyInfo {
        serial: string;
        numCores?: number;
        numSeats?: number;
        maintenance: string;
        expiration: string;
        isValid: boolean;
        isGuestAllowed: boolean;
    }
    interface ICoreLicensingInfo {
        machineId: string;
        numMachineCores: number;
        numLicensedCores: number;
    }
    interface ISeatLicensingInfo {
        numLicensedUsers: number;
        numRemainingSeats: number;
        numUnlicensedUsers: number;
        isGuest: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IGetLicensingInfoParams {
    }
    interface IGetLicensingInfoResult extends ILicensingInfo {
    }
    class GetLicensingInfoRequest extends Request<IGetLicensingInfoParams, IGetLicensingInfoResult> {
        constructor(params?: IGetLicensingInfoParams);
    }
}
declare module VizPortal {
    interface ILicensingInfoWithTotals extends ServerApi.ILicensingInfo {
        totalLicensedCores?: number;
        totalCoreLicensesAvailable?: number;
        totalSeatLicenses?: number;
    }
    class LicensesService {
        private server;
        static $inject: string[];
        constructor(server: ServerService);
        fetch(): ng.IPromise<ILicensingInfoWithTotals>;
    }
}
declare module VizPortal {
    interface ILicensesScope extends ng.IScope {
        licensingInfo: ILicensingInfoWithTotals;
        isEmpty: boolean;
        formatExpirationDate: (date: string) => string;
    }
    class LicensesCtrl {
        private static PermanentRegExp;
        private static TrialRegExp;
        static $inject: string[];
        constructor($scope: ILicensesScope, $translate: ng.translate.ITranslateService, BrowserTitleService: BrowserTitleService, licensingInfo: ServerApi.ILicensingInfo);
    }
}
declare module VizPortal {
    class ErrorMessageHandler {
        private server;
        private $translate;
        static $inject: string[];
        constructor(server: ServerService, $translate: ng.translate.ITranslateService);
        getSignInErrorMessages(errorCode: number): string[];
    }
}
declare module VizPortal {
    class ExternalAuthService {
        private $stateParams;
        private $location;
        private serverService;
        private windowLocationService;
        private static SamlLoginUrl;
        private static OpenIdLoginUrl;
        static $inject: string[];
        constructor($stateParams: ILoginStateParams, $location: ng.ILocationService, serverService: ServerService, windowLocationService: WindowLocationService);
        getLoginUrl(): string;
        login(): void;
        private buildQueryParams(redirect, siteUrlName, sendPodInfo);
    }
}
declare module VizPortal {
    class StartPageService {
        private $location;
        private $state;
        private server;
        private stateWrapperService;
        static $inject: string[];
        constructor($location: ng.ILocationService, $state: ng.ui.IStateService, server: ServerService, stateWrapperService: StateWrapperService);
        getStartPageForSite(startPageUrl: string, siteUrlName: string): string;
        getCurrentUserStartPageForSite(siteUrlName: string): string;
        getCurrentUserStartPageForCurrentSite(): string;
        getCurrentUrlAsStartPage(): string;
        private getStartPageState(savedStartPageUrl);
        private isStartPageInASite(startPageState);
        private getDefaultStartPageForSite(siteUrlName);
    }
}
declare module VizPortal {
    interface ILoginScope extends ng.IScope {
        loginForm: any;
        maybeLogin: () => void;
        credentials: {
            username: string;
            password: string;
        };
        errorMessages: string[];
        busy: boolean;
        autoLogin: () => ng.IPromise<void>;
        isUsernameAndPasswordEnabled: () => boolean;
        shouldDisplayWindowsCredentialsLink: () => boolean;
        windowsCredentialsDisplayName: () => string;
        autoLoginDidFail: boolean;
        initialized: boolean;
        preloginCustomization: ServerApi.IPreloginCustomization;
    }
    interface ILoginStateParams extends ng.ui.IStateParamsService {
        externalRedirect: string;
        site: string;
        redirect: string;
        error: string;
        disableAutoSignin: string;
    }
    class LoginCtrl {
        static $inject: string[];
        constructor($scope: ILoginScope, server: ServerService, $state: ng.ui.IStateService, $stateParams: ILoginStateParams, $location: ng.ILocationService, $translate: ng.translate.ITranslateService, externalAuthService: ExternalAuthService, startPageService: StartPageService, windowLocationService: WindowLocationService, windowPopupService: WindowPopupService, errorMessageHandler: ErrorMessageHandler);
    }
}
declare module VizPortal {
    enum Keys {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Escape = 27,
        Space = 32,
        End = 35,
        Home = 36,
        ArrowLeft = 37,
        ArrowUp = 38,
        ArrowRight = 39,
        ArrowDown = 40,
        Delete = 46,
    }
}
declare module VizPortal.ServerApi {
    interface IGetSiteNamesResult extends IGetItemsResult {
        siteNames: ISiteNameWithId[];
    }
    class GetSiteNamesRequest extends Request<IGetItemsParams, IGetSiteNamesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal {
    class SiteNameSansIds extends Resource<ServerApi.ISiteNameSansId> {
        static $inject: string[];
        constructor(FetcherFactory: FetcherFactory);
    }
}
declare module VizPortal.ServerApi {
    interface IGetSiteNamesAcrossAllPodsResult extends IGetItemsResult {
        siteNames: ISiteNameSansId[];
    }
    class GetSiteNamesAcrossAllPodsRequest extends Request<IGetItemsParams, IGetSiteNamesAcrossAllPodsResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal {
    class SiteSwitchService {
        private $location;
        private $q;
        private $rootScope;
        private $state;
        private $translate;
        private server;
        private stateWrapper;
        private toaster;
        private windowLocation;
        static $inject: string[];
        private previousServerUrl;
        private previousSiteUrl;
        constructor($location: ng.ILocationService, $q: ng.IQService, $rootScope: ng.IScope, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, server: ServerService, stateWrapper: StateWrapperService, toaster: ToasterService, windowLocation: WindowLocationService);
        serverUrl(): string;
        siteUrl(): string;
        switchToSite(urlName: string): void;
        /**
        * Switches the site if the given urLName if it's not the current site's urlName
        *
        * Use this instead of ServerService.switchSiteIfNeeded in order to give proper
        * feedback in the error conditions
        */
        switchIfNeeded(urlName: string, podRedirectPath: string): ng.IPromise<void>;
        private getSwitchSiteErrorLocKey(error);
        switchIfNeededNoFeedback(urlName: string): ng.IPromise<void>;
        private inServerState();
    }
}
declare module VizPortal {
    interface ILoginSitePickerScope extends ng.IScope {
        site: string;
        siteSearchValue: string;
        sliceableSiteNames: ISliceable<ServerApi.ISiteNameSansId>;
        handleKeyEvent: ($event: JQueryEventObject) => void;
        select: (siteName: ServerApi.ISiteNameSansId) => void;
        currentRow: {
            index: number;
            object?: ServerApi.ISiteNameSansId;
        };
    }
    class LoginSitePickerCtrl {
        static $inject: string[];
        constructor($scope: ILoginSitePickerScope, $location: ng.ILocationService, siteNames: SiteNameSansIds, siteSwitchService: SiteSwitchService, startPageService: StartPageService);
    }
}
declare module VizPortal.ServerApi {
    interface IGetWorkbookVersionsParams extends IGetItemsParams {
    }
    interface IGetWorkbookVersionsResult extends IGetItemsResult {
        moreItems: boolean;
        versions: IWorkbookRevision[];
    }
    class GetWorkbookVersionsRequest extends Request<IGetWorkbookVersionsParams, IGetWorkbookVersionsResult> {
        constructor(params: IGetWorkbookVersionsParams);
    }
}
declare module VizPortal.ServerApi {
    class DeleteWorkbookVersionsRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal {
    class WorkbookRevisions extends Resource<ServerApi.IWorkbookRevision> {
        private ErrorNotifyingServer;
        static $inject: string[];
        private server;
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        del(id: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class PreviewWorkbookRevisionAction {
        private $translate;
        private toaster;
        private windowLocationService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, windowLocationService: WindowLocationService);
        openPreview(revision: ServerApi.IWorkbookRevision): void;
    }
}
declare module VizPortal {
    class DeleteWorkbookRevisionAction {
        private $translate;
        private ConfirmActionDialog;
        private toasterService;
        private WorkbookRevisions;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, toasterService: ToasterService, WorkbookRevisions: WorkbookRevisions);
        showDialogForAction(revision: ServerApi.IWorkbookRevision, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class RevisionActions {
        private $q;
        private $translate;
        private PreviewWorkbookRevisionAction;
        private DeleteWorkbookRevisionAction;
        private DownloadActions;
        static $inject: string[];
        private workbookRevisionsActionDefinition;
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, PreviewWorkbookRevisionAction: PreviewWorkbookRevisionAction, DeleteWorkbookRevisionAction: DeleteWorkbookRevisionAction, DownloadActions: DownloadActions);
        getWorkbookRevisionActionButtons(): IActionButton<any>[];
        private previewWorkbookRevisionAction();
        private deleteWorkbookRevisionAction();
        private downloadWorkbookRevisionAction();
    }
}
declare module VizPortal {
    class RevisionHistoryDialogCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private queryService;
        private AngularContextFactory;
        private revisionActions;
        private ServerService;
        private WorkbookRevisions;
        private sizeFilter;
        static $inject: string[];
        constructor($scope: RevisionHistoryDialogCtrl.Scope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, queryService: QueryService, AngularContextFactory: AngularContextFactory, revisionActions: RevisionActions, ServerService: ServerService, WorkbookRevisions: WorkbookRevisions, sizeFilter: ISizeFilter);
        private configureForReactDataGrid();
        private createQueryUpdater();
        private dataGridColumns($scope);
        private revisionNameCellFormatter();
        private revisionActionsCellFormatter($scope);
        private getRowStyle(revision);
    }
    module RevisionHistoryDialogCtrl {
        interface Scope extends RevisionHistoryAction.Scope {
            workbookId: string;
            dataGridProps: VizPortalReact.DataGrid.Props;
            selectedItems: Set<ServerApi.IWorkbookRevision>;
            refreshItems(): void;
            sliceable: ISliceable<ServerApi.IWorkbookRevision>;
        }
    }
}
declare module VizPortal {
    interface ISignInErrorScope extends ng.IScope {
        errorMessages: string[];
        tryAgain: () => void;
    }
    interface ISignInErrorStateParams extends ng.ui.IStateParamsService {
        errorCode: number;
        redirectPath: string;
    }
    class SignInErrorCtrl {
        static $inject: string[];
        constructor($scope: ISignInErrorScope, $stateParams: ISignInErrorStateParams, $location: ng.ILocationService, windowLocationService: WindowLocationService, errorMessageHandler: ErrorMessageHandler);
    }
}
declare module VizPortalReact {
    module ScheduleGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, actions: VizPortal.IActionButton<any>[], isServerPage: boolean, serverUrls: ServerUrls, siteUrls: SiteUrls, scheduleTypeNameFilter: VizPortal.IScheduleTypeNameFilter, scheduleActionNameFilter: VizPortal.IScheduleActionNameFilter): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortal {
    class SchedulesConfig {
        private $state;
        static $inject: string[];
        constructor($state: ng.ui.IStateService);
        siteUrlFor(schedule: ServerApi.ISchedule): string;
        serverUrlFor(schedule: ServerApi.ISchedule): string;
        private defaultChildState(schedule);
    }
}
declare module VizPortal {
    interface ISchedulesScope extends IMainScope, IPlaceTitleScope, IActionButtonsScope {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        sorter: Sorter;
        selectedItems: Set<ServerApi.ISchedule>;
        sliceChanged: (newSlice: ListResult<ServerApi.ISchedule>) => any;
        sliceable: ISliceable<ServerApi.ISchedule>;
        rowClicked(row: ServerApi.ISchedule, colIndex: number): any;
        headerClicked(header: ITemplate): any;
        schedules: {
            count: number;
        };
        scheduleUrl: (schedule: ServerApi.ISchedule) => string;
        emptyTemplateModel: IEmptyTemplateModel;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    class SchedulesCtrl {
        private $scope;
        private $state;
        private $translate;
        private AngularToReactDataGridBridge;
        private $filter;
        private SchedulesConfig;
        private SchedulePermissions;
        private Schedules;
        private ServerService;
        private CreateScheduleAction;
        private SetScheduleStatusAction;
        private RunServerSchedulesAction;
        private RunSchedulesAction;
        private DeleteSchedulesAction;
        private RenameScheduleAction;
        static $inject: string[];
        private query;
        private static emptyTemplateModel;
        constructor($scope: ISchedulesScope, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, $filter: ng.IFilterService, BrowserTitleService: BrowserTitleService, siteId: string, queryService: QueryService, SchedulesConfig: SchedulesConfig, SchedulePermissions: SchedulePermissions, SelectionService: SelectionService, Schedules: Schedules, SorterFactory: SorterFactory, ServerService: ServerService, CreateScheduleAction: CreateScheduleAction, SetScheduleStatusAction: SetScheduleStatusAction, RunServerSchedulesAction: RunServerSchedulesAction, RunSchedulesAction: RunSchedulesAction, DeleteSchedulesAction: DeleteSchedulesAction, RenameScheduleAction: RenameScheduleAction);
        private configureForReactDataGrid(actions);
        private isServerPage();
        private createActions(selectedItems, siteId);
        private refreshSchedules();
        private isScheduleEnabled(schedule);
    }
}
declare module VizPortal {
    interface IHost {
        name: string;
        processes: _.Dictionary<ServerApi.IWorkerProcess[]>;
    }
}
declare module VizPortal.ServerApi {
    var WorkerProcessType: {
        clusterController: string;
        gateway: string;
        vizportal: string;
        vizqlServer: string;
        cacheServer: string;
        searchServer: string;
        backgrounder: string;
        dataServer: string;
        dataEngine: string;
        wgServer: string;
        fileStore: string;
        repository: string;
    };
    interface IWorkerProcess {
        host: string;
        type: string;
        port: string;
        preferred: boolean;
    }
}
declare module VizPortal.ServerApi {
    var WorkerStatusType: {
        active: string;
        activeSyncing: string;
        busy: string;
        decommissionFailedReadOnly: string;
        decommissioningReadOnly: string;
        down: string;
        passive: string;
        readOnly: string;
        readyForRemoval: string;
        statusNotAvailable: string;
        statusNotAvailableSyncing: string;
        unlicensed: string;
    };
    interface IGetWorkerProcessStatusParams {
        process: IWorkerProcess;
    }
    interface IGetWorkerProcessStatusResult {
        status: string;
        pendingTransfers?: number;
        failedTransfers?: number;
        syncTimestamp?: string;
    }
    class GetWorkerProcessStatus extends Request<IGetWorkerProcessStatusParams, IGetWorkerProcessStatusResult> {
        constructor(params: IGetWorkerProcessStatusParams);
    }
}
declare module VizPortal {
    interface IConfirmActionDialogButton {
        label: string;
        testId?: string;
        isDeleteAction?: boolean;
        action: (confirmActionDialogInstance: IConfirmActionDialogInstance) => any;
        disabled?: () => boolean;
    }
    interface IConfirmActionDialogOptions {
        title: string;
        bodyText?: string;
        bodyTemplateUrl?: string;
        scope?: ng.IScope;
        position?: IModalPositionOptions;
        size?: string;
        actionName?: string;
        action?: (confirmActionDialogInstance: IConfirmActionDialogInstance) => any;
        confirmDisabled?: () => boolean;
        isDeleteAction?: boolean;
        buttons?: IConfirmActionDialogButton[];
    }
    interface IConfirmActionDialogInstance extends IModalInstance {
        setProgress: (progress: number) => void;
        showErrorMessage: (errorMessage: string) => void;
    }
    class ConfirmActionDialog {
        private $rootScope;
        private modal;
        private $q;
        static $inject: string[];
        constructor($rootScope: ng.IScope, modal: ModalService, $q: ng.IQService);
        open(config: IConfirmActionDialogOptions): IConfirmActionDialogInstance;
    }
}
declare module VizPortal.ServerApi {
    interface IRebuildSearchIndexParams {
    }
    interface IRebuildSearchIndexResult {
        actionId?: string;
    }
    class RebuildSearchIndexRequest extends Request<IRebuildSearchIndexParams, IRebuildSearchIndexResult> {
        constructor(params?: IGetZiplogInfoParams);
    }
}
declare module VizPortal {
    class RebuildSearchIndexService {
        private $translate;
        private server;
        private lrActionService;
        private toasterService;
        private rebuildSearchIndexPoller;
        private rebuildSearchIndexPending;
        private rebuildSearchIndexPercent;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, server: ServerService, lrActionService: LongRunningActionService, toasterService: ToasterService);
        handleCurrentJob(): ng.IPromise<any>;
        getRebuildSearchIndexPercent(): number;
        getRebuildSearchIndexPending(): boolean;
        rebuildSearchIndex(): ng.IPromise<any>;
        cancelPoll(): void;
        private trackRebuildSearchIndexProgress(actionId);
        private getRebuildSearchIndexStatus();
        private handleRebuildSearchIndexStatus(action);
    }
}
declare module VizPortal.ServerApi {
    interface IGetServerInfoParams {
    }
    interface IGetServerInfoResult {
        workerHosts: string[];
        processes: IWorkerProcess[];
    }
    class GetServerInfoRequest extends Request<IGetServerInfoParams, IGetServerInfoResult> {
        constructor(params: IGetServerInfoParams);
    }
}
declare module VizPortal {
    class ServerInfoService {
        private server;
        static $inject: string[];
        constructor(server: ServerService);
        fetch(): ng.IPromise<IHost[]>;
        private makeHosts(result);
    }
}
declare module VizPortal {
    interface IServerStatusScope extends ng.IScope {
        hosts: IHost[];
        components: string[];
        legendStatuses: string[];
        refreshButtonBusy: boolean;
        showZiplog: boolean;
        isSingleHost: () => boolean;
        isPreferred: (component: string, host: IHost) => boolean;
        refreshStatuses: () => void;
        rebuildSearchIndexPercent: () => number;
        rebuildSearchIndexPending: () => boolean;
        rebuildSearchIndex: () => void;
    }
    class ServerStatusCtrl {
        private hosts;
        static refreshProcessStatusEvent: string;
        private static legendStatuses;
        private static WorkerProcessTypes;
        private featureFlags;
        static $inject: string[];
        constructor($scope: IServerStatusScope, $translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, BrowserTitleService: BrowserTitleService, server: ServerService, rebuildSearchIndexService: RebuildSearchIndexService, confirmActionDialog: ConfirmActionDialog, serverInfo: ServerInfoService, hosts: IHost[]);
        private getComponents();
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserSettingsParams {
        username: string;
        domainName: string;
    }
    interface IGetUserSettingsResult extends IResult {
        language: string;
        locale: string;
        email: string;
        startPage: string;
    }
    class GetUserSettingsRequest extends Request<IGetUserSettingsParams, IGetUserSettingsResult> {
        constructor(params: IGetUserSettingsParams);
    }
}
declare module VizPortal {
    interface IUserSettings {
        language?: string;
        locale?: string;
        email?: string;
        startPage?: string;
    }
}
declare module VizPortal {
    interface IServerUserPlaceScope extends IMainScope {
        serverUser: ServerApi.IServerUser;
        userSettings: IUserSettings;
    }
    class ServerUserPlaceCtrl {
        private $scope;
        private serverUser;
        private userSettings;
        static $inject: string[];
        constructor($scope: IServerUserPlaceScope, serverUser: ServerApi.IServerUser, userSettings: IUserSettings);
    }
}
declare module VizPortalReact {
    module ServerUsersGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, serverUrls: ServerUrls, siteRoleFilter: VizPortal.ISiteRoleFilter, actions: VizPortal.IActionButton<any>[], showDomainNameColumn: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortal.ServerApi {
    interface ICreateLocalServerUserParams {
        username: string;
        displayName: string;
        email: string;
        encryptedPassword: string;
        keyId: string;
    }
    interface ICreateLocalServerUserResult {
    }
    class CreateLocalServerUserRequest extends Request<ICreateLocalServerUserParams, ICreateLocalServerUserResult> {
        constructor(params: ICreateLocalServerUserParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetServerUsersParams extends IGetUsersParams {
    }
    interface IGetServerUsersResult extends IGetItemsResult {
        users: IServerUser[];
    }
    class GetServerUsersRequest extends Request<IGetServerUsersParams, IGetServerUsersResult> {
        constructor(params: IGetServerUsersParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserRefreshTokenCountParams {
        username: string;
        domainName: string;
    }
    interface IGetUserRefreshTokenCountResult extends IResult {
        refreshTokenCount: number;
    }
    class GetUserRefreshTokenCountRequest extends Request<IGetUserRefreshTokenCountParams, IGetUserRefreshTokenCountResult> {
        constructor(params: IGetUserRefreshTokenCountParams);
    }
}
declare module VizPortal.ServerApi {
    interface IConnectedDevice {
        id: string;
        displayName: string;
        lastUsed: string;
        syncedDatasoureCount?: number;
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserConnectedDevicesParams {
        userId: string;
    }
    interface IGetUserConnectedDevicesResult extends IGetItemsResult {
        devices: IConnectedDevice[];
    }
    class GetUserConnectedDevicesRequest extends Request<IGetUserConnectedDevicesParams, IGetUserConnectedDevicesResult> {
        constructor(params: IGetUserConnectedDevicesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUserRole {
        id: string;
        sites: ISiteRole[];
    }
}
declare module VizPortal.ServerApi {
    interface IGetUsersSiteRolesParams {
        ids: string[];
    }
    interface IGetUsersSiteRolesResult extends IResult {
        users: IUserRole[];
    }
    class GetUsersSiteRolesRequest extends Request<IGetUsersSiteRolesParams, IGetUsersSiteRolesResult> {
        constructor(params: IGetUsersSiteRolesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteUserConnectedDevicesParams {
        userId: string;
        deviceIds: string[];
    }
    class DeleteUserConnectedDevicesRequest extends Request<IDeleteUserConnectedDevicesParams, IResult> {
        constructor(params: IDeleteUserConnectedDevicesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateServerUsersAdminStatusParams {
        userIds: string[];
        admin: boolean;
    }
    interface IUpdateServerUsersAdminStatusResult extends IResult {
    }
    class UpdateServerUsersAdminStatusRequest extends Request<IUpdateServerUsersAdminStatusParams, IUpdateServerUsersAdminStatusResult> {
        constructor(params: IUpdateServerUsersAdminStatusParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateServerUsersSiteMembershipParams {
        userIds: string[];
        addToSiteRoles: ISiteRole[];
        removeFromSiteIds: string[];
    }
    interface IUpdateServerUsersSiteMembershipResult extends IResult {
    }
    class UpdateServerUsersSiteMembershipRequest extends Request<IUpdateServerUsersSiteMembershipParams, IUpdateServerUsersSiteMembershipResult> {
        constructor(params: IUpdateServerUsersSiteMembershipParams);
    }
}
declare module VizPortal.ServerApi {
    interface IServerUser extends IUser {
        lastSignIn?: string;
        maxSiteRole: string;
        siteCount: number;
    }
}
declare module VizPortal {
    class ServerUsers extends Resource<ServerApi.IServerUser> {
        private ErrorNotifyingServer;
        private $q;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory, $q: ng.IQService);
        getUserByUsernameAndDomain(username: string, domainName: string): ng.IPromise<ServerApi.IServerUser>;
        getByUserIds(userIds: string[]): ng.IPromise<ListResult<ServerApi.IServerUser>>;
        getUserCountsByMaxSiteRole(baseQuery: ResourceQuery<ServerApi.IServerUser>): ng.IPromise<_.Dictionary<number>>;
        getUserSettings(username: string, domain: string): ng.IPromise<ServerApi.IGetUserSettingsResult>;
        getUserRefreshTokenCount(username: string, domain: string): ng.IPromise<number>;
        getUserConnectedDevices(userId: string): ng.IPromise<ServerApi.IConnectedDevice[]>;
        deleteUserConnectedDevices(userId: string, deviceIds: string[]): ng.IPromise<ServerApi.IResult>;
        getSiteRoles(userIds: string[]): ng.IPromise<ServerApi.IGetUsersSiteRolesResult>;
        updateServerUsersSiteMembership(userIds: string[], addToSiteRoles: ServerApi.ISiteRole[], removeFromSiteIds: string[]): ng.IPromise<ServerApi.IUpdateServerUsersSiteMembershipResult>;
        updateServerAdminStatus(userIds: string[], admin: boolean): ng.IPromise<ServerApi.IResult>;
        deleteUsers(userIds: string[]): ng.IPromise<ServerApi.IUserActionResult>;
        importUsersFromActiveDirectory(usernames: string[]): ng.IPromise<ServerApi.IResult>;
        createLocalServerUser(username: string, displayName: string, email: string, password: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    module UsernameHelpers {
        function splitUsernames(usernamesText: string): string[];
    }
}
declare module VizPortal {
    class AddActiveDirectorySiteUsersDialogCtrl {
        private $scope;
        private $q;
        private $translate;
        private toaster;
        private serverAdminUpdateActionNotification;
        private siteRolesUpdateActionNotification;
        private siteUsers;
        private userActionNotification;
        static $inject: string[];
        constructor($scope: AddActiveDirectorySiteUsersDialogCtrl.Scope, $q: ng.IQService, $translate: ng.translate.ITranslateService, toaster: ToasterService, serverAdminUpdateActionNotification: ServerAdminUpdateActionNotification, siteRoles: SiteRoles, siteRolesUpdateActionNotification: SiteRolesUpdateActionNotification, siteUsers: SiteUsers, userActionNotification: UserActionNotification, availableQuota: number);
        private importUsers(userTextInput);
    }
    module AddActiveDirectorySiteUsersDialogCtrl {
        interface Scope extends ng.IScope {
            addActiveDirectoryUsers: (userTextInput: string) => void;
            busy: boolean;
            close: (result: any) => void;
            usersToAdd: string[];
            setSiteRole(role: string): void;
            siteUsers: SiteUsers;
            siteRole: string;
            siteRoleOptions: string[];
            availableQuota: number;
            isQuotaEnabledForSite: boolean;
            isSiteRoleOptionDisabled(siteRole: string): boolean;
        }
    }
}
declare module VizPortal {
    class SiteNameWithIds extends Resource<ServerApi.ISiteNameWithId> {
        static $inject: string[];
        constructor(FetcherFactory: FetcherFactory);
    }
}
declare module VizPortal {
    interface IUsersWithSiteRolesModel {
        users: Set<ServerApi.IServerUser>;
        userRoles: ServerApi.IUserRole[];
        serverAdmins: string[];
    }
    interface ISiteRoleChange {
        checkboxState?: string;
        siteRole?: string;
        siteName: string;
    }
    class SiteRolesPickerClientService {
        private $state;
        private $translate;
        private serverAdminUpdateActionNotification;
        private serverUsers;
        private toaster;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, serverAdminUpdateActionNotification: ServerAdminUpdateActionNotification, serverUsers: ServerUsers, toaster: ToasterService);
        siteRoleChangesToParams(userIds: string[], changes: _.Dictionary<ISiteRoleChange>): ServerApi.IUpdateServerUsersSiteMembershipParams;
        updateServerUsersSiteMembership(params: ServerApi.IUpdateServerUsersSiteMembershipParams): ng.IPromise<any>;
        updateServerAdmin(users: Set<IUserInfo>, newAdminState: boolean): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface ISiteRoleChanges {
        siteRoles: _.Dictionary<ISiteRoleChange>;
        serverAdmin: string;
    }
    var SiteMembershipDialogFilters: {
        AllSites: string;
        AssignedSites: string;
        SearchResults: string;
    };
    interface ISiteRolesPickerScope extends ng.IScope {
        adminCheckboxClicked(): void;
        adminCheckboxState(): string;
        changes: ISiteRoleChanges;
        checkboxClicked(site: ServerApi.ISiteNameWithId, colIndex?: number): void;
        checkboxState(site: ServerApi.ISiteNameWithId): string;
        isRowDirty(site: ServerApi.ISiteNameWithId): boolean;
        modifySiteRolesDisabled(): boolean;
        setSiteRole(site: ServerApi.ISiteNameWithId, siteRole: string): void;
        siteNames: ISliceable<ServerApi.ISiteNameWithId>;
        sliceable: ISliceable<ServerApi.ISiteNameWithId>;
        siteRole(site: ServerApi.ISiteNameWithId): string;
        submitSearch: (searchText: string, $event?: JQueryEventObject) => void;
        siteFilters: string[];
        siteFilter: SiteRolesPickerCtrl.IFilter;
        lastSiteFilter: string;
        searchInput: SiteRolesPickerCtrl.ISearchInput;
        needsAssignedSitesRefresh: boolean;
        refreshAssignedSites: () => void;
        emptyTemplateModel: IEmptyTemplateModel;
        columnWidths: IColumnWidths;
        selectCtrl: {
            options: string[];
        };
        usersWithSiteRoles: IUsersWithSiteRolesModel;
    }
    class SiteRolesPickerCtrl {
        private $scope;
        private serverService;
        private siteNamesResource;
        private sliceableFactory;
        static $inject: string[];
        private userCountsAndRolesBySiteId;
        private numSelectedUsers;
        private numSelectedServerAdmins;
        private originalAdminState;
        private uncheckedAssignedSites;
        constructor($scope: ISiteRolesPickerScope, serverService: ServerService, siteNamesResource: SiteNameWithIds, BrowserSupportService: BrowserSupportService, sliceableFactory: SliceableFactory);
        static adminStateFromUsers(adminCount: number, totalUsersCount: number): string;
        private updateAdminState(newState);
        private checkboxStateWithoutAdmin(site);
        private getColumnWidths(index);
        private updateSiteFilters();
        private getAssignedSitesList();
        private updateModel();
        private static calculateUserCountsAndRolesBySite(userRoles);
        private updateSelectedUserCounts();
        private getOriginalCheckboxStateForSite(siteId);
    }
    module SiteRolesPickerCtrl {
        interface IFilter {
            selection: string;
        }
        interface ISearchInput {
            text: string;
        }
    }
}
declare module VizPortal {
    class AddActiveDirectoryServerUsersDialogCtrl {
        private $scope;
        private $q;
        private $translate;
        private toaster;
        private serverAdminUpdateActionNotification;
        private siteMembershipUpdateActionNotification;
        private rolesPickerClient;
        private serverUsers;
        private userActionNotification;
        static $inject: string[];
        constructor($scope: AddActiveDirectoryServerUsersDialogCtrl.Scope, $q: ng.IQService, $translate: ng.translate.ITranslateService, toaster: ToasterService, serverAdminUpdateActionNotification: ServerAdminUpdateActionNotification, siteMembershipUpdateActionNotification: SiteMembershipUpdateActionNotification, siteRoles: SiteRoles, rolesPickerClient: SiteRolesPickerClientService, serverUsers: ServerUsers, userActionNotification: UserActionNotification);
        private importUsers(userTextInput);
        /**
        * adds the users that were sucessfully created on the server to any sites and roles (including server admin)
        * that were selected in the site roles picker.
        */
        private setRoles(users);
        private updateServerAdmin(users);
        private updateSiteMembership(users);
    }
    module AddActiveDirectoryServerUsersDialogCtrl {
        interface Scope extends ng.IScope {
            addActiveDirectoryUsers: (userTextInput: string) => void;
            busy: boolean;
            close: (result: any) => void;
            usersToAdd: string[];
            siteRoleChanges: ISiteRoleChanges;
            serverUsers: ServerUsers;
        }
    }
}
declare module VizPortal {
    class AddActiveDirectoryUsersAction {
        private $translate;
        private ConfirmActionDialog;
        private modal;
        private siteUsers;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, modal: ModalService, siteUsers: SiteUsers);
        showAddActiveDirectoryUsersToSiteDialog(dialogScope: ng.IScope): ng.IPromise<any>;
        showAddActiveDirectoryUsersToServerDialog(dialogScope: ng.IScope): ng.IPromise<any>;
    }
}
declare module VizPortal {
    module EmailValidationHelper {
        function isValidEmail(email: string): boolean;
        function getInvalidEmails(emails: string[]): string[];
    }
}
declare module VizPortal {
    class AddExternalUsersAction {
        private $translate;
        private $q;
        private ConfirmActionDialog;
        private Toaster;
        private SiteUsers;
        private SiteRolesUpdateActionNotification;
        private Server;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, ConfirmActionDialog: ConfirmActionDialog, Toaster: ToasterService, SiteUsers: SiteUsers, SiteRolesUpdateActionNotification: SiteRolesUpdateActionNotification, Server: ServerService);
        showAddExternalUsersToSiteDialog(dialogScope: ng.IScope): ng.IPromise<any>;
        private configureScope(dialogScope);
        private handleImportResult(result, addUserScope);
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IServerUserInfo extends IUserInfo {
        lastSignIn?: string;
        maxSiteRole: string;
        siteCount: number;
    }
}
declare module VizPortal {
    var SiteRolesEvent: {
        SiteRolesChanged: string;
    };
    interface ISiteMembershipDialogScope extends ng.IScope {
        applyCancelButtons: IApplyCancelButtons;
        busy: boolean;
        changes: ISiteRoleChanges;
        close: (result: any) => void;
        dismiss: (reason?: any) => void;
        editSiteMembershipDescription: string;
        haveSelectedUsers(): boolean;
        users: Set<ServerApi.IServerUser>;
        usersWithSiteRoles: IUsersWithSiteRolesModel;
    }
    class SiteMembershipDialogCtrl {
        private $scope;
        private $q;
        private $translate;
        private serverUsers;
        private siteMembershipUpdateActionNotification;
        private rolesPickerClient;
        private toaster;
        static $inject: string[];
        constructor($scope: ISiteMembershipDialogScope, $q: ng.IQService, $translate: ng.translate.ITranslateService, serverUsers: ServerUsers, siteMembershipUpdateActionNotification: SiteMembershipUpdateActionNotification, rolesPickerClient: SiteRolesPickerClientService, toaster: ToasterService);
        private apply();
        private getServerAdminCount();
        private isDirty();
        private updateServerAdmin(users);
        private updateSiteMembership(users);
        private getSiteRolesForSelectedUsers();
        private getServerAdmins(userIds);
    }
}
declare module VizPortal {
    class SetOfUsers extends Set<IUserInfo> {
        private static usernameSelector;
        constructor();
        static singleton(user: IUserInfo): SetOfUsers;
    }
}
declare module VizPortal.ServerApi {
    interface IUserNameAvailability {
        username: string;
        existsOnServer?: boolean;
        existsOnSite?: boolean;
        displayName: string;
    }
    interface ICheckUserNamesParams {
        usernames: string[];
    }
    interface ICheckUserNamesResult extends IResult {
        users: IUserNameAvailability[];
    }
    class CheckUserNamesRequest extends Request<ICheckUserNamesParams, ICheckUserNamesResult> {
        constructor(params: ICheckUserNamesParams);
    }
}
declare module VizPortal {
    class Users extends Resource<ServerApi.IUser> {
        private server;
        static AdminsOnlyFilter: ServerApi.IStringArrayValuedFieldFilterClause;
        static WithoutGuestFilter: ServerApi.IStringArrayValuedFieldFilterClause;
        static $inject: string[];
        constructor(server: ServerService, FetcherFactory: FetcherFactory);
        checkUserNames(usernames: string[]): ng.IPromise<ServerApi.ICheckUserNamesResult>;
        getUserByUsernameAndDomain(username: string, domainName: string): ng.IPromise<any>;
    }
}
declare module VizPortal {
    var AddLocalUserFormState: {
        Initial: string;
        NewUser: string;
        OtherSite: string;
        NotAvailable: string;
    };
    interface IFormModel {
        username: string;
        formState: string;
        errorText: string;
        newUserFlowModel: INewUserFlowModel;
        otherSiteFlowModel: IOtherSiteFlowModel;
        notAvailableFlowModel: INotAvailableFlowModel;
    }
    interface INewUserFlowModel {
        displayName: string;
        password: string;
        confirmPassword: string;
        email: string;
        usernameInfo: string;
    }
    interface IOtherSiteFlowModel {
        displayName: string;
        warningText: string;
        proceedClicked: boolean;
    }
    interface INotAvailableFlowModel {
        displayName: string;
        errorText: string;
    }
    interface IAddLocalUserDialogScope extends ng.IScope {
        addLocalUserForm: ng.IFormController;
        busy: boolean;
        checkDoesUsernameExists: (username: string) => void;
        close: (result: any) => void;
        confirm: () => void;
        confirmLabel: () => string;
        formModel: IFormModel;
        isConfirmDisabled: () => boolean;
        isServerMode: () => boolean;
        isSiteMode: () => boolean;
        mode: string;
        proceed(): void;
        proceedClicked(): boolean;
        passwordFieldsAreNonEmpty: () => boolean;
        siteRoleChanges: ISiteRoleChanges;
        setSiteRole(role: string): void;
        siteRoleOptions: string[];
        siteRole: string;
        availableQuota: number;
        isQuotaEnabledForSite: boolean;
        isSiteRoleOptionDisabled(siteRole: string): boolean;
    }
    class AddLocalUserDialogCtrl {
        private $scope;
        private $q;
        private $translate;
        private addUserToSiteActionNotification;
        private userActionNotification;
        private mode;
        private ServerUsers;
        private serverAdminUpdateActionNotification;
        private siteMembershipUpdateActionNotification;
        private siteRoles;
        private rolesPickerClient;
        private siteRolesUpdateActionNotification;
        private SiteUsers;
        private toaster;
        private Users;
        private availableQuota;
        static $inject: string[];
        constructor($scope: IAddLocalUserDialogScope, $q: ng.IQService, $translate: ng.translate.ITranslateService, addUserToSiteActionNotification: AddUserToSiteActionNotification, userActionNotification: UserActionNotification, mode: string, ServerUsers: ServerUsers, serverAdminUpdateActionNotification: ServerAdminUpdateActionNotification, siteMembershipUpdateActionNotification: SiteMembershipUpdateActionNotification, siteRoles: SiteRoles, rolesPickerClient: SiteRolesPickerClientService, siteRolesUpdateActionNotification: SiteRolesUpdateActionNotification, SiteUsers: SiteUsers, toaster: ToasterService, Users: Users, availableQuota: number);
        private setupFormForAddUserToSite(displayName);
        private setupFormForNotAvailable(displayName, errorStringId);
        private setupFormForAvailable();
        private confirm();
        private isConfirmDisabled();
        private createLocalSiteUser(username, model);
        private createLocalServerUser(username, model);
        private onServerUserCreateSuccess(result);
        private updateServerAdmin(user);
        private updateSiteMembership(userId, authUserId, username, userDisplayName);
        private updateSiteRole(user);
        private addUserToSite(username, model);
        private promoteToServerAdmin(username);
        private reenableButtons();
        private getFormState();
        private showNotificationForCreateUser(result);
        private showNotificationForAddUserToSite(result, username, siteRole);
        private isNewUserFlow();
        private getNewUserFlowModel();
        private isOtherSiteFlow();
        private getOtherSiteFlowModel();
        private getNotAvailableFlowModel();
    }
}
declare module VizPortal {
    class AddLocalUserAction {
        private modal;
        private siteUsers;
        static $inject: string[];
        constructor(modal: ModalService, siteUsers: SiteUsers);
        showAddLocalUserDialogForSite(dialogScope: ng.IScope): ng.IPromise<any>;
        showAddLocalUserDialogForServer(dialogScope: ng.IScope): ng.IPromise<any>;
    }
}
declare module VizPortal {
    var UserAddedEvent: string;
    class AddUsersOptionsAction {
        private modal;
        private serverService;
        static $inject: string[];
        constructor(modal: ModalService, serverService: ServerService);
        showAddSiteUsersOptionsDialog(context: IActionContext): ng.IPromise<any>;
        showAddServerUsersOptionsDialog(context: IActionContext): ng.IPromise<any>;
        private createDialogInstance(context, controller);
    }
    interface IAddUsersOptionsDialogScope extends ng.IScope {
        title: string;
        addLocalUser(): void;
        importAdUser(): void;
        importAdGroup?(): void;
        importFromBulk(): void;
        importExternalUser(): void;
        close: (result: any) => void;
        options: IModalOptions;
    }
    class AddSiteUsersOptionsDialogCtrl {
        static $inject: string[];
        constructor($scope: IAddUsersOptionsDialogScope, addLocalUserAction: AddLocalUserAction, activeDirectoryGroupAction: ActiveDirectoryGroupAction, addActiveDirectoryUsersAction: AddActiveDirectoryUsersAction, addExternalUsersAction: AddExternalUsersAction, bulkImportUsersAction: BulkImportUsersAction, domainFamily: string);
    }
    class AddServerUsersOptionsDialogCtrl {
        static $inject: string[];
        constructor($scope: IAddUsersOptionsDialogScope, addLocalUserAction: AddLocalUserAction, addActiveDirectoryUsersAction: AddActiveDirectoryUsersAction, bulkImportUsersAction: BulkImportUsersAction, domainFamily: string);
    }
}
declare module VizPortal {
    class EditSiteMembershipAction {
        private modalService;
        static $inject: string[];
        constructor(modalService: ModalService);
        showEditSiteMembershipDialog(users: Set<IServerUserInfo>, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class ServerUsersActions {
        private DeleteUsersFromServerAction;
        private EditSiteMembershipAction;
        private serverService;
        private serverUsersActionDefinition;
        static $inject: string[];
        constructor(DeleteUsersFromServerAction: DeleteUsersFromServerAction, EditSiteMembershipAction: EditSiteMembershipAction, serverService: ServerService);
        getServerUsersActionsButtons(): IActionButton<any>[];
        private editSiteMembershipAction();
        private canEditSiteMembership(serverUsers);
        private deleteUsersFromServerAction();
        private canDelete(serverUsers);
        private static isSingleSelectAndGuest(serverUsers);
    }
}
declare module VizPortal {
    interface IServerUsersPlaceScope extends IMainScope, IPlaceTitleScope, IActionButtonsScope, IFilterPanelContainerScope {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        model: ITabsBannerModel;
        headerClicked(header: ITemplate): any;
        refreshItems: () => void;
        rowClicked(row: ServerApi.IServerUser, colIndex: number): any;
        selectedItems: Set<ServerApi.IServerUser>;
        server: ServerService;
        sliceable: ISliceable<ServerApi.IServerUser>;
        sliceChanged: (newSlice: ListResult<ServerApi.IServerUser>) => any;
        sorter: Sorter;
        emptyTemplateModel: IEmptyTemplateModel;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    class ServerUsersPlaceCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private siteRoleFilter;
        private serverService;
        private users;
        static $inject: string[];
        private maxSiteRoleFilterDefinition;
        private static emptyTemplateModel;
        constructor($scope: IServerUsersPlaceScope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, siteRoleFilter: ISiteRoleFilter, addUsersOptionsAction: AddUsersOptionsAction, BrowserTitleService: BrowserTitleService, queryService: QueryService, selectionService: SelectionService, serverService: ServerService, users: ServerUsers, serverUsersActions: ServerUsersActions, sorterFactory: SorterFactory, filterPanelService: FilterPanelService);
        private configureForReactDataGrid(actions);
        private updateMaxSiteRoleCounts(baseQuery);
    }
}
declare module VizPortal {
    class ServerSettings {
        private server;
        static $inject: string[];
        constructor(server: ServerService);
        fetch(): ng.IPromise<ServerApi.IEditableServerSettings>;
        updateBoolean(setting: string, value: boolean): ng.IPromise<ServerApi.IUpdateBooleanServerSettingResult>;
        updateString(setting: string, value: string): ng.IPromise<ServerApi.IUpdateStringServerSettingResult>;
        updateScheduleFrequency(setting: string, value: ServerApi.IScheduleFrequency): ng.IPromise<ServerApi.IUpdateScheduleFrequencyServerSettingResult>;
    }
}
declare module VizPortal.ServerApi {
    interface IEditableServerSettings {
        activeDirectorySyncScheduleFrequency?: IScheduleFrequency;
        defaultLanguage?: string;
        defaultLocale?: string;
        defaultStartPage?: string;
        embeddedCredentialsEnabled?: boolean;
        guestEnabled?: boolean;
        refreshTokenEnabled?: boolean;
        scheduledActiveDirectorySyncEnabled?: boolean;
        schedulingEnabled?: boolean;
        savedAccessTokensEnabled?: boolean;
        savedPasswordsEnabled?: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IClearConnectedDevicesParams {
        userId: string;
    }
    interface IClearConnectedDevicesResult extends IResult {
    }
    class ClearConnectedDevicesRequest extends Request<IClearConnectedDevicesParams, IClearConnectedDevicesResult> {
        constructor(params: IClearConnectedDevicesParams);
    }
}
declare module VizPortal {
    class ClearConnectedDevicesAction {
        private $translate;
        private $q;
        private ConfirmActionDialog;
        private serverService;
        private ToasterService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, ConfirmActionDialog: ConfirmActionDialog, serverService: ServerService, ToasterService: ToasterService);
        showConfirmationDialog(userId: string, userRefreshTokenCount: number): ng.IPromise<any>;
    }
}
declare module VizPortal.ServerApi {
    interface IChangeUserPasswordParams {
        userId: string;
        oldEncryptedPassword?: string;
        newEncryptedPassword: string;
        keyId: string;
    }
    interface IChangeUserPasswordResult {
    }
    class ChangeUserPasswordRequest extends Request<IChangeUserPasswordParams, IChangeUserPasswordResult> {
        constructor(params: IChangeUserPasswordParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserEmailParams {
        userId: string;
        email: string;
    }
    class UpdateUserEmailRequest extends Request<IUpdateUserEmailParams, IResult> {
        constructor(params: IUpdateUserEmailParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserDisplayNameParams {
        userId: string;
        displayName: string;
    }
    class UpdateUserDisplayNameRequest extends Request<IUpdateUserDisplayNameParams, IResult> {
        constructor(params: IUpdateUserDisplayNameParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserLanguageParams {
        userId: string;
        language: string;
    }
    class UpdateUserLanguageRequest extends Request<IUpdateUserLanguageParams, IResult> {
        constructor(params: IUpdateUserLanguageParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserLocaleParams {
        userId: string;
        locale: string;
    }
    class UpdateUserLocaleRequest extends Request<IUpdateUserLocaleParams, IResult> {
        constructor(params: IUpdateUserLocaleParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateUserStartPageParams {
        userId?: string;
        startPage: string;
    }
    class UpdateUserStartPageRequest extends Request<IUpdateUserStartPageParams, IResult> {
        constructor(params: IUpdateUserStartPageParams);
    }
}
declare module VizPortal {
    class UserSettings {
        private ErrorNotifyingServer;
        static $inject: string[];
        private static ResetStartPage;
        static SameUserId: string;
        private server;
        constructor(ErrorNotifyingServer: ErrorNotifyingServer);
        updateUserDisplayName(userId: string, displayName: string): ng.IPromise<any>;
        updateUserEmail(userId: string, email: string): ng.IPromise<any>;
        updateUserEmailAndDelay(userId: string, email: string): ng.IPromise<any>;
        updateUserLanguage(userId: string, language: string): ng.IPromise<any>;
        updateUserLocale(userId: string, locale: string): ng.IPromise<any>;
        updateUserStartPage(userId: string, startPage: string): ng.IPromise<any>;
        updateCurrentUsersStartPage(startPage: string): ng.IPromise<any>;
        resetUserStartPage(userId: string): ng.IPromise<any>;
        changeUserPassword(userId: string, newPassword: string, oldPassword?: string): ng.IPromise<ServerApi.IChangeUserPasswordResult>;
    }
}
declare module VizPortal {
    class UserSettingsActions {
        private $translate;
        private toaster;
        private userSettings;
        private confirmActionDialog;
        private startPageService;
        private server;
        static FetchUserSettingsActionType: string;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, userSettings: UserSettings, confirmActionDialog: ConfirmActionDialog, startPageService: StartPageService, server: ServerService);
        updateStartPage(userInfo: IUserInfo, startPage: string): ng.IPromise<ServerApi.IResult>;
        confirmChangeUserStartPage(): void;
        confirmChangeDefaultStartPage(): void;
        updateCurrentUsersStartPage(startPage: string): ng.IPromise<ServerApi.IResult>;
        resetStartPage(user: IUserInfo): ng.IPromise<ServerApi.IResult>;
        fetchUserSettings(username: string, domain: string): void;
        fetchCurrentUsersUserSettings(): void;
    }
}
declare module VizPortal {
    /**
     * Store to interact with user settings. At this time, most part of the application still depend on
     * {@link VizPortal.UserSettings}.
     *
     * NOTE:  The long term goal is that the store should be the only one interacting with that service.
     *        Other components would simply listen for the 'user-settings-change' event and take action accordingly.
     */
    class UserSettingsStore extends VizPortalReact.Store<UserSettingsStore.ChangeListener> {
        private $q;
        private serverService;
        private serverUsers;
        private userSettings;
        static ChangeEvent: string;
        static $inject: string[];
        constructor($q: ng.IQService, serverService: ServerService, serverUsers: ServerUsers, userSettings: UserSettings);
        getUserSettings(username: string, domain: string): ng.IPromise<IUserSettings>;
        private fetchUserSettings(username, domain);
        handleAction(action: UserSettingsStore.Payload): void;
        private maybeRefreshSessionInfo(username, domain);
    }
    module UserSettingsStore {
        interface Payload extends VizPortalReact.Dispatcher.Payload {
            startPage: string;
            username: string;
            domain: string;
        }
        interface Change {
            username: string;
            domain: string;
            userSettings: UserSettings;
        }
        interface ChangeListener {
            (changeEvent: string, userSettingsChange: UserSettingsStore.Change): any;
        }
    }
}
declare module VizPortal {
    class UserSettingsCtrlCommon {
        private $q;
        private $state;
        private $translate;
        private clearConnectedDevicesAction;
        private serverService;
        private startPageService;
        private serverSettings;
        private userSettingsStore;
        static $inject: string[];
        constructor($q: ng.IQService, $state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, clearConnectedDevicesAction: ClearConnectedDevicesAction, serverService: ServerService, startPageService: StartPageService, serverSettings: ServerSettings, userSettingsStore: UserSettingsStore);
        private scope;
        initScope(scope: UserSettingsCtrlCommon.Scope, isViewerSelf: boolean, serverUser: IServerUserInfo, siteUser: ISiteUserInfo, userSettings: IUserSettings, userRefreshTokenCount: number): void;
        private updateUserSettingsOnScope(userSettings);
        private isSameUser(userSettingsChange);
        private setupUserSettingsChangeListener();
    }
    module UserSettingsCtrlCommon {
        interface Scope extends ng.IScope {
            clearConnectedDevices(): void;
            disableNameAndEmailSaveButton: () => boolean;
            serverUser: IServerUserInfo;
            isDomainFamilyAD: boolean;
            isDomainFamilyExternal: boolean;
            isDomainFamilyLocal: boolean;
            isLocalAuth: boolean;
            isViewerSelf: boolean;
            isViewerServerAdmin: boolean;
            userSettings: IUserSettings;
            startPageText: string;
            startPageHref: string;
            userSettingsUpdated(): void;
            onAfterStartPageReset(): void;
            changePasswordUrl: string;
            saveChangesToEmailAndDisplayName(): void;
            updateDisplayNameAllowed: boolean;
            updateUserStartPage(startPage: string): void;
            controls: {
                editDisplayNameControls: IEditDisplayNameControls;
                editEmailControls: IEditEmailControls;
            };
            delayUpdateEmailRequest: boolean;
        }
    }
}
declare module VizPortal {
    class ServerUserSettingsSubplaceCtrl {
        private $scope;
        private userSettingsCtrlCommon;
        static $inject: string[];
        constructor($scope: ServerUserSettingsSubplaceCtrl.Scope, BrowserTitleService: BrowserTitleService, userSettingsCtrlCommon: UserSettingsCtrlCommon, isSessionUserSelf: boolean, userSettings: IUserSettings, userRefreshTokenCount: number, serverUser: IServerUserInfo);
    }
    module ServerUserSettingsSubplaceCtrl {
        interface Scope extends UserSettingsCtrlCommon.Scope {
        }
    }
}
declare module VizPortal {
    interface IObjectNameScope extends ng.IScope {
        objectName: string;
    }
    function setBrowserTitleCtrl(place: string): (string | (($scope: IObjectNameScope, BrowserTitleService: BrowserTitleService) => void))[];
}
declare module VizPortal {
    interface ISignedOutScope extends ng.IScope {
        tryAgainLink: string;
    }
    class SignedOutCtrl {
        static $inject: string[];
        constructor($scope: ISignedOutScope, $state: ng.ui.IStateService, externalAuthService: ExternalAuthService, server: ServerService);
    }
}
declare module VizPortal {
    interface ILocLinkifierFilter {
        (value: ILocLinkifierModel): string;
    }
    class LinkTargetAttributes {
        static Blank: string;
        static Self: string;
        static Parent: string;
        static Top: string;
    }
    interface ILocLinkifierModel {
        localizedStatement?: string;
        localizedStatementKey?: string;
        links?: ILocLinkifierLinkModel[];
    }
    interface ILocLinkifierLinkModel {
        key?: string;
        localizedValue?: string;
        localizedValueKey?: string;
        url: string;
        target?: string;
    }
}
declare module VizPortal {
    var CookieKeys: {
        XsrfToken: string;
    };
    interface IVizPortalCookies extends ng.cookies.ICookiesService {
        [key: string]: string;
    }
}
declare module VizPortal.ServerApi {
    interface ISiteSAMLConfiguration {
        enabled: boolean;
        serviceProviderEntityId: string;
        acsUrl: string;
        testLoginUrl: string;
        certificateUrl: string;
        identityProviderEntityId: string;
        downloadLogEndpoint: string;
        ssoServiceURL: string;
        isSingleLogoutSupported: boolean;
        siteSAMLAttributeMapping: ISiteSAMLAttributeMapping;
    }
    interface ISiteSAMLAttributeMapping {
        emailMapping: string;
        firstNameMapping: string;
        lastNameMapping: string;
        fullNameMapping: string;
        useFullName: boolean;
    }
}
declare module VizPortal.ServerApi {
    interface IGetSiteSAMLConfigurationParams {
    }
    interface IGetSiteSAMLConfigurationResult {
        configuration: ISiteSAMLConfiguration;
    }
    class GetSiteSAMLConfigurationRequest extends Request<IGetSiteSAMLConfigurationParams, IGetSiteSAMLConfigurationResult> {
        constructor();
    }
}
declare module VizPortal.ServerApi {
    interface ISetSiteSAMLEnabledParams {
        enable: boolean;
    }
    class SetSiteSAMLEnabledRequest extends Request<ISetSiteSAMLEnabledParams, ISiteSAMLConfiguration> {
        constructor(params: ISetSiteSAMLEnabledParams);
    }
}
declare module VizPortal.ServerApi {
    class RemoveIdentityProviderRequest extends Request<{}, ISiteSAMLConfiguration> {
        constructor();
    }
}
declare module VizPortal.ServerApi {
    class SetSiteAttributeMappingRequest extends Request<ISiteSAMLAttributeMapping, ISiteSAMLConfiguration> {
        constructor(mapping: ISiteSAMLAttributeMapping);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateSiteSettingsForSiteAdminParams {
        id: string;
        siteAdminSettings: ISiteAdminSettings;
    }
    interface IUpdateSiteSettingsForSiteAdminResult {
    }
    class UpdateSiteSettingsForSiteAdminRequest extends Request<IUpdateSiteSettingsForSiteAdminParams, IUpdateSiteSettingsForSiteAdminResult> {
        constructor(params: IUpdateSiteSettingsForSiteAdminParams);
    }
}
declare module VizPortal {
    interface ISiteAuthenticationCtrlScope extends ng.IScope {
        configuration: ServerApi.ISiteSAMLConfiguration;
        siteSettingsForSiteAdmin: ServerApi.ISiteSettingsForSiteAdmin;
        isEnabled: () => boolean;
        isIdentityProviderConfigured: () => boolean;
        downloadLogUrl: () => string;
        download: (evt: Event, url: string) => void;
        openAddExternalUsersDialog: ($event: JQueryEventObject) => void;
        testLogin: () => void;
        entityIdFormUrl: () => string;
        returnUrl: () => string;
        setEnabled: (enable: boolean) => void;
        removeIdentityProvider: () => void;
        setSiteAttributeMapping: () => void;
        handleFormSubmitResult: (result: any) => void;
        endpoint: string;
        xsrfToken: string;
        allowed: boolean;
        contactCustomerSupport: () => ILocLinkifierModel;
    }
    class SiteAuthenticationCtrl {
        static $inject: string[];
        constructor($scope: ISiteAuthenticationCtrlScope, $translate: ng.translate.ITranslateService, $cookies: IVizPortalCookies, windowLocation: WindowLocationService, server: ServerService, configuration: ServerApi.ISiteSAMLConfiguration, siteSettingsForSiteAdmin: ServerApi.ISiteSettingsForSiteAdmin, toaster: ToasterService, addUsersOptionsAction: AddUsersOptionsAction, restApiPrefix: string);
    }
}
declare module VizPortal {
    interface ISitesPlaceScope extends IMainScope, IPlaceTitleScope, ISubplaceCountsScope {
    }
    class SitesPlaceCtrl {
        static $inject: string[];
        constructor($location: ng.ILocationService, $scope: ISitesPlaceScope, $state: ng.ui.IStateService, CreateSiteAction: CreateSiteAction, place: IPlace);
    }
}
declare module VizPortal {
    interface ISiteUsersPlaceScope extends IMainScope, IPlaceTitleScope, IActionButtonsScope, IFilterPanelContainerScope, IListScope<ServerApi.ISiteUser> {
        listActions: IListActionButton[];
        availableListAction: (listAction: IListActionButton) => boolean;
        headerClicked(header: ITemplate): any;
        model: ITabsBannerModel;
        multisite: boolean;
        server: ServerService;
        sliceable: ISliceable<ServerApi.ISiteUser>;
        sliceChanged: (newSlice: ListResult<ServerApi.ISiteUser>) => any;
        sorter: Sorter;
        rowClicked(row: ServerApi.ISiteUser, colIndex: number): any;
        thirdPartyAuthEditable: boolean;
        filterControls: IFilterControls;
        emptyTemplateModel: IEmptyTemplateModel;
        dataGridProps: VizPortalReact.DataGrid.Props;
        reactDataGridInSiteUsersPlace: boolean;
    }
    class SiteUsersPlaceCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private queryService;
        private serverService;
        private users;
        private angularContextFactory;
        static $inject: string[];
        private siteRoleFilterDefinition;
        constructor($scope: ISiteUsersPlaceScope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, addUsersOptionsAction: AddUsersOptionsAction, BrowserTitleService: BrowserTitleService, queryService: QueryService, selectionService: SelectionService, serverService: ServerService, canSessionUserManageUsers: boolean, users: SiteUsers, siteUsersActions: SiteUsersActions, sorterFactory: SorterFactory, angularContextFactory: AngularContextFactory, filterPanelService: FilterPanelService);
        private updateSiteRoleCounts(baseQuery);
        private configureForReactDataGrid();
        private createQueryUpdater();
        private dataGridColumns($scope);
    }
}
declare module VizPortalReact {
    module SubscriptionGrid {
        function columns(translate: IReactTranslateService, scope: DataGridCells.ISelectedItemsScope, actions: VizPortal.IActionButton<any>[], isServerPage: boolean, serverUrls: ServerUrls, siteUrls: SiteUrls, scheduleFrequencyDescriptionFilter: VizPortal.IScheduleFrequencyDescriptionFilter, showUserNameColumn: boolean, showHasSubscriptionColumn: boolean, showWorkbookViewColumn: boolean, showScheduleColumn: boolean, showSiteColumn: boolean): VizPortalReact.DataGrid.Column[];
    }
}
declare module VizPortal {
    class DeleteSubscriptionsAction {
        private ConfirmActionDialog;
        private ContentActionNotification;
        private $translate;
        private Subscriptions;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, Subscriptions: Subscriptions);
        deleteSubscriptions(subscriptions: Set<ISubscriptionInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(errorItem);
    }
}
declare module VizPortal {
    interface IChangeSubscriptionSubjectDialogScope extends ng.IScope {
        description: string;
        input: {
            text: string;
            maxLength?: number;
        };
    }
    class ChangeSubscriptionSubjectAction {
        private ConfirmActionDialog;
        private $translate;
        private toaster;
        private Subscriptions;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, $translate: ng.translate.ITranslateService, toaster: ToasterService, Subscriptions: Subscriptions);
        changeSubject(subscription: ISubscriptionInfo, context: IActionContext): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    interface ISubscriptionsScope extends ITasksScope, IActionButtonsScope {
        showUserNameColumn: boolean;
        showHasSubscriptionColumn: boolean;
        showWorkbookViewColumn: boolean;
        sorter: Sorter;
        selectedItems: Set<ISubscriptionInfo>;
        sliceable: ISliceable<ISubscriptionInfo>;
        rowClicked(row: ISubscriptionInfo, colIndex: number): any;
        headerClicked(header: ITemplate): any;
        sliceChanged(newSlice: ListResult<ISubscriptionInfo>): any;
        objectName: string;
        emptyTemplateModel: IEmptyTemplateModel;
        useReactDataGrid: boolean;
        dataGridProps: VizPortalReact.DataGrid.Props;
    }
    class SubscriptionsCtrl {
        private $scope;
        private $translate;
        private AngularToReactDataGridBridge;
        private $state;
        private $filter;
        private ServerService;
        private DeleteSubscriptionsAction;
        private changeScheduleAction;
        private ChangeSubscriptionSubjectAction;
        static $inject: string[];
        private query;
        private static emptyTemplateModel;
        constructor($scope: ISubscriptionsScope, $translate: ng.translate.ITranslateService, AngularToReactDataGridBridge: VizPortalReact.AngularToReactDataGridBridge, $state: ng.ui.IStateService, $filter: ng.IFilterService, BrowserTitleService: BrowserTitleService, subplace: ISubplace<ISubscriptionInfo>, queryService: QueryService, selectionService: SelectionService, sorterFactory: SorterFactory, ServerService: ServerService, DeleteSubscriptionsAction: DeleteSubscriptionsAction, changeScheduleAction: ChangeScheduleAction, ChangeSubscriptionSubjectAction: ChangeSubscriptionSubjectAction);
        private isServerPage();
        private showUserNameColumn();
        private showHasSubscriptionColumn();
        private showWorkbookViewColumn();
        private showScheduleColumn();
        private showSiteColumn();
        private configureForReactDataGrid(actions);
        private createActions(selectedItems);
        private isCreatorOrAdminOnly(subscription);
        private refreshSubscriptions();
    }
}
declare module VizPortalReact {
    class ServerUrls {
        private prefix;
        constructor(queryString: string);
        sitesUrl(): string;
        usersUrl(): string;
        schedule(scheduleId: string, scheduledAction: string): string;
        schedules(): string;
        tasks(): string;
        status(): string;
        settings(): string;
        userSettingsUrl(user: VizPortal.IUserInfo): string;
    }
}
declare module VizPortalReact {
    module HeaderStyles {
        var bluePalette: boolean;
        var LetterSpacing: string;
        var MenuPanelStyle: {
            width: number;
            height: number;
            backgroundColor: string;
            borderWidth: number;
            borderColor: string;
            borderStyle: string;
            fontSize: number;
            position: string;
        };
        var AlertsCountFontSize: string;
        var HeaderDividerImage: string;
        var SiteSwitcherDropdownRestImage: string;
        var SiteSwitcherDropdownHoverImage: string;
        var HeaderBackgroundColor: string;
        var HeaderLinkSelectedColor: string;
        var HeaderLinkSelectedBackgroundColor: string;
        var HeaderLinkHoverBackgroundColor: string;
        var SiteSwitcherRestColor: string;
        var SiteSwitcherHoverColor: string;
        var HoverOpacity: number;
        var RestOpacity: number;
        var SiteSwitcherHoverOpacity: number;
        var SiteSwitcherRestOpacity: number;
    }
}
declare module VizPortalReact {
    class HeaderLink extends React.Component<HeaderLink.Props, HeaderLink.State> {
        static displayName: string;
        static element: React.Factory<HeaderLink.Props>;
        private static linkStyle;
        private boundMouseEnter;
        private boundMouseLeave;
        state: HeaderLink.State;
        constructor(props: HeaderLink.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module HeaderLink {
        interface Props extends React.Props<HeaderLink> {
            label: string;
            url: string;
            isSelected: boolean;
            style?: any;
        }
        interface State {
            hovered: boolean;
        }
    }
}
declare module VizPortalReact {
    class Navigation extends React.Component<Navigation.Props, any> {
        static displayName: string;
        static element: React.Factory<Navigation.Props>;
        private static linkPadding;
        private static linkStyle;
        private static containerStyle;
        render(): React.DOMElement<React.HTMLAttributes>;
        private siteLinks();
        private serverLinks();
    }
    module Navigation {
        interface Props extends React.Props<Navigation> {
            translate: IReactTranslateService;
            siteUrls: SiteUrls;
            serverUrls: ServerUrls;
            currentLocation: Location;
            hideRightDivider?: boolean;
        }
        interface State {
        }
        function isServerLocation(location: Location): boolean;
        enum Location {
            Unknown = 0,
            SiteHome = 1,
            SiteContent = 2,
            SiteUsers = 3,
            SiteGroups = 4,
            SiteSchedules = 5,
            SiteTasks = 6,
            SiteStatus = 7,
            SiteSettings = 8,
            ServerSites = 9,
            ServerUsers = 10,
            ServerSchedules = 11,
            ServerTasks = 12,
            ServerStatus = 13,
            ServerSettings = 14,
        }
    }
}
declare module VizPortal.ServerApi {
    interface IAlert {
        id: string;
        statusCode: string;
        taskId: string;
        mostRecentFailureAt: string;
        lastSuccessAt: string;
        datasourceId: string;
        alertType: string;
        affectedWorkbookIds: string[];
        suspended: boolean;
        consecutiveFailureCount: number;
    }
    interface IAlertList {
        totalCount: number;
        alerts: IAlert[];
        datasources?: INamedItem[];
        workbooks?: INamedItem[];
    }
}
declare module VizPortal.ServerApi {
    var AlertTarget: {
        datasource: string;
        workbook: string;
    };
    interface IGetAlertParams {
        targetId: string;
        targetType: string;
    }
    interface IGetAlertResult extends IAlertList {
    }
    class GetAlertRequest extends Request<IGetAlertParams, IGetAlertResult> {
        constructor(params: IGetAlertParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserAlertListParams {
    }
    interface IGetUserAlertListResult extends IAlertList {
    }
    class GetUserAlertListRequest extends Request<IGetUserAlertListParams, IGetUserAlertListResult> {
        constructor(params?: IGetUserAlertListParams);
    }
}
declare module VizPortal {
    class Alerts {
        private ServerService;
        static $inject: string[];
        constructor(ServerService: ServerService);
        getCount(): ng.IPromise<number>;
        getList(): ng.IPromise<IAlertListInfo>;
        getForDatasource(id: string): ng.IPromise<IAlertListInfo>;
        getForWorkbook(id: string): ng.IPromise<IAlertListInfo>;
        getForType(type: string, id: string): ng.IPromise<IAlertListInfo>;
    }
}
declare module VizPortal.ServerApi {
    interface IGetGettingStartedNotificationsParams {
        checkUserPrefs: boolean;
    }
    interface IGetGettingStartedNotificationsResult extends IResult {
        contentUrl: string;
    }
    class GetGettingStartedNotificationsRequest extends Request<IGetGettingStartedNotificationsParams, IGetGettingStartedNotificationsResult> {
        constructor(params: IGetGettingStartedNotificationsParams);
    }
    interface ISetSuppressGettingStartedNotificationParams {
        suppressGettingStartedNotifications: boolean;
    }
    class SetSuppressGettingStartedNotification extends Request<ISetSuppressGettingStartedNotificationParams, IResult> {
        constructor(params: ISetSuppressGettingStartedNotificationParams);
    }
}
declare module VizPortal {
    class GettingStartedNotifications {
        private $sce;
        private $q;
        private $window;
        private $rootScope;
        private $state;
        private modal;
        private ServerService;
        private static CloseModalMessage;
        private notificationsEnabled;
        private notificationsShown;
        static $inject: string[];
        constructor($sce: ng.ISCEService, $q: ng.IQService, $window: ng.IWindowService, $rootScope: ng.IScope, $state: ng.ui.IStateService, modal: ModalService, ServerService: ServerService);
        enableNotifications(): void;
        forceShowNotifications(): ng.IPromise<any>;
        showNotificationsIfEnabled(): ng.IPromise<any>;
        shouldShowGettingStartedLink(): ng.IPromise<boolean>;
        private showNotifications(params);
        private getHostName(url);
        private fetchNotificationsUrl(params);
        private updateUserPreference(scope);
    }
}
declare module VizPortal {
    interface ILogo {
        image: string;
        width: number;
        height: number;
        href: string;
        title: string;
    }
    class LogoService {
        private server;
        private startPageService;
        private static DefaultSignInLogoImage;
        private static DefaultSignInLogoWidth;
        private static DefaultSignInLogoHeight;
        private static DefaultTopBarLogoImage;
        private static DefaultTopBarLogoWidth;
        private static DefaultTopBarLogoHeight;
        private static MaximumLogoWidth;
        private static MaximumLogoHeight;
        private serverCustomization;
        private siteCustomization;
        private isSiteCustomizationEnabled;
        static $inject: string[];
        constructor(server: ServerService, startPageService: StartPageService);
        resetSiteLogoToDefault(): ng.IPromise<ServerApi.IResult>;
        uploadSiteLogo(file: File): ng.IPromise<ServerApi.IResult>;
        isUsingCustomSiteLogo(): boolean;
        getTopBarLogo(): ILogo;
        getServerTopBarLogo(): ILogo;
        getSignInLogo(): ILogo;
        private getStartPageHref();
        private getServerCustomLogo();
        private getSiteCustomLogo();
    }
}
declare module VizPortal {
    var TopBarEvents: {
        HeightChanged: string;
    };
    interface ITopBarScope extends ng.IScope {
        settings: ITopBarSettings;
        logo: () => ILogo;
        inServerArea(): boolean;
        serverUrl(): string;
        siteUrl(): string;
        showServerSiteButtons: () => boolean;
        showSiteSwitcher: () => boolean;
        showSiteControls: () => boolean;
        showNav: () => boolean;
        siteSelected(urlName: string): void;
        toggleCollapsed(): void;
        server: ServerService;
        topBarProps: VizPortalReact.TopBar.Props;
    }
    class TopBarCtrl {
        private $scope;
        private $state;
        private server;
        private $translate;
        private siteNames;
        private favorites;
        private angularContextFactory;
        private alerts;
        private extractTasks;
        private userSettingsActions;
        private help;
        private gettingStartedNotifications;
        private modalService;
        private logoService;
        private datasources;
        private workbooks;
        private static VerticalPadding;
        private static NavHeight;
        private static MinTopBarHeight;
        private static stateNameToNavigationLocationMap;
        static $inject: string[];
        constructor($rootScope: ng.IRootScopeService, $scope: ITopBarScope, $state: ng.ui.IStateService, $timeout: ng.ITimeoutService, server: ServerService, SiteSwitchService: SiteSwitchService, LogoService: LogoService, $translate: ng.translate.ITranslateService, siteNames: SiteNameSansIds, favorites: Favorites, angularContextFactory: AngularContextFactory, alerts: Alerts, extractTasks: ExtractTasks, userSettingsActions: UserSettingsActions, help: HelpService, gettingStartedNotifications: GettingStartedNotifications, modalService: ModalService, logoService: LogoService, datasources: DataSources, workbooks: Workbooks);
        private configureReactTopBar();
        private topBarLocationFromState($state);
    }
}
declare module VizPortal {
}
declare module VizPortal.ServerApi {
    interface IUpdateCommentParams {
        id: string;
        text: string;
    }
    class UpdateCommentRequest extends Request<IUpdateCommentParams, IResult> {
        constructor(params: IUpdateCommentParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteCommentParams {
        id: string;
    }
    class DeleteCommentRequest extends Request<IDeleteCommentParams, IResult> {
        constructor(params: IDeleteCommentParams);
    }
}
declare module VizPortal.ServerApi {
    interface ICreateCommentParams {
        viewId: string;
        text: string;
    }
    class CreateCommentRequest extends Request<ICreateCommentParams, IResult> {
        constructor(params: ICreateCommentParams);
    }
}
declare module VizPortal {
    class Comments extends Resource<ICommentInfo> {
        private ErrorNotifyingServer;
        static $inject: string[];
        private commentFetcher;
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        createComment(viewId: string, text: string): ng.IPromise<ServerApi.IResult>;
        getSliceableCommentsForViz(viewId: string): ISliceable<VizPortal.ICommentInfo>;
        editComment(commentId: string, commentText: string): ng.IPromise<ServerApi.IResult>;
        deleteComment(commentId: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class DeleteCommentActions {
        private $translate;
        private ConfirmActionDialog;
        private Comments;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, Comments: Comments, toaster: ToasterService);
        deleteComment(commentToDelete: ICommentInfo, $event: JQueryEventObject): ng.IPromise<any>;
        showDeleteCommentDialog(comment: ICommentInfo, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    interface IVizProperties {
        view?: IViewBase;
    }
    interface IVizViewerStateParams extends ng.ui.IStateParamsService {
        path: string;
    }
    interface IVizViewerScope extends ng.IScope {
        viz: IViz;
        vizProps: IVizProperties;
        contentBreadcrumbUrl: () => string;
        projectBreadcrumbUrl: () => string;
        workbookBreadcrumbUrl: () => string;
        hasError: () => boolean;
        hasViewInfo: () => boolean;
        addFavorite: (item: IViewBase) => ng.IPromise<ServerApi.IResult>;
        removeFavorite: (item: IViewBase) => ng.IPromise<ServerApi.IResult>;
        canSetTags: () => boolean;
        changeTags: (newTagsList: string[]) => void;
        increaseCommentList: () => void;
        createComment: (newText: string) => void;
        editComment: (commentText: string, commentId: string) => void;
        deleteComment: (event: JQueryEventObject, comment: ICommentInfo) => void;
        isTouch: () => boolean;
        comments: ListResult<ICommentInfo>;
        deletingCommentId: string;
        onVizSized: () => void;
        vizInitialized: boolean;
        commentsAndTagsInitialized: boolean;
        canCurrentUserModifyComment: (comment: ICommentInfo) => boolean;
        shouldShowWhoHasSeenThisView: () => boolean;
        allowedAction: ServerApi.IViewActions;
    }
    class VizViewerCtrl {
        private $scope;
        private $q;
        private breadcrumbs;
        private BrowserTitleService;
        private comments;
        private contentActions;
        private views;
        private server;
        static $inject: string[];
        private hasError;
        private static COMMENT_PAGE_SIZE;
        constructor($scope: IVizViewerScope, $state: ng.ui.IStateService, $q: ng.IQService, $stateParams: IVizViewerStateParams, breadcrumbs: BreadcrumbsService, BrowserTitleService: BrowserTitleService, comments: Comments, contentActions: ContentActions, deleteCommentActions: DeleteCommentActions, views: Views, server: ServerService, vizService: VizService, Favorites: Favorites, BrowserSupportService: BrowserSupportService, windowLocationService: WindowLocationService);
        private isCurrentUserId(id);
        private loadNewCommentInfo(numberOfAdditionalCommentToRequest?);
        private loadNewViewInfo(viewInfo);
    }
}
declare module VizPortal {
    /**
    * This directive allows us to coordinate server and site settings form
    * controls in both single site (site and server settings combined) and multisite
    * (site and server settings separated).
    *
    * The coordinator handles UI feedback for all successes and will show and error message
    * if any settings fails to save. Specific form controllers should handle form-specific
    * error reporting.
    */
    interface ISettingsCoordinatorCtrlScope extends IAllSiteSettingsScope, IServerSettingsScope {
        server: ServerService;
        forms: ISettingsFormState;
        showResetSettingsBtn: () => boolean;
    }
    interface ISettingsFormState {
        isFormUnchanged?: () => boolean;
        isBusy?: () => boolean;
        save?: () => ng.IPromise<any>;
        cancel?: () => void;
        isValid?: () => boolean;
        resetSettings?: () => void;
        onSave?: () => ng.IPromise<any>;
    }
    class SettingsCoordinatorCtrl {
        private forms;
        static $inject: string[];
        constructor(scope: ISettingsCoordinatorCtrlScope, $q: ng.IQService, $translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, toaster: ToasterService, server: ServerService);
        registerFormState(state: ISettingsFormState): void;
    }
}
declare module VizPortal {
    module ConfigHelper {
        function addExtractTasksState($stateProvider: ng.ui.IStateProvider, parentName: string, resolveExtractTasksContext?: any): void;
        function addSubscriptionsState($stateProvider: ng.ui.IStateProvider, parentName: string): void;
        function addTaskSubstates($stateProvider: ng.ui.IStateProvider, parentName: string): void;
    }
}
declare module VizPortal.ServerApi {
    interface ICreateSiteParams {
        settings: IServerAdminSettings;
        siteAdminSettings?: ISiteAdminSettings;
        subscriptionSettings?: ISiteSubscriptionSettings;
    }
    interface ICreateSiteResult extends IResult {
    }
    class CreateSiteRequest extends Request<ICreateSiteParams, ICreateSiteResult> {
        constructor(params: ICreateSiteParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteSitesParams {
        ids: string[];
    }
    interface IDeleteSitesResult {
        actionId?: string;
    }
    class DeleteSitesRequest extends Request<IDeleteSitesParams, IDeleteSitesResult> {
        constructor(params: IDeleteSitesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetSitesParams extends IGetItemsParams {
    }
    interface IGetSitesResult extends IGetItemsResult {
        sites: ISiteSettingsForServerAdmin[];
    }
    class GetSitesRequest extends Request<IGetSitesParams, IGetSitesResult> {
        constructor(params: IGetSitesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateSiteAvailabilityParams {
        ids: string[];
        availability: string;
    }
    interface IUpdateSiteAvailabilityResult extends IResult {
    }
    class UpdateSiteAvailabilityRequest extends Request<IUpdateSiteAvailabilityParams, IUpdateSiteAvailabilityResult> {
        constructor(params: IUpdateSiteAvailabilityParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateSiteSettingsForServerAdminParams {
        id: string;
        settings: IServerAdminSettings;
        subscriptionSettings?: ISiteSubscriptionSettings;
    }
    interface IUpdateSiteSettingsForServerAdminResult {
    }
    class UpdateSiteSettingsForServerAdminRequest extends Request<IUpdateSiteSettingsForServerAdminParams, IUpdateSiteSettingsForServerAdminResult> {
        constructor(params: IUpdateSiteSettingsForServerAdminParams);
    }
}
declare module VizPortal {
    enum LongRunningActionState {
        Queued = 0,
        InProgress = 1,
        Complete = 2,
    }
    enum LongRunningActionType {
        RebuildSearchIndex = 0,
        DeleteSites = 1,
        AssignPermissionsToContents = 2,
    }
    interface ILongRunningActionProgress {
        id: string;
        type: LongRunningActionType;
        state: LongRunningActionState;
        percentComplete: number;
    }
    interface ILongRunningAction extends ILongRunningActionProgress {
        response: any;
        succeeded: boolean;
    }
    interface ITypedLongRunningAction<TResult extends ServerApi.IResult> extends ILongRunningActionProgress {
        response: TResult;
    }
}
declare module VizPortal.ServerApi {
    interface IActionInfo {
        id: string;
        type: string;
        state: string;
        percentComplete: number;
        succeeded: boolean;
        response: IResult;
    }
}
declare module VizPortal.ServerApi {
    interface IGetActionInfoParams {
        actionId?: string;
        actionType?: string;
    }
    interface IGetActionInfoResult {
        actions: IActionInfo[];
    }
    class GetActionInfoRequest extends Request<IGetActionInfoParams, IGetActionInfoResult> {
        constructor(params: IGetActionInfoParams);
    }
}
declare module VizPortal {
    class LongRunningActionService {
        private server;
        private pollService;
        private $q;
        private $timeout;
        static $inject: string[];
        private StringToStateDict;
        private StringToTypeDict;
        private TypeToStringDict;
        constructor(server: ServerService, pollService: PollService, $q: ng.IQService, $timeout: ng.ITimeoutService);
        /**
         * Get the last LongRunningAction of a type.
         * Clients should handle promise rejection.
         */
        getLastByType(type: LongRunningActionType): ng.IPromise<ILongRunningAction>;
        /**
         * Track the progress of a LongRunningAction
         * The promise will be fullfilled with the LongRunningAction when it is complete
         * The promise will be rejected with ResourceNotFound if there is no action of given id
         */
        trackProgress(id: string): IPoller<ILongRunningAction>;
        startProgressTrackingForResult<TResult extends ServerApi.IResult>(getPoller?: (poller: IPoller<ILongRunningAction>) => any): (result: ServerApi.IActionResult) => ng.IPromise<TResult>;
        private getLongRunningActionResult<TResult>(action);
        startProgressTrackingForResponse<TResult extends ServerApi.IResult>(getPoller?: (poller: IPoller<ILongRunningAction>) => any): (result: ServerApi.IActionResult) => ng.IPromise<TResult>;
        private toLongRunningAction<T>(actionInfo);
        delayResultForSolr<T>(): (result: T) => ng.IPromise<T>;
    }
}
declare module VizPortal {
    class SiteAvailabilityState {
        static ACTIVE: string;
        static SUSPENDED: string;
        static LOCKED: string;
    }
    class Sites extends Resource<ServerApi.ISiteSettingsForServerAdmin> {
        private $q;
        private $translate;
        private $timeout;
        private LongRunningActionService;
        private errorNotifyingServer;
        private sizeFilter;
        static $inject: string[];
        constructor($q: ng.IQService, $translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService, LongRunningActionService: LongRunningActionService, errorNotifyingServer: ErrorNotifyingServer, sizeFilter: ISizeFilter, FetcherFactory: FetcherFactory);
        getSiteSettingsForServerAdminById(id: string): ng.IPromise<ServerApi.ISiteSettingsForServerAdmin>;
        getSiteSettingsForSiteAdminById(id: string): ng.IPromise<ServerApi.ISiteSettingsForSiteAdmin>;
        getCurrentSiteSettingsForServerAdmin(): ng.IPromise<ServerApi.ISiteSettingsForServerAdmin>;
        getCurrentSiteSettingsForSiteAdmin(): ng.IPromise<ServerApi.ISiteSettingsForSiteAdmin>;
        private updateSiteAvailability(ids, availability);
        suspend(ids: string[]): ng.IPromise<ServerApi.IResult>;
        activate(ids: string[]): ng.IPromise<ServerApi.IResult>;
        updateSiteSettingsForServerAdmin(id: string, settings: ServerApi.IServerAdminSettings, subscriptionSettings?: ServerApi.ISiteSubscriptionSettings): ng.IPromise<ServerApi.IResult>;
        updateSiteSettingsForSiteAdmin(id: string, siteAdminSettings: ServerApi.ISiteAdminSettings): ng.IPromise<ServerApi.IResult>;
        createSite(settings: ServerApi.IServerAdminSettings, siteAdminSettings?: ServerApi.ISiteAdminSettings, subscriptionSettings?: ServerApi.ISiteSubscriptionSettings): ng.IPromise<void>;
        del(ids: string[]): ng.IPromise<any>;
        errorMessage(code: SiteSettingsErrorCode, site: ServerApi.ISiteSettingsForServerAdmin): string;
    }
}
declare module VizPortal {
    class SitesPlace {
        private $location;
        private Sites;
        private urlParamsFn;
        static $inject: string[];
        constructor($location: ng.ILocationService, Sites: Sites);
        create(): IPlace;
    }
}
declare module VizPortal.ServerApi {
    interface IGetMastheadNotificationsParams {
    }
    interface IGetMastheadNotificationsResult {
        contentUrl: string;
    }
    class GetMastheadNotificationsRequest extends Request<IGetMastheadNotificationsParams, IGetMastheadNotificationsResult> {
        constructor();
    }
}
declare module VizPortal {
    class MastheadNotifications {
        private $sce;
        private $q;
        private toaster;
        private ServerService;
        private notificationsShown;
        static $inject: string[];
        constructor($sce: ng.ISCEService, $q: ng.IQService, toaster: ToasterService, ServerService: ServerService);
        showNotificationsIfEnabled(): ng.IPromise<any>;
        private fetchNotificationsUrl();
    }
}
declare module VizPortal.ServerApi {
    interface IGetPostLoginNotificationsParams {
    }
    interface IGetPostLoginNotificationsResult extends IResult {
        contentUrl: string;
    }
    class GetPostLoginNotificationsRequest extends Request<IGetPostLoginNotificationsParams, IGetPostLoginNotificationsResult> {
        constructor();
    }
}
declare module VizPortal {
    class PostLoginNotifications {
        private $sce;
        private $q;
        private modal;
        private $rootScope;
        private ServerService;
        private notificationsEnabled;
        private notificationsShown;
        static $inject: string[];
        constructor($sce: ng.ISCEService, $q: ng.IQService, modal: ModalService, $rootScope: ng.IScope, ServerService: ServerService);
        enableNotifications(): void;
        showNotificationsIfEnabled(): ng.IPromise<any>;
        private fetchNotificationsUrl();
    }
}
declare module VizPortal {
    var SiteUrlNameCapturingRegex: RegExp;
    /**
     * A wrapper around UI-Router's UrlMatcher. UI-Router doesn't have built-in functionality
     * to support site prefixes in the way that we'd like, so we need this custom UrlMatcher.
     *
     * This enables:
     *
     *     $state.go('sitestate', {siteUrlName: 'blah'}) to create url '/site/blah/...'
     *     url '/site/blah/...' to make $stateParams.siteUrlName === 'blah'
     *
     * For more detailed documentation on this class and its methods, see:
     * http://angular-ui.github.io/ui-router/site/#/api/ui.router.util.type:UrlMatcher
     */
    class SiteUrlMatcher implements ng.ui.IUrlMatcher {
        private matcher;
        constructor(matcher: ng.ui.IUrlMatcher);
        /**
         * Add a pattern to the end of this pattern, returning a new SiteUrlMatcher
         */
        concat(pattern: string): SiteUrlMatcher;
        /**
         * Extracts site into siteUrlName if the site is present
         */
        exec(path: string, searchParams: Object): {};
        /**
         * Return unsorted array of parameter names
         */
        parameters(): string[];
        /**
         * Create a url with the site, if a site is given
         */
        format(values: any): string;
    }
    /**
     * Can be used in config block or by other providers under the
     * name "SiteUrlMatcherFactoryProvider".
     */
    class SiteUrlMatcherFactory implements ng.IServiceProvider {
        private $urlMatcherFactory;
        static $inject: string[];
        constructor($urlMatcherFactory: ng.ui.IUrlMatcherFactory);
        compile(pattern: string): SiteUrlMatcher;
        $get(): SiteUrlMatcherFactory;
    }
}
declare module VizPortal.ServerApi {
    interface IGetDataConnectionAuthInfoParams {
        path: string;
        sessionId: string;
        attributes?: string;
    }
    class GetDataConnectionAuthInfoRequest extends Request<IGetDataConnectionAuthInfoParams, IDataConnectionAuthInfo> {
        constructor(params: IGetDataConnectionAuthInfoParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetLastActiveDirectoryGroupsSyncTimeParams {
    }
    interface IGetLastActiveDirectoryGroupsSyncTimeResult {
        time: string;
    }
    class GetLastActiveDirectoryGroupsSyncTimeRequest extends Request<IGetLastActiveDirectoryGroupsSyncTimeParams, IGetLastActiveDirectoryGroupsSyncTimeResult> {
        constructor(params?: IGetLastActiveDirectoryGroupsSyncTimeParams);
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IDatasourceDataConnectionScope extends IDataSourcePlaceScope, IEditOAuthConnectionDialogScope {
        requestRefreshNowIsDisabled: () => boolean;
        refreshNow: ($event: JQueryEventObject) => void;
        isOAuth: boolean;
        oauthInitialEditModel: IOAuthConnectionEditModel;
        editModel: IDataConnectionEditModel;
        isSaving: boolean;
        dataConnectionIsReading: () => boolean;
        dataConnectionIsEditing: () => boolean;
        canEditConnection: boolean;
        beginEdit: () => void;
        save: () => void;
        cancel: () => void;
        requestTestConnectionIsDisabled: () => boolean;
        testConnection: () => void;
        testConnectionResult: ITestConnectionResult;
        oauthCredentialName: string;
        editOAuth: ($event: JQueryEventObject) => void;
        objectName: string;
    }
    class DatasourceDataConnectionCtrl {
        private $scope;
        private $state;
        private EditConnectionAction;
        private CreateExtractTasksAction;
        private ServerService;
        static $inject: string[];
        private datasource;
        private isEditing;
        constructor($scope: IDatasourceDataConnectionScope, $state: ng.ui.IStateService, BrowserTitleService: BrowserTitleService, EditConnectionAction: EditConnectionAction, CreateExtractTasksAction: CreateExtractTasksAction, ServerService: ServerService);
        private testConnection();
        private isOAuth();
        private currentUserAllowedToEdit();
        private canEditConnection();
        private hasRemoteRefreshProperties();
        private currentRefreshModeIsRemote();
    }
}
declare module VizPortal {
    interface ISiteUserPlaceScope extends IMainScope, ISubplaceCountsScope, ISubplaceTabsScope {
        isSessionSiteOrServerAdmin: boolean;
        isSessionServerAdmin: boolean;
        isSessionUserSelf: boolean;
        multisite: boolean;
        user: IUserInfo;
        userSettings: IUserSettings;
        hasUserSettings: boolean;
        siteRole: string;
        objectName: string;
    }
    class SiteUserPlaceCtrl {
        static $inject: string[];
        constructor($scope: ISiteUserPlaceScope, $state: ng.ui.IStateService, ServerService: ServerService, isSessionServerAdmin: boolean, isSessionSiteAdmin: boolean, isSessionUserSelf: boolean, place: IPlace, siteUser: ServerApi.ISiteUser, userSettings: IUserSettings, serverUser: ServerApi.IServerUser);
    }
}
declare module VizPortal.ServerApi {
    interface IAssociateOAuthCredentialParams extends IGetItemsResult {
        credentialId: string;
        resourceId: string;
        resourceType: string;
    }
    class AssociateOAuthCredentialRequest extends Request<IAssociateOAuthCredentialParams, IEmptyResult> {
        constructor(params: IAssociateOAuthCredentialParams);
    }
}
declare module VizPortal.ServerApi {
    class DeleteOAuthCredentialsRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IDisassociateOAuthCredentialParams extends IGetItemsResult {
        resourceId: string;
        resourceType: string;
    }
    class DisassociateOAuthCredentialRequest extends Request<IDisassociateOAuthCredentialParams, IEmptyResult> {
        constructor(params: IDisassociateOAuthCredentialParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetCommonUserOAuthCredentialParams {
        ids: string[];
    }
    interface IGetCommonUserOAuthCredentialResult extends IResult {
        hasNone: boolean;
        hasEmbeddedPassword: boolean;
        hasManagedKeychain: boolean;
        hasOAuthCredential: boolean;
        oauthCredentialId?: string;
        commonUsername?: string;
    }
    class GetCommonUserOAuthCredentialRequest extends Request<IGetCommonUserOAuthCredentialParams, IGetCommonUserOAuthCredentialResult> {
        constructor(params: IGetCommonUserOAuthCredentialParams);
    }
}
declare module VizPortal.ServerApi {
    var OAuthCredentialTypes: {
        Salesforce: string;
        BigQuery: string;
        GoogleAnalytics: string;
    };
    interface IOAuthCredential {
        id: string;
        type: string;
        username: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetOAuthCredentialAssociatedWithResourceParams {
        resourceId: string;
        resourceType: string;
    }
    interface IGetOAuthCredentialAssociatedWithResourceResult extends IResult {
        id: string;
        type: string;
        username: string;
    }
    class GetOAuthCredentialAssociatedWithResourceRequest extends Request<IGetOAuthCredentialAssociatedWithResourceParams, IGetOAuthCredentialAssociatedWithResourceResult> {
        constructor(params: IGetOAuthCredentialAssociatedWithResourceParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetICredentialsResult extends IGetItemsResult {
        credentials: IOAuthCredential[];
    }
    class GetOAuthCredentialsRequest extends Request<IGetItemsParams, IGetICredentialsResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal.ServerApi {
    class TestOAuthCredentialRequest extends Request<ISingleIdParams, boolean> {
        constructor(id: string);
    }
}
declare module VizPortal {
    class OAuthCredentials extends Resource<ServerApi.IOAuthCredential> {
        private ErrorNotifyingServer;
        private serverService;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, serverService: ServerService, FetcherFactory: FetcherFactory);
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        test(id: string): ng.IPromise<boolean>;
        associateWithDatasource(datasourceId: string, credentialId: string): ng.IPromise<ServerApi.IEmptyResult>;
        disassociateFromDatasource(datasourceId: string): ng.IPromise<ServerApi.IEmptyResult>;
        credentialForDatasource(datasourceId: string): ng.IPromise<ServerApi.IGetOAuthCredentialAssociatedWithResourceResult>;
        commonCredentialForDatasources(datasourceIds: string[]): ng.IPromise<ServerApi.IGetCommonUserOAuthCredentialResult>;
        canAddForConnectionType(connectionType: string): boolean;
    }
}
declare module VizPortal {
    interface IAddOAuthResponseListenerWindow extends ng.IWindowService {
        tableauPopupComplete(response?: string): void;
    }
    class AddOAuthCredentialAction {
        private $window;
        private $rootScope;
        private $q;
        private WindowLocationService;
        static OAuthPath: string;
        static WindowName: string;
        static $inject: string[];
        private openWindow;
        private deferred;
        constructor($window: IAddOAuthResponseListenerWindow, $rootScope: ng.IRootScopeService, $q: ng.IQService, WindowLocationService: WindowLocationService);
        private handleResponse(response?);
        private removeOpenWindow();
        private notifySuccess(credentialId?);
        private notifyError(errorCode?);
        private getPopupSpecs();
        href(type: string): string;
        attemptAuth(type: string): ng.IPromise<string>;
        cancelPendingAuthAttempt(): void;
    }
}
declare module VizPortal.ServerApi {
    interface IGetRemoteRefreshAgentsParams {
        withContent?: boolean;
    }
    interface IGetRemoteRefreshAgentsResult {
        agents: IRemoteRefreshAgent[];
    }
    interface IRemoteRefreshAgent extends INamedItem, IOwnedItem {
        content?: INamedItemInfo[];
    }
    class GetRemoteRefreshAgentsRequest extends Request<IGetRemoteRefreshAgentsParams, IGetRemoteRefreshAgentsResult> {
        constructor(params: IGetRemoteRefreshAgentsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteRemoteRefreshAgentsParams {
        agentNames: string[];
    }
    class DeleteRemoteRefreshAgentsRequest extends Request<IDeleteRemoteRefreshAgentsParams, IResult> {
        constructor(params: IDeleteRemoteRefreshAgentsParams);
    }
}
declare module VizPortal {
    class RemoteRefreshAgents extends Resource<IRemoteRefreshAgentInfo> {
        private ErrorNotifyingServer;
        static $inject: string[];
        constructor(ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        get(): ng.IPromise<ServerApi.IResult>;
        getWithContent(): ng.IPromise<ServerApi.IResult>;
        del(agents: Set<IRemoteRefreshAgentInfo>): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class DeleteRemoteRefreshAgentsAction {
        private $translate;
        private ConfirmActionDialog;
        private ContentActionNotification;
        private RemoteRefreshAgents;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, RemoteRefreshAgents: RemoteRefreshAgents);
        execute(agents: Set<IRemoteRefreshAgentInfo>, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error);
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteMySavedPasswordsAndCredentialsParams {
    }
    interface IDeleteMySavedPasswordsAndCredentialsResult extends IResult {
    }
    class DeleteMySavedPasswordsAndCredentialsRequest extends Request<IDeleteMySavedPasswordsAndCredentialsParams, IDeleteMySavedPasswordsAndCredentialsResult> {
        constructor(params?: IDeleteMySavedPasswordsAndCredentialsParams);
    }
}
declare module VizPortal {
    class DeleteMyCredentialsAction {
        private $translate;
        private $q;
        private ConfirmActionDialog;
        private serverService;
        private ToasterService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, ConfirmActionDialog: ConfirmActionDialog, serverService: ServerService, ToasterService: ToasterService);
        executeFromEvent($event: JQueryEventObject): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class DeleteOAuthCredentialsAction extends AbstractContentAction<ServerApi.IOAuthCredential> {
        private $translate;
        private $filter;
        private OAuthCredentials;
        static $inject: string[];
        constructor(ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, $translate: ng.translate.ITranslateService, $filter: ng.IFilterService, OAuthCredentials: OAuthCredentials);
        configureDialog(dialogConfig: IConfirmActionDialogOptions, oauthCredentials: Set<ServerApi.IOAuthCredential>): void;
        notificationTranslationIds(): INotificationTranslationIds;
    }
}
declare module VizPortal {
    class DeleteConnectedDeviceAction {
        private $translate;
        private ConfirmActionDialog;
        private ContentActionNotification;
        private ServerUsers;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, ContentActionNotification: ContentActionNotification, ServerUsers: ServerUsers);
        execute(device: ServerApi.IConnectedDevice, userId: string, context: IActionContext): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error);
    }
}
declare module VizPortal {
    class SiteUserSettingsSubplaceCtrl {
        private serverService;
        private oAuthCredentials;
        private static OAuthListOrder;
        static $inject: string[];
        constructor($scope: SiteUserSettingsSubplaceCtrl.Scope, $state: ng.ui.IStateService, userSettingsCtrlCommon: UserSettingsCtrlCommon, isSessionUserSelf: boolean, userSettings: IUserSettings, userRefreshTokenCount: number, serverUser: IServerUserInfo, siteUser: ServerApi.ISiteUser, serverService: ServerService, oAuthCredentials: OAuthCredentials, addOAuthCredentialAction: AddOAuthCredentialAction, BrowserTitleService: BrowserTitleService, deleteOAuthCredentialsAction: DeleteOAuthCredentialsAction, deleteMyCredentialsAction: DeleteMyCredentialsAction, remoteRefreshAgents: RemoteRefreshAgents, deleteRemoteRefreshAgentsAction: DeleteRemoteRefreshAgentsAction, serverUsers: ServerUsers, deleteConnectedDeviceAction: DeleteConnectedDeviceAction);
        private testCredential(oauthCredential);
        private oauthEnabledForCredentialType(type);
        private createOAuthCredentialLists(credentials?);
    }
    module SiteUserSettingsSubplaceCtrl {
        interface OAuthCredentialViewModel {
            credential: ServerApi.IOAuthCredential;
            test: {
                inProgress?: boolean;
                success?: boolean;
            };
        }
        interface OAuthCredentialsList {
            type: string;
            addEnabled: boolean;
            credentials?: OAuthCredentialViewModel[];
        }
        interface RemoteRefreshAgentsScope extends ng.IScope {
            deleteRemoteRefreshAgent(agent: IRemoteRefreshAgentInfo, $event: JQueryEventObject): void;
            remoteRefreshAgents: IRemoteRefreshAgentInfo[];
        }
        interface Scope extends UserSettingsCtrlCommon.Scope, RemoteRefreshAgentsScope {
            canManageCredentials: boolean;
            deleteAllCredentials($event: JQueryEventObject): void;
            addCredential(type: string): void;
            addCredentialHref(type: string): string;
            testCredential(oauthCredential: OAuthCredentialViewModel): any;
            deleteCredential(oauthCredential: OAuthCredentialViewModel, $event: JQueryEventObject): any;
            credentialsLists: OAuthCredentialsList[];
            objectName: string;
            isSAMLUser: boolean;
            remoteAgentManagerEnabled: boolean;
            oneByOneConnectedDeviceManagement: boolean;
            connectedDevices: ServerApi.IConnectedDevice[];
            deleteConnectedDevice(token: ServerApi.IConnectedDevice, $event: JQueryEventObject): void;
        }
    }
}
declare module VizPortal {
    class DatasourcePlace {
        private $location;
        private Workbooks;
        private ExtractTasks;
        private RemoteRefreshSchedules;
        private urlParamsFn;
        private static ExcludeFilterKeys;
        static $inject: string[];
        constructor($location: ng.ILocationService, Workbooks: Workbooks, ExtractTasks: ExtractTasks, RemoteRefreshSchedules: RemoteRefreshSchedules);
        create(datasourceId: string): IPlace;
    }
}
declare module VizPortal.ServerApi {
    class AddTagsToDatasourcesRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal.ServerApi {
    class DeleteDatasourcesRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IDatasourceActions extends IDeleteAction, IDownloadAction, ILaunchWebAuthoringAction, IRefreshExtractAction, ISetDescriptionAction, ISetOwnerAction, ISetPermissionsAction, ISetProjectAction, ISetTagsAction, _.Dictionary<boolean> {
        setConnection: boolean;
    }
}
declare module VizPortal.ServerApi {
    class GetDatasourceActionsRequest extends Request<ISingleIdParams, IDatasourceActions> {
        constructor(id: string);
    }
}
declare module VizPortal.ServerApi {
    class MoveDatasourcesToProjectRequest extends Request<IMoveToProjectParams, IResult> {
        constructor(params: IMoveToProjectParams);
    }
}
declare module VizPortal.ServerApi {
    class RemoveTagsFromDatasourcesRequest extends Request<ITagsParams, IResult> {
        constructor(ids: string[], tags: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IRunExtractRefreshesOnDatasourcesParams extends IMultipleIdsParams {
        type: string;
    }
    class RunExtractRefreshesOnDatasourcesRequest extends Request<IRunExtractRefreshesOnDatasourcesParams, IResult> {
        constructor(ids: string[], type: string);
    }
}
declare module VizPortal.ServerApi {
    class SetDatasourceDescriptionRequest extends Request<ISetDescriptionParams, IEmptyResult> {
        constructor(id: string, description: string);
    }
}
declare module VizPortal.ServerApi {
    interface ISetDatasourceRefreshModeParams extends IIdItem {
        refreshMode: string;
    }
    class SetDatasourceRefreshModeRequest extends Request<ISetDatasourceRefreshModeParams, IEmptyResult> {
        constructor(params: ISetDatasourceRefreshModeParams);
    }
}
declare module VizPortal.ServerApi {
    interface ISetDatasourceRemoteAgentParams extends IIdItem {
        remoteAgentName: string;
    }
    class SetDatasourceRemoteAgentRequest extends Request<ISetDatasourceRemoteAgentParams, IEmptyResult> {
        constructor(params: ISetDatasourceRemoteAgentParams);
    }
}
declare module VizPortal.ServerApi {
    class SetDatasourcesOwnerRequest extends Request<ISetOwnerParams, IResult> {
        constructor(ids: string[], ownerId: string);
    }
}
declare module VizPortal {
    class DataSources implements IListResource<IDataSourceInfo>, IFieldValuesResource, IDetailResource<IDataSourceDetailInfo>, IActionResource<ServerApi.IDatasourceActions> {
        private $q;
        private ErrorNotifyingServer;
        private FetcherFactory;
        static isPublished(datasource: IDataSourceInfo): boolean;
        static isEmbedded(datasource: IDataSourceInfo): boolean;
        static $inject: string[];
        private server;
        private listFetcher;
        private allQuery;
        private detailFetcher;
        private fieldValuesFetcher;
        constructor($q: ng.IQService, ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        all(): ResourceQuery<IDataSourceInfo>;
        published(): ResourceQuery<IDataSourceInfo>;
        getById(id: string): ng.IPromise<IDataSourceDetailInfo>;
        valuesForField(field: string): FieldValuesQuery;
        actions(id: string): ng.IPromise<ServerApi.IDatasourceActions>;
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        setDescription(id: string, description: string): ng.IPromise<ServerApi.IResult>;
        setOwner(ids: string[], ownerId: string): ng.IPromise<ServerApi.IResult>;
        setRefreshMode(id: string, refreshMode: string): ng.IPromise<ServerApi.IResult>;
        setRemoteAgent(id: string, remoteAgentName: string): ng.IPromise<ServerApi.IResult>;
        moveToProject(targetProjectId: string, datasourceIds: string[]): ng.IPromise<ServerApi.IResult>;
        addTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        removeTags(ids: string[], tags: string[]): ng.IPromise<ServerApi.IResult>;
        changeTags(ids: string[], tagsToAdd: string[], tagsToRemove: string[]): ng.IPromise<ServerApi.IResult>;
        createExtractTask(ids: string[], scheduleId: string, extractType: string): ng.IPromise<ServerApi.IResult>;
        refreshExtracts(ids: string[], extractType: string): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class ProjectPlace {
        private $location;
        private DataSources;
        private Views;
        private Workbooks;
        private urlParamsFn;
        private static ExcludeFilterKeys;
        static $inject: string[];
        constructor($location: ng.ILocationService, DataSources: DataSources, Views: Views, Workbooks: Workbooks);
        create(projectId: string): IPlace;
    }
}
declare module VizPortal {
    class SiteUserPlace {
        private $location;
        private $q;
        private DataSources;
        private Views;
        private Workbooks;
        private Subscriptions;
        private urlParamsFn;
        private static ExcludeFilterKeys;
        static $inject: string[];
        constructor($location: ng.ILocationService, $q: ng.IQService, DataSources: DataSources, Views: Views, Workbooks: Workbooks, Subscriptions: Subscriptions);
        create(ownerId: string): IPlace;
        empty(): IPlace;
    }
}
declare module VizPortal.ServerApi {
    interface ICreateProjectParams {
        name: string;
        description?: string;
    }
    interface IProjectIdResult extends IResult {
        id: string;
    }
    class CreateProjectRequest extends Request<ICreateProjectParams, IProjectIdResult> {
        constructor(params: ICreateProjectParams);
    }
}
declare module VizPortal.ServerApi {
    class DeleteProjectsRequest extends Request<IMultipleIdsParams, IResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    interface IProjectActions extends IDeleteAction, ISetNameAction, ISetDescriptionAction, ISetOwnerAction, ISetPermissionsAction, _.Dictionary<boolean> {
    }
}
declare module VizPortal.ServerApi {
    class GetProjectActionsRequest extends Request<ISingleIdParams, IProjectActions> {
        constructor(id: string);
    }
}
declare module VizPortal.ServerApi {
    class SetProjectNameRequest extends Request<ISetNameParams, IEmptyResult> {
        constructor(id: string, name: string);
    }
}
declare module VizPortal.ServerApi {
    class SetProjectControlledPermissionsRequest extends Request<IMultipleIdsParams, IEmptyResult> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class SetContentControlledPermissionsRequest extends Request<IMultipleIdsParams, ILongRunningAction> {
        constructor(ids: string[]);
    }
}
declare module VizPortal.ServerApi {
    class SetProjectDescriptionRequest extends Request<ISetDescriptionParams, IEmptyResult> {
        constructor(id: string, description: string);
    }
}
declare module VizPortal.ServerApi {
    class SetProjectsOwnerRequest extends Request<ISetOwnerParams, IResult> {
        constructor(ids: string[], ownerId: string);
    }
}
declare module VizPortal {
    class Projects implements IListResource<IProjectInfo>, IFieldValuesResource, IDetailResource<IProjectDetailInfo>, IActionResource<ServerApi.IProjectActions> {
        private $q;
        private ErrorNotifyingServer;
        static $inject: string[];
        private server;
        private listFetcher;
        private allQuery;
        private detailFetcher;
        private fieldValuesFetcher;
        constructor($q: ng.IQService, ErrorNotifyingServer: ErrorNotifyingServer, FetcherFactory: FetcherFactory);
        all(): ResourceQuery<IProjectInfo>;
        getById(id: string): ng.IPromise<IProjectDetailInfo>;
        valuesForField(field: string): FieldValuesQuery;
        actions(id: string): ng.IPromise<ServerApi.IProjectActions>;
        del(ids: string[]): ng.IPromise<ServerApi.IResult>;
        rename(id: string, name: string): ng.IPromise<ServerApi.IResult>;
        setDescription(id: string, description: string): ng.IPromise<ServerApi.IResult>;
        setProjectControlledPermissions(ids: string[]): ng.IPromise<ServerApi.IEmptyResult>;
        setContentControlledPermissions(ids: string[]): ng.IPromise<ILongRunningAction>;
        setOwner(ids: string[], ownerId: string): ng.IPromise<ServerApi.IResult>;
        create(name: string, description?: string): ng.IPromise<ServerApi.IProjectIdResult>;
    }
}
declare module VizPortal {
    class SitePlace {
        private $location;
        private DataSources;
        private Projects;
        private Views;
        private Workbooks;
        private urlParamsFn;
        static $inject: string[];
        constructor($location: ng.ILocationService, DataSources: DataSources, Projects: Projects, Views: Views, Workbooks: Workbooks);
        create(): IPlace;
    }
}
declare module VizPortal {
    class WorkbookPlace {
        private $location;
        private DataSources;
        private Views;
        private Subscriptions;
        private ExtractTasks;
        private urlParamsFn;
        private static ExcludeFilterKeys;
        private static DataSourceExcludeFilterKeys;
        static $inject: string[];
        constructor($location: ng.ILocationService, DataSources: DataSources, Views: Views, Subscriptions: Subscriptions, ExtractTasks: ExtractTasks);
        create(workbookId: string): IPlace;
    }
}
declare module VizPortal {
    class ContentUrl {
        private $state;
        static $inject: string[];
        private itemDetailsStateNames;
        private itemSubplaceStateNames;
        constructor($state: ng.ui.IStateService);
        forItem(item: any, itemType: IContentType, subplaceName?: string): string;
    }
}
declare module VizPortal {
}
/**
 * Makes angular's $q service more in line with the real q library: https://github.com/kriskowal/q
 *
 *   1. `catch` is aliased to `fail`. `catch` is a reserved word and breaks IE 7 & 8
 *   2. `finally` is aliased to `fin`. `finally` is a reserved word and breaks IE 7 & 8
 *   3. Add a `progress` shorthand for `then(null, null, notifyCallback)`
 *
 * Care is taken to minimize the overhead of this decoration.
 */
declare module ng {
    interface IPromise<T> {
        fail<TResult>(onRejected: (reason: any) => IHttpPromise<TResult>): IPromise<TResult>;
        fail<TResult>(onRejected: (reason: any) => IPromise<TResult>): IPromise<TResult>;
        fail<TResult>(onRejected: (reason: any) => TResult): IPromise<TResult>;
        fin<TResult>(finallyCallback: () => any): IPromise<TResult>;
        progress<TResult>(notifyCallback?: (state: any) => any): IPromise<TResult>;
    }
}
declare module VizPortal {
}
/**
 * Adds hardReload() method to IStateService.
 * This is needed because $state.reload() only re-executes resolve providers but does not re-execute
 * the controllers that update scope
 * See https://github.com/angular-ui/ui-router/issues/582#issuecomment-38117084 for more details
 */
declare module ng.ui {
    interface IStateService {
        hardReload(): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    class ImagePreloadService {
        private static DynamicIconImages;
        preloadDynamicIconImages(): void;
    }
}
declare module VizPortal {
    interface IStateAndStateParams {
        state: ng.ui.IState;
        params: any;
    }
    /**
     * Facade on ui-router's $state
     * Use this when you're trying to learn things about a state that is not the current state, otherwise use $state directly.
     */
    class StateWrapperService {
        private $state;
        static $inject: string[];
        constructor($state: ng.ui.IStateService);
        private t(state);
        /**
         * Returns the first state found that matches the path and the search parameters.
         * If no state is found, returns undefined
         * Normal usage: getMatchingState($location.path(), $location.search())
         */
        getMatchingState(path: string, searchParams: {}): ng.ui.IState;
        /**
         * Return the stateParams that match the path and the searchParams.
         * If no state is found, returns undefined
         * Normal usage: getStateParams($location.path(), $location.search())
         */
        getStateParams(path: string, searchParams: {}): {};
        /**
         * Gets the site urlName from the current url if it is the login state
         */
        getSiteUrlNameIfLoginState(path: string, searchParams: {}): string;
        isDescendantOf(descendant: ng.ui.IState, ancestorName: string): boolean;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    class AddActiveDirectoryGroupDialogCtrl {
        private $scope;
        private $translate;
        private activeDirectoryGroups;
        private sliceableFactory;
        static $inject: string[];
        constructor($scope: AddActiveDirectoryGroupDialogCtrl.Scope, $translate: ng.translate.ITranslateService, activeDirectoryGroups: ActiveDirectoryGroups, sliceableFactory: SliceableFactory);
        private onRowClicked(row, colIndex);
        private onSearchTextChanged(newSearchText);
        private resetSelection();
        private static prepareSearchTextInput(searchText);
    }
    module AddActiveDirectoryGroupDialogCtrl {
        interface GroupSearchValue {
            text: string;
        }
        interface Scope extends IAddAdGroupDialogScope {
            isSearchStringEmpty(): boolean;
            groupSearchValue: GroupSearchValue;
            isRowSelected(locals: {
                row: ServerApi.IGroup;
            }): boolean;
            rowClicked(row: ServerApi.IGroup, colIndex: number): void;
            disabledItems: Set<ServerApi.IGroup>;
            groupsToImport: Set<ServerApi.IGroup>;
            selectedItems: Set<ServerApi.IGroup>;
            sliceable: ISliceable<ServerApi.IGroup>;
            setSiteRole(role: string): void;
            siteRoleOptions: string[];
            hasResults: boolean;
            statusMessage: string;
        }
    }
}
declare module VizPortal {
    interface IUserSearchValue {
        text: string;
    }
    interface IAddUsersToGroupDialogScope extends ng.IScope {
        userSearchValue: IUserSearchValue;
        sliceable: ISliceable<ServerApi.IUser>;
        selectedItems: Set<ServerApi.IUser>;
        disabledItems: Set<ServerApi.IUser>;
        usersToBeAdded: Set<ServerApi.IUser>;
        usersSliceChanged: (newSlice: ListResult<ServerApi.IUser>) => any;
        rowClicked(row: ServerApi.IUser, colIndex: number): void;
        isRowSelected(locals: {
            row: ServerApi.IUser;
        }): boolean;
        addUsersToGroupDescription: string;
        confirmLabel: () => string;
        busy: boolean;
        confirm: () => void;
        confirmDisabled?: () => boolean;
        dismiss: () => void;
        close: (result: any) => void;
        errorMessage: string;
    }
    class AddUsersToGroupDialogCtrl {
        private $scope;
        private users;
        private group;
        private groupMembershipUpdateActionNotification;
        private $translate;
        private toaster;
        private server;
        private isGroupMembershipPrecomputed;
        private static ListOrder;
        static $inject: string[];
        constructor($scope: IAddUsersToGroupDialogScope, users: SiteUsers, group: IGroupInfo, groupMembershipUpdateActionNotification: GroupMembershipUpdateActionNotification, $translate: ng.translate.ITranslateService, toaster: ToasterService, server: ServerService);
        private onSearchTextChanged(newSearchText);
        private onConfirmAdd();
        private tryPrecomputeGroupMembership();
        private onRowClicked(row, colIndex);
        private onUsersSliceChanged(newSlice);
    }
}
declare module VizPortal {
    interface IPoller<T> {
        promise: ng.IPromise<T>;
        cancel: () => void;
    }
    class PollService {
        private server;
        private $q;
        private $interval;
        static $inject: string[];
        private static MaxPollPeriodMS;
        private static InitialPollPeriodMS;
        private static PollPeriodMultiplier;
        constructor(server: ServerService, $q: ng.IQService, $interval: ng.IIntervalService);
        /**
         * Poll the request until isComplete callback returns true.
         *
         * Clients of poll() are responsible for calling poller.cancel() to prevent zombie polls
         * from hanging around. For example, if called directly from a controller the poller
         * should be canceled on $scope destruction:
         *
         *     $scope.$on('$destroy', () => {
         *       poller.cancel()
         *     });
         */
        poll<TParams, TResult>(request: ServerApi.IRequest<TParams, TResult>, isComplete: (response: ServerApi.IResponse<TResult>) => boolean, customPollPeriod?: number): IPoller<TResult>;
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserAlertCountParams {
    }
    interface IGetUserAlertCountResult {
        totalCount: number;
    }
    class GetUserAlertCountRequest extends Request<IGetUserAlertCountParams, IGetUserAlertCountResult> {
        constructor(params?: IGetUserAlertCountParams);
    }
}
declare module VizPortal {
    interface IAlertMenuScope extends ng.IScope {
        totalAlerts: number;
        alertList: IAlertInfo[];
        getAlertList: () => void;
        workbooksAffectedString: (workbookList: INamedItemInfo[]) => string;
        getFailureType: (alert: IAlertInfo) => string;
        editableFailure: (statusCode: number) => boolean;
        tryAgainClick: (alert: IAlertInfo, index: number) => void;
        showRemainingAlerts: string;
        isRemoteRefresh: (statusCode: number) => boolean;
        hasSuspended: (alertList: IAlertInfo[]) => boolean;
    }
    class AlertMenuCtrl {
        static POLL_DURATION: number;
        static REMOTE_REFRESH_STATUS_CODES: number[];
        static $inject: string[];
        constructor($scope: IAlertMenuScope, $translate: ng.translate.ITranslateService, alerts: Alerts, datasources: DataSources, extractTasks: ExtractTasks, pollService: PollService, workbooks: Workbooks, server: ServerService);
    }
}
declare module VizPortal {
    interface IBulkImportFormControls {
        canSubmitForm(): boolean;
        submitFormForAction(action: string): ng.IPromise<any>;
    }
    var uploadCsvAction: {
        importFile: string;
        validateFile: string;
    };
}
declare module VizPortal {
    interface IBulkImportUsersDialogScope extends IModalScope {
        percentComplete: number;
        endpoint: string;
        importInProgress: boolean;
        importComplete: boolean;
        form: {
            controls: IBulkImportFormControls;
        };
        importFile(): void;
        validateFile(): void;
        canSubmitForm(): boolean;
        importResults: ServerApi.IBulkImportUsersFromCsvResult;
        dialogState: any;
        currentState: BulkImportUsersDialogState;
        closeButtonText(): string;
        csvHelpHref: string;
    }
    enum BulkImportUsersDialogState {
        SelectFile = 0,
        ImportInProgress = 1,
        PreviewComplete = 2,
        ImportComplete = 3,
    }
    class BulkImportUsersDialogCtrl {
        private $scope;
        private $translate;
        private toaster;
        static Method: {
            ImportUsersFromCsv: string;
            ImportServerUsersFromCsv: string;
        };
        static $inject: string[];
        constructor($scope: IBulkImportUsersDialogScope, $translate: ng.translate.ITranslateService, apiPrefix: string, method: string, HelpService: HelpService, toaster: ToasterService);
    }
}
declare module VizPortal {
    interface IContentGridScope extends IContentSubplaceScope {
        headerClicked: (header: ITemplate) => void;
        rowClicked(row: ServerApi.INamedItem, colIndex: number): void;
    }
    class ContentGridCtrl {
        static $inject: string[];
        constructor($scope: IContentGridScope, SelectionService: SelectionService);
    }
}
declare module VizPortal {
    interface IPopoverScope extends ng.IScope {
        visible: boolean;
        arrow: string;
    }
}
declare module VizPortal {
    interface IContentItemPopoverScope extends IContentSubplaceScope, IPopoverScope {
        item: any;
        itemDetails: any;
        $location: ng.ILocationService;
        sparklineWithTitleProps: VizPortalReact.SparklineWithTitle.Props;
    }
    class ContentItemPopoverCtrl {
        static $inject: string[];
        constructor($scope: IContentItemPopoverScope, $location: ng.ILocationService, $translate: ng.translate.ITranslateService);
    }
}
declare module VizPortal {
    interface IDataGridScope extends ng.IScope {
        headers: ITemplate[];
        cells: ITemplate[];
        items: ISliceable<any>;
        currentRowIndex: number;
        isRowSelected: (locals: {
            row: any;
        }) => boolean;
        headerClicked: (locals: {
            header: ITemplate;
        }) => any;
        rowClicked: (locals: {
            row: any;
            colIndex?: number;
        }) => any;
        sliceChanged: (locals: {
            newSlice: ListResult<any>;
        }) => any;
        columnWidths: ColumnWidths;
        scrollLeftChanged: (scrollLeft: number) => any;
    }
    class DataGridCtrl {
        static $inject: string[];
        constructor($scope: IDataGridScope, $element: JQuery, SliceableFactory: SliceableFactory);
    }
}
declare module VizPortal {
    interface IDateFilterScope extends ng.IScope {
        filter: IFilterControl;
        editMode: boolean;
        clear: () => void;
        open: () => void;
        close: () => void;
    }
    class DateFilterCtrl {
        static $inject: string[];
        constructor($scope: IDateFilterScope);
    }
}
declare module VizPortal {
    interface IErrorDetailsToastScope extends ng.IScope {
        toast?: IToast;
        errorDetailsSliceable: ISliceable<IErrorDetail>;
        showDetails?: ($event: JQueryEventObject) => void;
    }
    class ErrorDetailsToastCtrl {
        private $scope;
        private modal;
        private SliceableFactory;
        static $inject: string[];
        constructor($scope: IErrorDetailsToastScope, modal: ModalService, SliceableFactory: SliceableFactory);
    }
}
declare module VizPortal {
    class SearchSuggestionsService {
        private SliceableFactory;
        private ProjectNames;
        private UserNames;
        private Groups;
        private Tags;
        private DataConnectionTypes;
        private SiteNamesAcrossAllPods;
        private Favorites;
        private Schedules;
        static $inject: string[];
        constructor(SliceableFactory: SliceableFactory, ProjectNames: ProjectNames, UserNames: UserNames, Groups: Groups, Tags: Tags, DataConnectionTypes: DataConnectionTypes, SiteNamesAcrossAllPods: SiteNameSansIds, Favorites: Favorites, Schedules: Schedules);
        projects(matchText: string): ISliceable<ServerApi.IProjectName>;
        project(id: string): ng.IPromise<ServerApi.IFieldValue>;
        sites(matchText: string): ISliceable<ServerApi.ISiteNameWithId>;
        favorites(matchText: string): ISliceable<ServerApi.IFavorite>;
        users(matchText: string): ResourceQuery<ServerApi.IUserName>;
        usersWithoutGuest(matchText: string): ResourceQuery<ServerApi.IUserName>;
        adminUsers(matchText: string): ResourceQuery<ServerApi.IUserName>;
        user(id: string): ng.IPromise<ServerApi.IFieldValue>;
        groups(matchText: string): ISliceable<ServerApi.IGroup>;
        group(id: string): ng.IPromise<ServerApi.IGroup>;
        tags(matchText: string): ISliceable<ServerApi.ITag>;
        dataConnectionType(dataConnectionType: string): ng.IPromise<ServerApi.IFieldValue>;
        dataConnectionTypes(matchText: string): ISliceable<ServerApi.IDataConnectionType>;
        schedulesSource(scheduledActionType?: string): ITypeaheadSource;
    }
}
declare module VizPortal {
    interface IFavoritesMenuScope extends ng.IScope {
        getFavorites: (query: string) => ISliceable<ServerApi.IFavorite>;
        goToFavorite: () => void;
        filteringList: {
            chosenFavorite: ServerApi.IFavorite;
        };
    }
    class FavoritesMenuCtrl {
        private $state;
        private favorites;
        static $inject: string[];
        constructor($scope: IFavoritesMenuScope, $state: ng.ui.IStateService, favorites: Favorites, views: Views, workbooks: Workbooks, searchSuggestions: SearchSuggestionsService);
        private handleGoToDeletedFavorite(id, reason);
    }
}
declare module VizPortal {
    class FocusCtrl {
        private $element;
        constructor();
        setFocusElement(elm: JQuery): void;
        focus(): void;
        hasFocusElement(): boolean;
    }
}
declare module VizPortalReact {
    class HelpActions {
        private help;
        private server;
        private $scope;
        private gettingStartedNotifications;
        private modalService;
        constructor(help: VizPortal.HelpService, server: VizPortal.ServerService, $scope: ng.IScope, gettingStartedNotifications: VizPortal.GettingStartedNotifications, modalService: VizPortal.ModalService);
        showAbout(): void;
        showGettingStarted(): void;
        searchHelp(searchTerm: string): void;
    }
}
declare module VizPortal {
    interface IHelpMenuScope extends ng.IScope {
        isOfflineHelpEnabled: boolean;
        searchForm: {
            searchText: string;
        };
        supportUrl: () => string;
        serverHelpUrl: string;
        helpLocKey: string;
        searchHelp: () => void;
        showAbout: () => void;
        serverName: () => string;
        showGettingStartedLink: boolean;
        launchGettingStarted: () => void;
        reset: () => void;
    }
    class HelpMenuCtrl {
        static $inject: string[];
        constructor($scope: IHelpMenuScope, server: ServerService, modalService: ModalService, help: HelpService, gettingStartedNotifications: GettingStartedNotifications);
    }
}
declare module VizPortal {
    interface IScrollerScope extends ng.IScope {
        items: ISliceable<any>;
        layout: ILayout;
        scrollControls: IScrollControls;
        sliceChanged: (locals: {
            newSlice: ListResult<any>;
        }) => any;
        scrollLeftChanged: (locals: {
            scrollLeft: number;
        }) => any;
        scroller: ScrollCtrl;
        slice: ListResult<any>;
        transcludeFn: ng.ITranscludeFunction;
        getViewportDimensions: () => ISize;
    }
    interface IScrollControls {
        scrollIntoView: (index: number) => void;
        setScrollLeft: (scrollLeft: number) => any;
        getScrollLeft: () => number;
    }
    class ScrollCtrl {
        static ItemsChangeEvent: string;
        static $inject: string[];
        content: JQuery;
        contentArea: JQuery;
        private scope;
        private viewport;
        private $q;
        private metrics;
        private currentPage;
        private currentItemsPerPage;
        private currentTotal;
        private mostRecentInProgressRequest;
        constructor($scope: IScrollerScope, $element: JQuery, $q: ng.IQService, $transclude: ng.ITranscludeFunction);
        private fetchItems();
        private onItemsChanged();
        private resize(dimensions);
        contentAreaHeight(): number;
        contentTop(): number;
        private getSlice(request);
        private isInProgress(request);
        private getViewportDimensions();
        private getLayoutMetrics(dimensions);
        private updateLayoutMetrics();
        private totalNumberOfRows(metrics);
        private static pageHeightInPx(metrics);
        private static itemsPerPage(metrics);
    }
}
declare module VizPortal {
    enum Permission {
        Unspecified = 0,
        Allowed = 1,
        Denied = 2,
        Mixed = 3,
    }
    enum PermissionReason {
        Unspecified = 0,
        ImplicitDeny = 1,
        GroupAllow = 2,
        GroupDeny = 3,
        UserAllow = 4,
        UserDeny = 5,
        UserLicensingDeny = 6,
        GuestAllow = 7,
        UserAuthorizableOwnerAllow = 8,
        GroupProjectLeaderAllow = 9,
        UserProjectLeaderAllow = 10,
        UserProjectOwnerAllow = 11,
        UserAdminAllow = 12,
        Mixed = 13,
    }
    interface IPermission {
        permission: Permission;
        reason: PermissionReason;
    }
}
declare module VizPortal {
    interface IGranteePermissions {
        group?: ServerApi.IGroup;
        user?: ServerApi.IUser;
        permissions?: _.Dictionary<IPermission>;
        permissionsByContentType?: _.Dictionary<_.Dictionary<IPermission>>;
    }
}
declare module VizPortal.ServerApi {
    interface ICapabilityValue {
        capability: string;
        value: string;
        reason?: string;
    }
}
declare module VizPortal.ServerApi {
    interface ITypedId {
        type: string;
        id: string;
    }
    interface ITypedIdWithName extends ITypedId {
        name: string;
    }
}
declare module VizPortal.ServerApi {
    interface IAuthorizableGranteePermissions {
        authorizable: ITypedId;
        grantee: ITypedId;
        permissions: ICapabilityValue[];
    }
}
declare module VizPortal {
    module PermissionsMerger {
        /**
         * Converts a list of IAuthorizableGranteePermissions from the server into an equivalent list of
         * IGranteePermissions for use by the client. The input array can contain AGPs for multiple
         * authorizables and multiple users, but their client-side authorizable type must be the same.
         */
        function makeGranteePermissionsList(agps: ServerApi.IAuthorizableGranteePermissions[], authorizableIds: string[], groups: ServerApi.IGroup[], users: ServerApi.IUser[]): IGranteePermissions[];
    }
}
declare module VizPortal.ServerApi {
    interface ITypedIds {
        type: string;
        ids: string[];
    }
}
declare module VizPortal.ServerApi {
    interface IGetEffectivePermissionsParams {
        userIds: string[];
        authorizables: ITypedIds;
    }
    interface IGetEffectivePermissionsResult {
        permissions: IAuthorizableGranteePermissions[];
    }
    class GetEffectivePermissionsRequest extends Request<IGetEffectivePermissionsParams, IGetEffectivePermissionsResult> {
        constructor(params: IGetEffectivePermissionsParams);
    }
}
declare module VizPortal {
    class EffectivePermissionsService {
        private $q;
        private server;
        private usersFetcher;
        static $inject: string[];
        constructor($q: ng.IQService, server: ServerService, FetcherFactory: FetcherFactory);
        getEffectivePermissions(usersParams: ServerApi.IGetItemsParams, authorizables: ServerApi.ITypedIds): ng.IPromise<ListResult<IGranteePermissions>>;
    }
}
declare module VizPortal {
    class EffectivePermissionsFetcher implements IListFetcher<IGranteePermissions> {
        private effectivePermissionsService;
        private authorizables;
        constructor(effectivePermissionsService: EffectivePermissionsService, authorizables: ServerApi.ITypedIds);
        setAuthorizables(authorizables: ServerApi.ITypedIds): void;
        fetchList(params: ServerApi.IGetItemsParams): ng.IPromise<ListResult<IGranteePermissions>>;
    }
}
declare module VizPortal {
    interface AccordionState {
        isEnabled(): boolean;
        toggleSection(section: number): void;
        isSectionOpen(section: number): boolean;
    }
    /**
     * Utility class that manages the state of collapsible sections. The different section divs in a
     * view layer can hook into these methods to determine if they should show or hide themselves.
     *
     * This implementation allows at most one section to be open at any time. Sections may be
     * numbered in any fashion. Upon construction, all sections are assumed to be closed.
     */
    class SingleSectionAccordion implements AccordionState {
        private currentOpenSection;
        /**
         * Returns true iff the accordion can be used.
         * @returns {boolean}
         */
        isEnabled(): boolean;
        /**
         * Toggles the state of the given section. If the given section is closed, it will open
         * that section and close the others; if it is already open, it will close that section,
         * leaving them all closed.
         * @param section The section number to toggle
         */
        toggleSection(section: number): void;
        /**
         * Returns true if the given section is open, false if it is closed.
         * @param section The section to check
         */
        isSectionOpen(section: number): boolean;
    }
    /**
     * Alternative implementation of AccordionState that has all the sections open and doesn't allow
     * any of them to close.
     */
    var StaticAccordion: AccordionState;
}
declare module VizPortal {
    enum LockUnlockProjectPermissionsState {
        Locked = 0,
        Unlocked = 1,
        Mixed = 2,
    }
    module LockStatusHelper {
        function getCombinedStatusOfAllItems(projectStates: LockUnlockProjectPermissionsState[]): LockUnlockProjectPermissionsState;
        function getLockStatusOfAllProjects(projects: Set<IProjectInfo>): LockUnlockProjectPermissionsState[];
        function getWhiteLockIconClass(lockState: LockUnlockProjectPermissionsState): string;
        function getGrayLockIconClass(lockState: LockUnlockProjectPermissionsState): string;
        function getSectionHeaderText(lockState: LockUnlockProjectPermissionsState): string;
        function getLockButtonText(lockState: LockUnlockProjectPermissionsState): string;
        function getLockState(projects: Set<IProjectInfo>): LockUnlockProjectPermissionsState;
    }
}
declare module VizPortal {
    interface PermissionsEditability {
        editable: boolean;
        prompt: string;
        shortMessage: string;
        longMessage: string;
    }
    interface PermissionsEditabilityLogic {
        getEditabilityWithMessages: () => PermissionsEditability;
    }
    class PermissionsEditabilityLogicBase implements PermissionsEditabilityLogic {
        protected authorizables: Set<INamedItemInfo>;
        protected authorizableType: string;
        protected sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>;
        protected $translate: ng.translate.ITranslateService;
        protected editable: boolean;
        constructor(authorizables: Set<INamedItemInfo>, authorizableType: string, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>, $translate: ng.translate.ITranslateService);
        getEditabilityWithMessages(): PermissionsEditability;
        protected allAuthorizablesMatchSource(): boolean;
        protected allAuthorizablesLocked(): boolean;
        protected getPromptId(): string;
        protected getMessages(): string[];
        private getPrompt();
    }
    class ProjectPermissionsEditabilityLogic extends PermissionsEditabilityLogicBase {
        constructor(authorizables: Set<INamedItemInfo>, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>, $translate: ng.translate.ITranslateService);
        protected getPromptId(): string;
    }
    class WorkbookPermissionsEditabilityLogic extends PermissionsEditabilityLogicBase {
        constructor(authorizables: Set<INamedItemInfo>, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>, $translate: ng.translate.ITranslateService);
        protected getPromptId(): string;
        protected getMessages(): string[];
        private messageIdsForEditable();
        private messageIdsForReadOnly();
    }
    class DatasourcePermissionsEditabilityLogic extends PermissionsEditabilityLogicBase {
        constructor(authorizables: Set<INamedItemInfo>, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>, $translate: ng.translate.ITranslateService);
        protected getPromptId(): string;
        protected getMessages(): string[];
    }
    class ViewPermissionsEditabilityLogic extends PermissionsEditabilityLogicBase {
        constructor(authorizables: Set<INamedItemInfo>, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>, $translate: ng.translate.ITranslateService);
        protected getPromptId(): string;
        protected getMessages(): string[];
        private messageIdsForLockedViews(numSourcedFromProject);
        private messageIdsForUnlockedViews();
    }
}
declare module VizPortal {
    class PermissionsEditabilityLogicFactory {
        private $translate;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService);
        private static ImplForContentType;
        logicForAuthorizables(authorizables: Set<INamedItemInfo>, authorizableType: string, sourceAuthorizables: _.Dictionary<ServerApi.ITypedIdWithName>): PermissionsEditabilityLogic;
    }
}
declare module VizPortal {
    class PermissionsHasher {
        private capabilities;
        constructor(capabilities: string[]);
        hash(permissions: _.Dictionary<Permission>): string;
    }
}
declare module VizPortal.ServerApi {
    var Capabilities: {
        read: string;
        write: string;
        deleteItem: string;
        changePermissions: string;
        filter: string;
        addComment: string;
        viewComments: string;
        exportData: string;
        vud: string;
        exportImage: string;
        shareView: string;
        webAuthoring: string;
        exportXml: string;
        changeHierarchy: string;
        connect: string;
        projectLeader: string;
    };
    var CapabilitiesByContentType: _.Dictionary<string[]>;
    var CapabilitiesByContentTypeDeprecated: _.Dictionary<string[]>;
}
declare module VizPortal {
    class Role {
        locKey: string;
        permissions: _.Dictionary<Permission>;
        static create(locKey: string, capabilities: string[], permission: Permission): Role;
    }
}
declare module VizPortal {
    module PermissionRoleDefinitions {
        var ProjectViewer: Role;
        var ProjectInteractor: Role;
        var ProjectEditor: Role;
        var DataSourceConnector: Role;
        var DataSourceEditor: Role;
        var ProjectPublisher: Role;
        var ProjectLeader: Role;
        var WorkbookViewer: Role;
        var WorkbookInteractor: Role;
        var WorkbookEditor: Role;
        var ViewViewer: Role;
        var ViewInteractor: Role;
        var ViewEditor: Role;
        var explicitRolesByContentType: _.Dictionary<Role[]>;
    }
}
declare module VizPortal {
    module PermissionTemplateRoleDefinitions {
        var ProjectViewer: Role;
        var ProjectPublisher: Role;
        var ProjectLeader: Role;
        var DataSourceConnector: Role;
        var DataSourceEditor: Role;
        var WorkbookViewer: Role;
        var WorkbookInteractor: Role;
        var WorkbookEditor: Role;
        var ViewViewer: Role;
        var ViewInteractor: Role;
        var ViewEditor: Role;
        var explicitRolesByContentType: _.Dictionary<Role[]>;
    }
}
declare module VizPortal {
    class PermissionRoles {
        private permissionsAndRolesByType;
        private capabilitiesByContentType;
        private permissionsHasher;
        constructor(explicitRolesByContentType: _.Dictionary<Role[]>, capabilitiesByContentType: _.Dictionary<string[]>);
        getExplicitRoleForTypeAndPermissions(contentType: string, permissions: _.Dictionary<Permission>): string;
        getEffectiveRoleForTypeAndPermissions(contentType: string, permissions: _.Dictionary<Permission>): string;
        getPermissionsForTypeAndRole(contentType: string, role: string): _.Dictionary<Permission>;
        getAvailableRolesForType(contentType: string): string[];
        private getPermissionsAndRolesForType(type);
        private getPermissionsByRoleForType(type);
        private getExplicitRolesForType(type);
        private getEffectiveRolesForType(type);
        private getRoleForPermissions(roles, permissions);
        private setRoleForPermissions(roles, permissions, role);
        private addRoleForContentType(type, role);
        private addExplicitRole(type, permissions, role);
        private addEffectiveRole(type, permissions, role);
    }
}
declare module VizPortal {
    module PermissionsHelper {
        function granteeType(row: IGranteePermissions): string;
        function granteeName(row: IGranteePermissions): string;
        function hasSameGrantee(a: IGranteePermissions, b: IGranteePermissions): boolean;
        function compareGrantees(a: IGranteePermissions, b: IGranteePermissions): number;
        function permissionFromIGranteePermission(igp: IGranteePermissions, contentType: string, capability: string): IPermission;
        function permissionsFromIGranteePermission(igp: IGranteePermissions, contentType: string): _.Dictionary<IPermission>;
        function capabilityReason(row: IGranteePermissions, contentType: string, capability: string, defaultValue: string): string;
        function capabilityValue(row: IGranteePermissions, contentType: string, capability: string, defaultValue: string): string;
        function capabilityTitleKey(row: IGranteePermissions, contentType: string, capability: string, defaultValue: string): string;
        function pluckPermissionsFromDictionary(input: _.Dictionary<IPermission>): _.Dictionary<Permission>;
        function explicitGranteeRole(row: IGranteePermissions, contentType: string, permissionRoles: PermissionRoles): string;
        function effectiveGranteeRole(row: IGranteePermissions, contentType: string, permissionRoles: PermissionRoles): string;
        function IPermissionsFromPermissions(permissions: _.Dictionary<Permission>): _.Dictionary<IPermission>;
        function PermissionsFromIPermissions(ipermissions: _.Dictionary<IPermission>): _.Dictionary<Permission>;
        function getPermissionsContentTypes(authorizableType: string): string[];
        function explicitPermissionsRequestsForAuthorizables(authorizables: ServerApi.ITypedIds): ServerApi.GetExplicitPermissionsRequest[];
        function effectivePermissionsRequestsForAuthorizables(userIds: string[], authorizables: ServerApi.ITypedIds): ServerApi.GetEffectivePermissionsRequest[];
        function setExplicitPermissionsRequestsForAuthorizables(authorizables: ServerApi.ITypedIds, granteePermissions: IGranteePermissions): ServerApi.SetExplicitPermissionsRequest[];
        function getGrantee(granteePermissions: IGranteePermissions): ServerApi.ITypedId;
        function capabilityValuesFromPermissions(permissions: _.Dictionary<IPermission>): ServerApi.ICapabilityValue[];
        function capabilityValueFromPermission(permission: Permission): string;
    }
}
declare module VizPortal {
    class PermissionsPanelResizer {
        private permissionsPanel;
        private topPanel;
        private bottomPanel;
        private minTopHeight;
        private maxTopHeight;
        private startY;
        private startTopHeight;
        constructor(permissionsPanel: JQuery);
        startResize(yPos: number): void;
        continueResize(yPos: number): void;
    }
}
declare module VizPortal {
    class PagedList<T> implements ISliceable<T> {
        private fetcher;
        private fetchParams;
        constructor(fetcher: IListFetcher<T>, fetchParams: ServerApi.IGetItemsParams);
        getSlice(start: number, size: number): ng.IPromise<ListResult<T>>;
        private fetchItems(params);
    }
}
declare module VizPortal.ServerApi {
    interface IGetExplicitPermissionsParams {
        authorizables: ITypedIds;
    }
    interface IGetExplicitPermissionsResult {
        permissions: IAuthorizableGranteePermissions[];
        groups: IGroup[];
        users: IUser[];
        sourceAuthorizableById?: _.Dictionary<ITypedIdWithName>;
    }
    class GetExplicitPermissionsRequest extends Request<IGetExplicitPermissionsParams, IGetExplicitPermissionsResult> {
        constructor(params: IGetExplicitPermissionsParams);
    }
}
declare module VizPortal.ServerApi {
    interface ISetExplicitPermissionsParams {
        permissions: IAuthorizableGranteePermissions[];
    }
    interface ISetExplicitPermissionsResult extends IResult {
    }
    class SetExplicitPermissionsRequest extends Request<ISetExplicitPermissionsParams, ISetExplicitPermissionsResult> {
        constructor(params: ISetExplicitPermissionsParams);
    }
}
declare module VizPortal {
    interface ExplicitPermissionsResult {
        permissionsList: ListResult<IGranteePermissions>;
        sourceAuthorizablesById: _.Dictionary<ServerApi.ITypedIdWithName>;
    }
    class ExplicitPermissions {
        private server;
        static $inject: string[];
        constructor(server: ServerService);
        forAuthorizables(authorizables: ServerApi.ITypedIds): ng.IPromise<ExplicitPermissionsResult>;
        setForAuthorizables(authorizables: ServerApi.ITypedIds, granteePermissions: IGranteePermissions): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class GranteePermissionsFactory {
        private permissionRoles;
        static $inject: string[];
        constructor(permissionRoles: PermissionRoles);
        createForUserWithUnspecifiedPermissions(user: ServerApi.IUserName, authorizableType: string): IGranteePermissions;
        createForGroupWithUnspecifiedPermissions(group: ServerApi.IGroup, authorizableType: string): IGranteePermissions;
        private addUnspecifiedPermissions(gp, authorizableType);
    }
}
declare module VizPortal {
    interface IPermissionsActionButton {
        name: string;
        translate?: string;
        isDisabled(rule: IGranteePermissions): boolean;
        execute(rule: IGranteePermissions): void;
    }
    class PermissionsPanelActions {
        constructor();
        private $scope;
        private actionDefinition;
        getActionButtons($scope: IPermissionsPanelScope): IPermissionsActionButton[];
        private editPermissionRuleAction();
        private deletePermissionRuleAction();
        private isAllUsersGroup(rule);
        private showPermissionRuleEditor(action);
    }
}
declare module VizPortal {
    interface IPermissionsPanelScope extends ng.IScope {
        templateType: string;
        authorizableType: string;
        authorizables: Set<INamedItemInfo>;
        permissionsInfoMessage: string;
        showPrompt: boolean;
        prompt: string;
        currentAuthorizables: ServerApi.ITypedIds;
        haveCurrentAuthorizable: () => boolean;
        explicitPermissions: ISliceable<IGranteePermissions>;
        effectivePermissions: ISliceable<IGranteePermissions>;
        currentExplicitPermission: IGranteePermissions;
        columnWidths: ColumnWidths;
        granteeType: (row: IGranteePermissions) => string;
        granteeName: (row: IGranteePermissions) => string;
        explicitGranteeRole: (row: IGranteePermissions, contentType: string) => string;
        userStatusForRow: (row: IGranteePermissions, contentType: string) => string;
        capabilityValue: (row: IGranteePermissions, contentType: string, capability: string, defaultValue: string) => string;
        capabilityReason: (row: IGranteePermissions, contentType: string, capability: string, defaultValue: string) => string;
        capabilityTitleKey: (row: IGranteePermissions, contentType: string, capability: string, defaultValue: string) => string;
        setCurrentExplicitPermission: (explicitPermission: IGranteePermissions) => any;
        toggleCurrentExplicitPermission: (explicitPermission: IGranteePermissions) => any;
        haveCurrentExplicitPermission: () => boolean;
        isCurrentExplicitPermission: (explicitPermission: IGranteePermissions) => boolean;
        isHoveredExplicitPermission: (explicitPermission: IGranteePermissions) => boolean;
        isHoveredEffectivePermission: (effectivePermission: IGranteePermissions) => boolean;
        showEditButtonForRow: (row: IGranteePermissions) => boolean;
        showDeleteButtonForRow: (row: IGranteePermissions) => boolean;
        isRelevantExplicitPermission: (explicitPermission: IGranteePermissions) => boolean;
        isNotRelevantExplicitPermission: (explicitPermission: IGranteePermissions) => boolean;
        relevantCapabilityClass: (explicitPermission: IGranteePermissions, contentType: string, capability: string, capabilityName: string) => string;
        isCurrentEffectivePermission: (row: IGranteePermissions) => boolean;
        hasCurrentEffectivePermission(): boolean;
        isLoadingEffectivePermissions: boolean;
        effectiveRowHovered: (row: IGranteePermissions) => void;
        explicitRowHovered: (row: IGranteePermissions) => void;
        startResize: (yPos: number) => void;
        continueResize: (yPos: number) => void;
        effectivePermissionsSliceChanged: (newSlice: ListResult<IGranteePermissions>) => any;
        editPermissionRule: (explicitPermission: IGranteePermissions) => any;
        deletePermissionRule: (explicitPermission: IGranteePermissions) => any;
        permissionRuleEditorParams: {
            action: string;
            show: boolean;
        };
        permissionsLockStatusProps: VizPortalReact.PermissionLockStatus.Props;
        hideRowMenu: () => any;
        savePermissionRuleTranslationID: string;
        submitSearch: (searchText: string, $event?: JQueryEventObject) => void;
        refresh: () => ng.IPromise<any>;
        addUserOrGroupSelector: {
            isShown: boolean;
        };
        addNewUserPermission: (user: ServerApi.IUserName) => any;
        addNewGroupPermission: (group: ServerApi.IGroup) => any;
        explicitPermissionsPanelControls: {
            scrollControls?: IScrollControls;
        };
        effectivePermissionsPanelControls: {
            scrollControls?: IScrollControls;
        };
        getTooltipText: ($event: JQueryEventObject) => string;
        getHeaderTooltipText: ($event: JQueryEventObject) => string;
        scrollLeftChanged: (scrollLeft: number) => any;
        readOnly(): boolean;
        editability: PermissionsEditability;
        sectionGroupAccordion: AccordionState;
        headerTextAccordion: AccordionState;
        shortHeaderText: () => boolean;
        permissionsTemplateUrl: string;
        menuActions: IPermissionsActionButton[];
        projectControlledPermissionsEnabled: boolean;
        resize: (xPos: number) => void;
        setHoveredCapabilityValue(capabilityCell: JQuery): void;
        clearHoveredCapabilityValue(): void;
        isRelevantHeader(name: string): boolean;
    }
    class PermissionsPanelCtrl {
        private $scope;
        private $q;
        private $timeout;
        private sliceableFactory;
        private server;
        private explicitPermissions;
        private permissionRoles;
        private permissionsEditabilityLogicFactory;
        private granteePermissionsFactory;
        static $inject: string[];
        private effectivePermissionsFetcher;
        private hoveredEffectivePermission;
        private hoveredExplicitPermission;
        private groupMembership;
        private explicitPermissionsList;
        private hoveredCapabilityValue;
        private permissionsPanelResizer;
        constructor($scope: IPermissionsPanelScope, $element: JQuery, $q: ng.IQService, $timeout: ng.ITimeoutService, $translate: ng.translate.ITranslateService, permissionsPanelActions: PermissionsPanelActions, sliceableFactory: SliceableFactory, server: ServerService, explicitPermissions: ExplicitPermissions, effectivePermissionsService: EffectivePermissionsService, permissionRoles: PermissionRoles, permissionsEditabilityLogicFactory: PermissionsEditabilityLogicFactory, BrowserSupportService: BrowserSupportService, granteePermissionsFactory: GranteePermissionsFactory);
        private setCurrentExplicitPermission(explicitPermission);
        private addNewGranteePermissions(newGranteePermissions);
        private getGranteeIndex(granteePermissions);
        private startEditingRule(index, action);
        private showPermissionRuleEditor(action);
        private hidePermissionRuleEditor();
        private updateCurrentAuthorizables();
        private updateExplicitPermissions(authorizables);
        private setMissingCapabilitiesToUnspecified(items);
        private setMissingCapabilitiesForSectionsToUnspecified(items);
        private updateExplicitPermissionsSlice();
        private updateEffectivePermissions(searchText?);
        private updateGroupMembership(userIds);
        private isRelevantExplicitPermission(explicitPermission);
        /**
         * Tests if the current explicit permission is not relevant and thus should be visually greyed out.
         */
        private isNotRelevantExplicitPermission(explicitPermission);
        /**
         * returns the string 'relevant', 'normal', or 'not', which is used as a suffix to the class tb-relevant-capability-
         */
        private relevantCapabilityClass(explicitPermission, contentType, capability, capabilityName);
        private userStatusForRow(row, contentType);
    }
}
declare module VizPortal {
    interface IPermissionRuleEditorScope extends ng.IScope {
        updateAuthorizables: () => ng.IPromise<void>;
        hideRowMenu: () => any;
        authorizables: ServerApi.ITypedIds;
        show: boolean;
        action: string;
        getPositionElement: () => JQuery;
        selectedRow: IGranteePermissions;
        columnWidths: any;
        busy: boolean;
        permissionsEditorTemplates: string;
        cancel: () => any;
        isDeleteActionSelected: () => boolean;
        data: {
            row: IGranteePermissions;
        };
        getSavePermissionRuleTranslationID: () => string;
        savePermissionRule: () => any;
        saveDisabled: () => boolean;
        permissionsPanelCtrl: PermissionsPanelCtrl;
        templates: {
            cells: ITemplate[];
        };
        getTooltipText: ($event: JQueryEventObject) => string;
        roleOptions(contentType: string): any[];
        selectedRoleByContentType: _.Dictionary<string>;
        explicitGranteeRole: (row: IGranteePermissions, contentType: string) => string;
        granteeType: (row: IGranteePermissions) => string;
        granteeName: (row: IGranteePermissions) => string;
        capabilityValue: (row: IGranteePermissions, contentType: string, capability: string, defaultValue: string) => string;
        capabilityTitleKey: (row: IGranteePermissions, contentType: string, capability: string, defaultValue: string) => string;
        permissionsPanelColumnWidths: ColumnWidths;
        resize: (xPos: number) => void;
        accordion: AccordionState;
    }
    var PermissionRuleEditorCommands: {
        add: string;
        edit: string;
        delete_: string;
    };
    class PermissionRuleEditorCtrl {
        static $inject: string[];
        private authorizableType;
        private scope;
        private explicitPermissions;
        private permissionRoles;
        private $translate;
        private toaster;
        constructor($scope: IPermissionRuleEditorScope, explicitPermissions: ExplicitPermissions, permissionRoles: PermissionRoles, $translate: ng.translate.ITranslateService, toaster: ToasterService);
        initializeFromSelectedRow(): void;
        getTooltipText($event: JQueryEventObject): string;
        savePermissionRule(): void;
        /**
         *  Creates a copy of the permissionsByContentType dictionary which has all permissions set to unspecified. This is used to delete a permission rule.
         *  TODO: push this logic into a delete permission rule method in the ExplicitPermisions resource.
         */
        private cloneAllPermissionsToUnspecified(permissionsByContentType);
        saveDisabled(): boolean;
        getCapabilitiesForRole(role: string): _.Dictionary<IPermission>;
        getCapabilitiesForTypeAndRole(contentType: string, role: string): _.Dictionary<IPermission>;
        private updateColumnWidths();
        private deepCopy(row);
    }
}
declare module VizPortal {
    class Languages {
        private $translate;
        private server;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, server: ServerService);
        getAll(): ng.IPromise<ServerApi.ILanguage[]>;
        unspecifiedLanguage(): ServerApi.ILanguage;
    }
}
declare module VizPortal {
    class Locales {
        private $translate;
        private server;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, server: ServerService);
        getAll(): ng.IPromise<ServerApi.ILocale[]>;
        unspecifiedLocale(): ServerApi.ILocale;
    }
}
declare module VizPortal.ServerApi {
    interface IClearSavedPasswordsParams {
    }
    interface IClearSavedPasswordsResult {
    }
    class ClearSavedPasswordsRequest extends Request<IClearSavedPasswordsParams, IClearSavedPasswordsResult> {
        constructor(params?: IClearSavedPasswordsParams);
    }
}
declare module VizPortal.ServerApi {
    interface ILanguage {
        displayName: string;
        language: string;
        locale: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetLanguagesParams {
    }
    interface IGetLanguagesResult {
        languages: ILanguage[];
    }
    class GetLanguagesRequest extends Request<IGetLanguagesParams, IGetLanguagesResult> {
        constructor(params?: IGetLanguagesParams);
    }
}
declare module VizPortal.ServerApi {
    interface ILocale {
        displayName: string;
        locale: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetLocalesParams {
    }
    interface IGetLocalesResult {
        locales: ILocale[];
    }
    class GetLocalesRequest extends Request<IGetLocalesParams, IGetLocalesResult> {
        constructor(params?: IGetLocalesParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetServerSettingsParams {
    }
    interface IGetServerSettingsResult {
        serverSettings: IEditableServerSettings;
    }
    class GetServerSettingsRequest extends Request<IGetServerSettingsParams, IGetServerSettingsResult> {
        constructor(params: IGetServerSettingsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetTokenParams {
    }
    interface IGetTokenResult {
        refreshTokenCount: number;
    }
    class GetTotalRefreshTokenCountRequest extends Request<IGetTokenParams, IGetTokenResult> {
        constructor(params: IGetTokenParams);
    }
}
declare module VizPortal.ServerApi {
    interface IResetServerSettingsParams {
    }
    interface IResetServerSettingsResult {
    }
    class ResetServerSettingsRequest extends Request<IResetServerSettingsParams, IResetServerSettingsResult> {
        constructor(params?: IResetServerSettingsParams);
    }
}
declare module VizPortal.ServerApi {
    interface IRunActiveDirectoryGroupsSyncParams {
    }
    interface IRunActiveDirectoryGroupsSyncResult {
    }
    class RunActiveDirectoryGroupsSyncRequest extends Request<IRunActiveDirectoryGroupsSyncParams, IRunActiveDirectoryGroupsSyncResult> {
        constructor(params?: IRunActiveDirectoryGroupsSyncParams);
    }
}
declare module VizPortal.ServerApi {
    var UpdateBooleanServerSettingNames: {
        embeddedCredentialsEnabled: string;
        schedulingEnabled: string;
        savedPasswordsEnabled: string;
        savedAccessTokensEnabled: string;
        guestEnabled: string;
        scheduledActiveDirectorySyncEnabled: string;
        refreshTokensEnabled: string;
    };
    interface IUpdateBooleanServerSettingParams {
        setting: string;
        value: boolean;
    }
    interface IUpdateBooleanServerSettingResult {
    }
    class UpdateBooleanServerSettingRequest extends Request<IUpdateBooleanServerSettingParams, IUpdateBooleanServerSettingResult> {
        constructor(params: IUpdateBooleanServerSettingParams);
    }
}
declare module VizPortal.ServerApi {
    var UpdateScheduleFrequencyServerSettingName: string;
    interface IUpdateScheduleFrequencyServerSettingParams {
        setting: string;
        value: IScheduleFrequency;
    }
    interface IUpdateScheduleFrequencyServerSettingResult {
    }
    class UpdateScheduleFrequencyServerSettingRequest extends Request<IUpdateScheduleFrequencyServerSettingParams, IUpdateScheduleFrequencyServerSettingResult> {
        constructor(params: IUpdateScheduleFrequencyServerSettingParams);
    }
}
declare module VizPortal.ServerApi {
    interface IUpdateStringServerSettingParams {
        setting: string;
        value: string;
    }
    interface IUpdateStringServerSettingResult {
    }
    class UpdateStringServerSettingRequest extends Request<IUpdateStringServerSettingParams, IUpdateStringServerSettingResult> {
        constructor(params: IUpdateStringServerSettingParams);
    }
}
declare module VizPortal {
    interface IServerSettingsScope extends IMainScope {
        serverSettings: ServerApi.IEditableServerSettings;
        lastActiveDirectoryGroupsSyncTime: string;
    }
    interface IServerSettingsFormScope extends IServerSettingsScope {
        resetSettings: () => void;
        clearSavedCredentials: () => void;
        updateDefaultLanguage: (value: string) => void;
        updateDefaultLocale: (value: string) => void;
        serverSettingsPending: boolean;
        server: ServerService;
        serverSettingsFormState: ISettingsFormState;
        languages: ServerApi.ILanguage[];
        languageDisplayNames: _.Dictionary<string>;
        locales: ServerApi.ILocale[];
        localeDisplayNames: _.Dictionary<string>;
        isScheduledADSyncAllowed: boolean;
        runActiveDirectoryGroupsSync: () => void;
        scheduleViewModel: IScheduleFrequencyViewModel;
        totalRefreshTokenCount: number;
        refreshTokenUncheckedMessage: string;
        viewUpdateHref: string;
        learnMoreHref: string;
    }
    class ServerSettingsFormCtrl {
        private scope;
        private $state;
        private $q;
        private $translate;
        private server;
        private ServerSettings;
        private languages;
        private locales;
        private toasterService;
        private confirmActionDialog;
        private help;
        private masterSettings;
        private originalScheduleViewModel;
        private languageOrLocaleChanged;
        static $inject: string[];
        constructor(scope: IServerSettingsFormScope, $state: ng.ui.IStateService, $q: ng.IQService, $translate: ng.translate.ITranslateService, server: ServerService, ServerSettings: ServerSettings, languages: Languages, locales: Locales, toasterService: ToasterService, confirmActionDialog: ConfirmActionDialog, help: HelpService);
        private getLanguages();
        private getLocales();
        private resetSettings();
        private getTotalRefreshTokenCount();
        private clearSavedCredentials();
        private save();
        private runActiveDirectoryGroupsSync();
        private isLangOrLocaleChanged();
        private hardReloadIfNeeded();
    }
}
declare module VizPortal {
    interface ISiteSettingsForSiteAdminScope extends IMainScope {
        siteSettingsForSiteAdmin: ServerApi.ISiteSettingsForSiteAdmin;
        siteSettingsForSiteAdminFormState: ISettingsFormState;
        liveDBAvailable: boolean;
    }
    interface ISiteSettingsForSiteAdminFormScope extends ISiteSettingsForSiteAdminScope {
        siteId: string;
        busy: boolean;
        clearInvalid: (name: string) => void;
        focusByName: (name: string) => void;
        siteSettingsForSiteAdminForm: ng.IFormController;
    }
    class SiteSettingsForSiteAdminFormCtrl {
        private scope;
        private $location;
        private $q;
        private $translate;
        private $state;
        private sitesResource;
        private toaster;
        private master;
        static $inject: string[];
        constructor(scope: ISiteSettingsForSiteAdminFormScope, $location: ng.ILocationService, $q: ng.IQService, $translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, sitesResource: Sites, toaster: ToasterService, $timeout: ng.ITimeoutService);
        private clearInvalid(inputName);
        private revertSettings();
        private getSiteSettingsForSiteAdminUpdatePromise();
        private updateSuccess(site);
        private updateFailure(errors, site);
    }
}
declare module VizPortal {
    class NumberInputRange {
        static INT: {
            MIN: number;
            MAX: number;
        };
        static LONG: {
            MIN: number;
            MAX: number;
        };
    }
}
declare module VizPortal {
    class SiteIdValidRegExp {
        private static Chars;
        static InvalidFind: RegExp;
        static InvalidTest: RegExp;
    }
}
declare module VizPortal {
    interface ISiteSettingsForServerAdminScope extends IMainScope {
        siteSettingsForServerAdmin: ServerApi.ISiteSettingsForServerAdmin;
        isDefaultSite: boolean;
        siteSettingsForServerAdminFormState: ISettingsFormState;
        hideNameAndId: boolean;
        hideAvailability: boolean;
        autoSelectSiteName: boolean;
    }
    interface IAllSiteSettingsScope extends ISiteSettingsForServerAdminScope, ISiteSettingsForSiteAdminScope {
    }
    interface ISiteSettingsForServerAdminFormScope extends ISiteSettingsForServerAdminScope {
        siteId: string;
        active: string;
        suspended: string;
        url: string;
        defaultSubscriptionsEmail: string;
        userCountMax: number;
        storageQuotaMax: number;
        isSeatLicensing: boolean;
        busy: boolean;
        server: ServerService;
        serverLevelSubscriptionsEnabled: boolean;
        unbindNameWatcher: Function;
        cancel: () => void;
        close: () => void;
        save: () => void;
        clearInvalid: (name: string) => void;
        focusByName: (name: string) => void;
        siteSettingsForServerAdminForm: ng.IFormController;
        isVersionHistoryAllowed: boolean;
    }
    interface IAllSiteSettingsFormScope extends ISiteSettingsForServerAdminFormScope, ISiteSettingsForSiteAdminFormScope {
    }
    class SiteSettingsForServerAdminFormCtrl {
        private scope;
        private $location;
        private $q;
        private $translate;
        private $state;
        private server;
        private sitesResource;
        private toaster;
        private siteUrlMatcherFactory;
        private licenses;
        private master;
        static $inject: string[];
        constructor(scope: IAllSiteSettingsFormScope, $location: ng.ILocationService, $q: ng.IQService, $translate: ng.translate.ITranslateService, $state: ng.ui.IStateService, server: ServerService, sitesResource: Sites, toaster: ToasterService, siteUrlMatcherFactory: SiteUrlMatcherFactory, licenses: LicensesService, $timeout: ng.ITimeoutService);
        private clearInvalid(inputName);
        private revertSettings();
        private cancel();
        private save();
        private getSiteSettingsForServerAdminUpdatePromise();
        private updateSuccess(site);
        private updateFailure(errors, site);
    }
}
declare module VizPortal {
    interface ISiteSwitcherScope extends ng.IScope {
        siteSelected(locals: {
            urlName: string;
        }): void;
        getButtonTitle: () => string;
        getSiteNamesAcrossAllPods: (text: string) => ISliceable<ServerApi.ISiteNameSansId>;
        siteSwitcher: {
            chosenSiteName: ServerApi.ISiteNameSansId;
        };
        isCurrentSiteName: (siteName: ServerApi.ISiteNameSansId) => boolean;
        submitChangeSite: () => void;
    }
    class SiteSwitcherCtrl {
        static $inject: string[];
        constructor($scope: ISiteSwitcherScope, $translate: ng.translate.ITranslateService, searchSuggestions: SearchSuggestionsService, server: ServerService);
    }
}
declare module VizPortal {
    interface ISiteUserDatasourcesSubplaceScope extends ISiteUserPlaceScope {
    }
    class SiteUserDatasourcesSubplaceCtrl {
    }
}
declare module VizPortal {
    interface ISiteUserSubscriptionsSubplaceScope extends ISiteUserPlaceScope {
    }
    class SiteUserSubscriptionsSubplaceCtrl {
    }
}
declare module VizPortal {
    interface ISiteUserViewsSubplaceScope extends ISiteUserPlaceScope {
    }
    class SiteUserViewsSubplaceCtrl {
    }
}
declare module VizPortal {
    interface ISiteUserWorkbooksSubplaceScope extends ISiteUserPlaceScope {
    }
    class SiteUserWorkbooksSubplaceCtrl {
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteZiplogParams {
    }
    interface IDeleteZiplogResult {
    }
    class DeleteZiplogRequest extends Request<IDeleteZiplogParams, IDeleteZiplogResult> {
        constructor(params?: IGetZiplogInfoParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetZiplogInfoParams {
    }
    interface IGetZiplogInfoResult {
        status: string;
        date?: string;
        size?: number;
    }
    class GetZiplogInfoRequest extends Request<IGetZiplogInfoParams, IGetZiplogInfoResult> {
        constructor(params?: IGetZiplogInfoParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGetZiplogUriParams {
    }
    interface IGetZiplogUriResult {
        data: string;
    }
    class GetZiplogUriRequest extends Request<IGetZiplogUriParams, IGetZiplogUriResult> {
        constructor(params?: IGetZiplogUriParams);
    }
}
declare module VizPortal.ServerApi {
    interface IGenerateZiplogParams {
        logsUpToDate: number;
    }
    interface IGenerateZiplogResult {
    }
    class GenerateZiplogRequest extends Request<IGenerateZiplogParams, IGenerateZiplogResult> {
        constructor(params: IGenerateZiplogParams);
    }
}
declare module VizPortal {
    interface IZiplogInfo {
        date: Date;
        size: number;
    }
}
declare module VizPortal {
    /**
     * NONE:        Ziplog available on the server
     * INPROGRESS:  Ziplog being generated
     * COMPLETE:    Ziplog available and ready for download
     */
    class ZiplogState {
        static NONE: string;
        static INPROGRESS: string;
        static COMPLETE: string;
    }
    /**
     * Manage the ziplog on Server.
     */
    class ZiplogService {
        private server;
        private $q;
        private windowLocationService;
        private pollService;
        static $inject: string[];
        static ALL_DAYS: number;
        private ziplogInfo;
        private cancelPoll;
        private ziplogPollPromise;
        constructor(server: ServerService, $q: ng.IQService, windowLocationService: WindowLocationService, pollService: PollService);
        /**
         * Initiate ziplog generation. Call getInfo() after calling generate() to get a
         * promise that resolves to the generated ZiplogInfo.
         */
        generate(daysToGenerate: number): ng.IPromise<void>;
        /**
         * Retrieve the ZiplogInfo if it is `inprogress` or `complete`.
         * If ziplog is in `inprogress`, promise will resolve when ziplog is `complete`.
         * Do not call if ziplogs are `none`. The promise will never be resolved.
         * Call getState() before calling getInfo() to verify that ziplogs are not `none`.
         */
        getInfo(): ng.IPromise<IZiplogInfo>;
        /**
         * Get current state of ziplog on server.
         * See ZiplogState for all possible ziplogs states.
         */
        getState(): ng.IPromise<string>;
        /**
         * Delete ziplog from the server
         */
        remove(): ng.IPromise<void>;
        /**
         * Download the ziplog. First requests the download url, then downloads.
         */
        download(): ng.IPromise<void>;
        /**
         * Stop polling.
         */
        stopPolling(): void;
        private ziplogInfoFromResult(result);
    }
}
declare module VizPortal {
    interface IZiplogScope extends ng.IScope {
        remove: () => void;
        download: () => void;
        generate: () => void;
        isNoZiplog: () => boolean;
        isZiplogGenerating: () => boolean;
        isZiplogAvailable: () => boolean;
        state: string;
        ziplog: IZiplogInfo;
        confirmGenerateZiplogDialog: {
            daysToGenerate: number;
        };
    }
    class ZiplogCtrl {
        private $scope;
        private $translate;
        private ziplogService;
        private ConfirmActionDialog;
        private static DefaultZiplogDaysToGenerate;
        private state;
        static $inject: string[];
        constructor($scope: IZiplogScope, $translate: ng.translate.ITranslateService, ziplogService: ZiplogService, ConfirmActionDialog: ConfirmActionDialog);
        private getInfo();
        private confirmGenerateSnapshot();
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ReactDirectiveProps<T> extends React.Props<T> {
        angularContext: AngularContext;
    }
    interface ReactDirectiveSpec {
        name: string;
        componentFactory: React.Factory<any> | React.ClassicFactory<any>;
        watch?: string;
    }
    module ReactDirectiveFactory {
        /**
        * Registers an element directive that instantiates a React component with that component's factory function.
        *
        * @param name The name that the directive will be given.
        * @param component The react component factory for the component you want to instantiate.
        * @param customWatch A scope property to watch instead of the `props` object itself. This should be 'props.something'.
        *
        * Usage:
        *   ReactDirectiveFactory.create('tbAwesomeReactComponent', AwesomeReactComponent, 'props.update')
        *   will create a directive called tbAwesomeReactComponent that can be used in an angular template as follows:
        *
        *     <tb:awesome-react-component props="componentProps" />
        *
        *     `componentProps` is an object on the scope that will be passed to the React component factory as the properties parameter.
        */
        function create(directiveSpec: ReactDirectiveSpec): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IAssignPermissionsToContentsScope extends ng.IScope {
        assignPermissionsToContents: () => void;
        assignPermissionsToContentsButtonText: string;
        assignPermissionsToContentsPercent: () => number;
        assignPermissionsToContentsPending: () => boolean;
        authorizables: Set<any>;
        authorizableType: string;
        canAssignPermissionsToContents: () => boolean;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IBulkImportResultsSummaryScope extends ng.IScope {
        results: ServerApi.IBulkImportUsersFromCsvResult;
        usersSkippedMessage: string;
        usersProcessedMessage: string;
        successResults: CodeUsernamesCountMessage[];
        errorResults: CodeUsernamesCountMessage[];
    }
    interface CodeUsernamesCount {
        code: number;
        usernames: string;
        count: number;
    }
    interface CodeUsernamesCountMessage extends CodeUsernamesCount {
        message: string;
    }
    interface ErrorWithLocalizedMessage extends ServerApi.IImportUserFromCSVError {
        message: string;
    }
}
declare module VizPortal {
    class UpdateUserDisplayNameNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string, displayName: string): void;
        private errorMessageFor(error, username);
    }
    class UpdateUserEmailNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string, email: string): void;
        private errorMessageFor(error, username);
    }
    class SyncUserActionNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string): void;
        private errorMessageFor(error, username);
    }
    class ChangePasswordNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string): void;
        private errorMessageFor(error, username);
    }
    class ChangeLanguageNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string): void;
        private errorMessageFor(error, username);
    }
    class ChangeLocaleNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(result: ServerApi.IResult, username: string): void;
        private errorMessageFor(error, username);
    }
}
declare module VizPortal {
    interface IChangePasswordScope extends ng.IScope {
        busy: boolean;
        clearAndCollapseFields: () => void;
        clearAndShowFields: () => void;
        disableSaveButton: () => boolean;
        editMode: boolean;
        fields: {
            currentPassword: string;
            confirmPassword: string;
            newPassword: string;
        };
        passwordForm: ng.IFormController;
        requireCurrentPassword: boolean;
        save: () => ng.IPromise<any>;
        userId(): string;
        username(): string;
    }
}
declare module VizPortal {
    class CheckboxGroupCtrl {
        toggle: () => void;
        disabled: () => boolean;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IDataGridBodyScope extends ng.IScope {
        cells: ITemplate[];
        columnWidths: IColumnWidths;
        contentWidthsChanged: (locals: {
            contentWidths: number[];
            containerWidth: number;
        }) => any;
        rowHeight?: number;
        isRowSelected: (locals: {
            row: any;
        }) => boolean;
        rowClicked: (locals: {
            row: any;
            colIndex?: number;
        }) => any;
        rowHovered: (locals: {
            row: any;
            colIndex?: number;
        }) => any;
        rows: ISliceable<any>;
        currentRowIndex: number;
        currentRowObject: any;
        sliceChanged: (locals: {
            newSlice: ListResult<any>;
        }) => any;
        alwaysHaveCurrentRow: boolean;
        scrollControls: IScrollControls;
        scrollLeftChanged: (locals: {
            scrollLeft: number;
        }) => any;
        emptyTemplate: string;
        emptyTemplateModel: IEmptyTemplateModel;
        keepColumnWidths: boolean;
        rowsClickable: boolean;
        empty: boolean;
        layout: ILayout;
        handleSliceChanged: (newSlice: ListResult<any>) => any;
        colIndex(child: JQuery): number;
        rowIndex(child: JQuery): number;
        setHoverRow(rowElement: JQuery, locals: {
            row: any;
            colIndex?: number;
        }): void;
        setHoverRowIndex(rowIndex: number, locals: {
            row: any;
            colIndex?: number;
        }): void;
        setActiveRow(row: JQuery): void;
        setActiveRowIfHoverRow(row: JQuery): void;
        clearActiveRow(): void;
        isCurrentRowIndex: (rowIndex: number) => boolean;
        getElementsOfSelectedRows: () => JQuery;
    }
    class DataGridBodyCtrl {
        static $inject: string[];
        private $scope;
        private $element;
        private $timeout;
        private hoverRow;
        private activeRow;
        private slice;
        constructor($scope: IDataGridBodyScope, $element: JQuery, $timeout: ng.ITimeoutService, BrowserSupportService: BrowserSupportService);
        private clearActiveRow();
        private ensureCurrentRowIndexInRange();
        /**
         * Get width of the usable grid area (scrollbar not included)
         */
        private getGridWidth();
        private getBackgroundRow(rowIndex);
        private getBackgroundRows(rowIndices);
        private updateCurrentRowObject();
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    class DayCell {
        day: Date;
        otherMonth: boolean;
        selected: boolean;
        today: boolean;
        constructor(day: Date);
        dayNumber(): number;
    }
}
declare module VizPortal {
    class Calendar {
        private today;
        private firstDayOfMonth;
        private selectedDate;
        private weeks;
        constructor(month: Date);
        setToday(today: Date): void;
        private showMonth(date);
        private updateDayCells();
        private static monthOf(day);
        private static isSameDay(day1, day2);
        private isToday(day);
        private isSelected(day);
        select(day: Date): void;
        header(): string;
        dayNames(): string[];
        getWeeks(): DayCell[][];
        showNext(): void;
        showPrevious(): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IEditableTagsScope extends ng.IScope {
        onBeforeSave: (locals: {
            newTags: string[];
        }) => ng.IPromise<any>;
        buttonContainer: string;
        tagFilterState: string;
        editMode: boolean;
        readonly: boolean;
        busy: boolean;
        tagsWithCounts: ITagWithCount[];
        newTag: string;
        edit(): void;
        save(): void;
        cancel(): void;
        displayTagHtml(tag: string): string;
        filterByTag(state: string, tag: string): void;
    }
}
declare module VizPortal {
    interface IEditableTextScope extends ng.IScope {
        onBeforeSave: (locals: {
            newText: string;
        }) => ng.IPromise<any>;
        editButtonText: string;
        editMode: boolean;
        readonly: boolean;
        editable: boolean;
        invalid: boolean;
        busy: boolean;
        modelValue: string;
        viewValue: string;
        edit(): void;
        save(): void;
        cancel(): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IEditDisplayNameControls {
        isBusy: () => boolean;
        isDirty: () => boolean;
        isValid: () => boolean;
        submit: (userId: string, username: string) => ng.IPromise<any>;
    }
    interface IEditDisplayNameScope extends ng.IScope {
        busy: boolean;
        controls: IEditDisplayNameControls;
        displayName: string;
        displayNameForm: ng.IFormController;
        originalDisplayName: string;
    }
}
declare module VizPortal {
    interface IEditEmailControls {
        isBusy: () => boolean;
        isDirty: () => boolean;
        isValid: () => boolean;
        submit: (userId: string, username: string) => ng.IPromise<any>;
    }
    interface IEditEmailScope extends ng.IScope {
        busy: boolean;
        controls: IEditEmailControls;
        email: string;
        emailForm: ng.IFormController;
        originalEmail: string;
        delayUpdateEmailRequest: boolean;
    }
}
declare module VizPortal {
    interface IEditLanguageAndLocaleCtrls {
        save(): void;
        canSave(): void;
        isBusy(): void;
    }
    interface IEditLanguageAndLocaleScope extends ng.IScope {
        controls: IEditLanguageAndLocaleCtrls;
        serverUser: IServerUserInfo;
        userSettings: IUserSettings;
        onSaveComplete(): any;
        language: string;
        locale: string;
        languages: ServerApi.ILanguage[];
        locales: ServerApi.ILocale[];
        model: {
            language: string;
            locale: string;
        };
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortalReact {
    module StoreHelpers {
        function getAll<T>(sliceable: VizPortal.ISliceable<T>): Q.Promise<T[]>;
    }
}
declare module VizPortalReact {
    class FavoritesStore {
        private favorites;
        constructor(favorites: VizPortal.Favorites);
        getAll(): Q.Promise<VizPortal.ServerApi.IFavorite[]>;
    }
}
declare module VizPortal {
}
/**
* Favorite toggle for adding and removing favorites
*
* Example:
*   tb:favorite-toggle(ng-model="workbook.favorite", on-add="addFavorite()", on-remove="removeFavorite()")
*
* Attributes:
*   ng-model="workbook.favorite":   Favorite bool to be toggled
*   on-add="addFn()":               Function responsible for calling Favorites service add
*   on-remove="removeFn()":         Function responsible for calling Favorites service remove
*
*/
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IFileInputScope extends ng.IScope {
        fileUploadId: string;
        filename: string;
        required: any;
        filenameLocalizationKey: string;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ILockUnlockProjectPermissionsScope extends ng.IScope {
        showConfirmationDialog: () => void;
        buttonText: () => string;
        authorizables: Set<any>;
        authorizableType: string;
        editable: boolean;
        editabilityShortMessage: string;
        editabilityLongMessage: string;
        permissionChangeSource: {
            sources: LockUnlockProjectPermissionsState[];
        };
        permissionsDialogMessage: string;
        warningMessage: string;
        canLockProjectPermissions: () => boolean;
        FeatureFlagProjectControlledPermissionsEnabled: boolean;
        permissionState: any;
        lockState: LockUnlockProjectPermissionsState;
        percentComplete: number;
        busyUnlocking: boolean;
        getLockIconClass: () => string;
        isChangeSourceLocked: () => boolean;
    }
}
declare module VizPortal {
    interface ILoginInScope extends ng.IScope {
        showSigningIn: boolean;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IOmniboxScope extends ng.IScope {
        searchText: string;
        showResults: boolean;
        showNoResults: boolean;
        selectedIndex: number;
        maxResultsPerType: number;
        textBoxName: string;
        datasources: ListResult<IDataSourceInfo>;
        projects: ListResult<IProjectInfo>;
        users: ListResult<ServerApi.IUser>;
        views: ListResult<IViewInfo>;
        workbooks: ListResult<IWorkbookInfo>;
        popupMaxHeight: () => number;
        close: () => any;
        isItemSelected: (type: string, index: number) => boolean;
        selectItem: (type: string, index: number) => void;
        itemHref: (state: string, params: any) => string;
        keydown: ($event: JQueryKeyEventObject) => any;
        seeAllHref: (state: string) => string;
        showSeeAll: (list: ListResult<any>, type: string) => boolean;
        tooltipForDataSource: (datasource: IDataSourceInfo) => string;
        tooltipForView: (view: IViewInfo) => string;
        tooltipForWorkbook: (workbook: IWorkbookInfo) => string;
        clearSearch: () => void;
    }
    class OmniboxCtrl {
        private $scope;
        private $state;
        private $location;
        private $translate;
        private $window;
        private server;
        private datasources;
        private projects;
        private users;
        private views;
        private workbooks;
        private static MaxResultsPerType;
        private static SpaceLeftWhenMaxHeight;
        private static TextBoxName;
        private currentRequestProgress;
        private selectedIndex;
        private maxSelectedIndex;
        private startIndexForType;
        static $inject: string[];
        constructor($scope: IOmniboxScope, $state: ng.ui.IStateService, $location: ng.ILocationService, $translate: ng.translate.ITranslateService, $window: ng.IWindowService, server: ServerService, datasources: DataSources, projects: Projects, users: Users, views: Views, workbooks: Workbooks);
        private updateResults();
        private updateType<T>(query, sortField, order, updateFn);
        private updateStartIndexes();
        private itemsForType(list);
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    enum Corner {
        TopLeft = 0,
        TopRight = 1,
        BottomLeft = 2,
        BottomRight = 3,
    }
    interface IPosition {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    }
    interface IStackedElement {
        contentElement: JQuery;
        getContentElementPosition: () => IPosition;
        destroy?(): void;
        setScope?(scope: ng.IScope): void;
    }
    class StackedElement implements IStackedElement {
        private positionCorner;
        private positionElement;
        private contentCorner;
        contentElement: JQuery;
        private rendered;
        private scope;
        private cornerPosition;
        private updatePositionListener;
        constructor(positionCorner: Corner, positionElement: JQuery, contentCorner: Corner, contentElement: JQuery);
        setScope(scope: ng.IScope): void;
        destroy(): void;
        private getPositionX(positionCorner, positionOffset, positionSize);
        private getPositionY(positionCorner, positionOffset, positionSize);
        private getContentLeft(contentCorner, positionX, contentSize);
        private getContentTop(contentCorner, positionY, contentSize);
        private flipVertical(corner);
        private flipHorizontal(corner);
        private contentWidth();
        private contentHeight();
        private calculateDisplayPosition(positionCorner, positionSize, positionOffset, contentCorner, contentSize);
        private invalidHorizontalPosition(position, contentWidth, windowWidth);
        private invalidVerticalPosition(position, contentHeight, windowHeight);
        private getContentSize();
        private getPositionSize();
        private getWindowSize();
        private updateContentElementPosition();
        getContentElementPosition(): IPosition;
    }
    class StackedElementsService {
        stackedElements: IStackedElement[];
        static $inject: string[];
        constructor();
        createStackedElement(positionCorner: Corner, positionElement: JQuery, contentCorner: Corner, contentElement: JQuery): IStackedElement;
        addStackedElement(element: IStackedElement): IStackedElement;
        removeStackedElement(element: IStackedElement): void;
    }
}
declare module VizPortal {
    class Popup {
        private getPositionElement;
        private getContentElement;
        private stackedElementsService;
        private stackedElement;
        constructor(getPositionElement: () => JQuery, getContentElement: () => JQuery, stackedElementsService: StackedElementsService);
        show(positionCorner: Corner, contentCorner: Corner): void;
        hide(): void;
    }
}
declare module VizPortal {
    interface IPopupScope extends ng.IScope {
        show: boolean;
        positionCorner: string;
        contentCorner: string;
        getPositionElement: () => JQuery;
    }
    class PopupCtrl {
        static $inject: string[];
        popup: Popup;
        private scope;
        constructor($scope: IPopupScope, $element: JQuery, $transclude: (cloneFn: (clone: JQuery) => any) => any, stackedElementService: StackedElementsService);
        hidePopup(): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IPopupMenuScope extends ng.IScope {
        direction: string;
        disabled: boolean;
        opened: (locals: any) => any;
        closed: () => any;
        popupMenu: PopupMenuCtrl;
    }
    class PopupMenuCtrl {
        private $element;
        static $inject: string[];
        private scope;
        private _open;
        private button;
        private content;
        contentWidth: number;
        contentMatchButtonWidth: boolean;
        constructor($element: JQuery, $scope: IPopupMenuScope);
        setButton(button: JQuery): void;
        getButtonWidth(): number;
        setContent(content: ng.ITranscludeFunction): void;
        getContent(): ng.ITranscludeFunction;
        getContentScope(): {
            popupMenu: {
                button: JQuery;
                close: () => void;
            };
        };
        isUp(): boolean;
        positionCorner(): string;
        contentCorner(): string;
        isDisabled(): boolean;
        isOpen(): boolean;
        keydown($event: JQueryKeyEventObject): void;
        toggle(): void;
        open(): void;
        close(focusElement?: JQuery): void;
        mousedownOutside(downEvent: JQueryMouseEventObject): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IProjectUnlockProgressBar extends ng.IScope {
        percentComplete: number;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IResetStartPageScope extends ng.IScope {
        userPageOverridden(): boolean;
        userSettings: IUserSettings;
        busy: boolean;
        resetStartPage(): void;
        onSuccess(): void;
        serverUser: IUserInfo;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ISignInLogoScope extends ng.IScope {
        signInLogo: ILogo;
    }
}
declare module VizPortal {
    interface ISiteRolePermissions {
        role: string;
        webAccess?: boolean;
        interact?: boolean;
        publish?: boolean;
        manage?: boolean;
        divider?: boolean;
    }
    module SiteRolePermissionsTable {
        function permissionsForRoles(siteRoles: string[]): ISiteRolePermissions[];
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ISortToolScope extends ng.IScope {
        sortKey: string;
        sortAscending: boolean;
        menuOpened(closeFn: () => any): void;
        currentSort(): ISortToolItem;
        sortBy(key: string): void;
        items: ISortToolItem[];
    }
    interface ISortToolItem {
        key: string;
        label: string;
    }
    class SortToolCtrl {
        static Ascending: string;
        static Descending: string;
        static $inject: string[];
        private static INVALID_ITEM;
        private items;
        private itemIndex;
        constructor($scope: ISortToolScope, $element: JQuery, $location: ng.ILocationService);
        add(item: ISortToolItem): void;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ITagWithCount {
        name: string;
        count?: number;
        added?: boolean;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    var TextBoxMixedValues: string;
}
declare module VizPortal {
    interface ITextDropdownOption {
        value: string;
        translate: string;
    }
}
declare module VizPortal {
    interface ITextileConverter {
        makeHtml(text: string): string;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface IUpdateSiteLogoFormScope extends ng.IScope {
        iframeId: string;
        endpoint: string;
        xsrfToken: string;
        resetToDefault: boolean;
        file: File;
        filename: string;
        previewUrl: string;
        errorMessage: string;
        formIsValid: boolean;
        formIsDirty: boolean;
        dragAndDropEnabled: boolean;
        previewEnabled: boolean;
        form: JQuery;
        fileInput: JQuery;
        dropArea: JQuery;
        previewImgWrapper: JQuery;
        init: () => ng.IPromise<any>;
        handleFormSubmitResult: (result: ServerApi.IResult) => void;
        submitSiteLogoForm: () => ng.IPromise<any>;
        usingCustomLogo: () => boolean;
        handleResetToDefaultClick: () => void;
        getPreviewUrl: () => string;
        onFileAddedOrChanged: (filename: string, file: File) => void;
        onFileDrop: (file: File) => void;
        onFileInputChange: () => void;
    }
    class UpdateSiteLogoCtrl {
        private static SupportedImageTypes;
        private static MaxImageSize;
        static $inject: string[];
        constructor($scope: IUpdateSiteLogoFormScope, $cookies: IVizPortalCookies, $q: ng.IQService, $timeout: ng.ITimeoutService, $translate: ng.translate.ITranslateService, RestApiPrefix: string, ServerService: ServerService, LogoService: LogoService, BrowserSupportService: BrowserSupportService);
    }
}
declare module VizPortal {
    interface IUploadIframeScope extends ng.IScope {
        handleResult(result: any): any;
        iframeId: string;
    }
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
}
declare module VizPortal {
    interface ICredentialTypeFilter {
        (credentialType: string): string;
    }
}
declare module VizPortal {
    interface IStringStringFilter {
        (value: string): string;
    }
    interface INumberStringFilter {
        (value: number): string;
    }
}
declare module VizPortal {
}
declare module VizPortal {
    interface IListFilter {
        (items: string[]): string;
    }
}
declare module VizPortal {
    interface ILocalizedCountFilter {
        (count: number): string;
    }
}
declare module VizPortal {
    interface ILocalizedDateFilter {
        (value: any): string;
    }
}
declare module VizPortal {
    interface ILocalizedPercentFilter {
        (value: number): string;
    }
}
declare module VizPortal {
    interface IPadFilter {
        (numberToPad: number, length: number): string;
    }
}
declare module VizPortal {
    interface IRemoteRefreshScheduleTypeNameFilter {
        (remoteRefreshType: string): string;
    }
}
declare module VizPortal {
    interface IScheduleActionNameFilter {
        (scheduleAction: string): string;
    }
}
declare module VizPortal {
    interface IScheduleFrequencyDescriptionFilter {
        (schedule: ServerApi.ISchedule): string;
    }
}
declare module VizPortal {
    interface IScheduleTypeNameFilter {
        (scheduleType: string): string;
    }
}
declare module VizPortal {
    interface ISiteRoleFilter {
        (siteRole: string): string;
    }
}
declare module VizPortalReact {
    interface IReactTranslateService {
        (translationId: string, interpolateParams?: any, interpolationId?: string): string;
    }
}
declare module VizPortalReact {
    class Location {
        static instance: Location;
        setUrl(url: string): void;
        search(): string;
    }
}
declare module VizPortalReact {
    class SearchBox extends React.Component<SearchBox.Props, any> {
        static displayName: string;
        static element: React.Factory<SearchBox.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module SearchBox {
        interface Props extends React.Props<SearchBox> {
            translate?: IReactTranslateService;
            style: any;
        }
    }
}
declare module VizPortalReact {
    class FilteringListBox extends React.Component<FilteringListBox.Props, FilteringListBox.State> {
        static displayName: string;
        static sectionSize: number;
        static ItemRefPrefix: string;
        static element: React.Factory<FilteringListBox.Props>;
        state: FilteringListBox.State;
        render(): React.DOMElement<React.HTMLAttributes>;
        private renderSections();
        private matchPrefixesOnly();
        private searchTermChanged(event);
        private resetScrollPosition();
        private handleKeyDown(event);
        private scrollItemIntoView();
        componentDidMount(): void;
        private updateMaxCountDigitsAndIcons();
        private measureRowHeight();
        private onScroll(event);
        private updateVisibleSectionIndexes();
        private calculateVisibleSectionIndexes();
        private fetch();
    }
    module FilteringListBox {
        interface Props extends React.Props<FilteringListBox> {
            itemStore: ItemStore;
            searchBoxPlaceholder?: string;
            matchPrefixesOnly?: boolean;
            style?: any;
            itemSelected?: (item: Item) => void;
            locationService?: Location;
        }
        interface State {
            data?: Item[];
            selectedIndex?: number;
            searchTerm?: string;
            searchBoxHeight?: number;
            measuredRowHeight?: number;
            indexOfFirstVisibleSection?: number;
            indexOfLastVisibleSection?: number;
            anyIcons?: boolean;
            maxCountDigits?: number;
        }
        interface Item {
            label: string;
            url?: string;
            icon?: string;
            count?: number;
            isDivider?: boolean;
        }
        interface ItemStore {
            getItems(filter: string, start: number, end: number): Q.Promise<Item[]>;
        }
        class Row extends React.Component<Row.Props, Row.State> {
            static displayName: string;
            static element: React.Factory<Row.Props>;
            state: Row.State;
            private handleMouseOver();
            private handleMouseOut();
            render(): React.DOMElement<React.HTMLAttributes>;
            private itemLabel();
        }
        module Row {
            interface Props extends React.Props<Row> {
                item: Item;
                selected: boolean;
                showIcon: boolean;
                searchTerm?: string;
                matchPrefixesOnly: boolean;
                maxCountDigits: number;
                onClick?: () => void;
            }
            interface State {
                hovered?: boolean;
            }
        }
        interface FilteredData {
            fetchedRows: Item[];
            estimatedTotalRowCount: number;
        }
        module Filter {
            function filterDataBySearchTerm(data: Item[], searchTerm: string, matchPrefixesOnly: boolean): FilteredData;
            function formatMatch(searchTerm: string, target: string, matchPrefixesOnly: boolean): string;
        }
    }
}
declare module VizPortalReact {
    class Menu extends React.Component<Menu.Props, Menu.State> {
        static displayName: string;
        private static nextId;
        static element: React.Factory<Menu.Props>;
        private id;
        state: Menu.State;
        componentDidMount(): void;
        private closeMenuOnMouseDownOutside();
        componentWillUnmount(): void;
        private getEventNamespace();
        render(): React.DOMElement<React.HTMLAttributes>;
        private onKeyDown(event);
        private toggleMenu();
        private isMenuOpen();
        private openMenu();
        closeMenu(): void;
    }
    module Menu {
        interface Props extends React.Props<Menu> {
            menuButtonFactory: React.Factory<ButtonProps>;
            menuPanelFactory: React.Factory<any>;
            onBeforeMenuOpen?: () => Q.Promise<any>;
            style?: any;
            menuPanelStyle?: any;
            tbTestId?: string;
        }
        interface ButtonProps extends React.Props<any> {
            hovered?: boolean;
            menuOpen?: boolean;
        }
        interface State {
            open?: boolean;
            hovered?: boolean;
        }
        class ButtonWrapper extends React.Component<ButtonWrapper.Props, ButtonWrapper.State> {
            static displayName: string;
            static element: React.Factory<ButtonWrapper.Props>;
            state: ButtonWrapper.State;
            render(): React.DOMElement<React.HTMLAttributes>;
            private handleMouseOver();
            private handleMouseOut();
        }
        module ButtonWrapper {
            interface Props extends React.Props<ButtonWrapper> {
                onClick: () => void;
                menuOpen: boolean;
                menuButtonFactory: React.Factory<Menu.ButtonProps>;
            }
            interface State {
                hovered?: boolean;
            }
        }
        class PanelWrapper extends React.Component<PanelWrapper.Props, PanelWrapper.State> {
            static displayName: string;
            static element: React.Factory<PanelWrapper.Props>;
            state: PanelWrapper.State;
            componentDidMount(): void;
            render(): React.DOMElement<React.HTMLAttributes>;
        }
        module PanelWrapper {
            interface Props extends React.Props<PanelWrapper> {
                style: any;
            }
            interface State {
                alignRight?: boolean;
            }
        }
    }
}
declare module VizPortalReact {
    class FavoritesMenuPanel extends React.Component<FavoritesMenuPanel.Props, FavoritesMenuPanel.State> {
        static displayName: string;
        static element: React.Factory<FavoritesMenuPanel.Props>;
        state: FavoritesMenuPanel.State;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module FavoritesMenuPanel {
        interface Props extends React.Props<FavoritesMenuPanel> {
            translate: IReactTranslateService;
            data: FilteringListBox.Item[];
            itemSelected: () => void;
        }
        interface State {
            filteredData: FilteringListBox.Item[];
        }
    }
}
declare module VizPortalReact {
    class HeaderMenuButton extends React.Component<HeaderMenuButton.Props, any> {
        static displayName: string;
        static element: React.Factory<HeaderMenuButton.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module HeaderMenuButton {
        interface Props extends Menu.ButtonProps {
            iconUrl?: string;
            label?: string;
            style?: any;
        }
    }
}
declare module VizPortalReact {
    class FavoritesMenu extends React.Component<FavoritesMenu.Props, FavoritesMenu.State> {
        static displayName: string;
        static element: React.Factory<FavoritesMenu.Props>;
        state: FavoritesMenu.State;
        render(): React.ReactElement<Menu.Props>;
        private loadFavorites();
    }
    module FavoritesMenu {
        interface Props extends VizPortal.ReactDirectiveProps<FavoritesMenu> {
            favoritesStore: FavoritesStore;
            translate: IReactTranslateService;
            siteUrls: SiteUrls;
            style?: any;
        }
        interface State {
            data?: FilteringListBox.Item[];
        }
    }
}
declare module VizPortalReact {
    class SiteStore {
        private siteNames;
        constructor(siteNames: VizPortal.SiteNameSansIds);
        getAll(): Q.Promise<VizPortal.ServerApi.ISiteNameSansId[]>;
    }
}
declare module VizPortalReact {
    class SiteSwitcherMenuButton extends React.Component<SiteSwitcherMenuButton.Props, any> {
        static displayName: string;
        static element: React.Factory<SiteSwitcherMenuButton.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module SiteSwitcherMenuButton {
        interface Props extends Menu.ButtonProps {
            buttonTitle: string;
        }
    }
}
declare module VizPortalReact {
    class SiteSwitcherMenuPanel extends React.Component<SiteSwitcherMenuPanel.Props, any> {
        static displayName: string;
        static element: React.Factory<SiteSwitcherMenuPanel.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module SiteSwitcherMenuPanel {
        interface Props extends React.Props<SiteSwitcherMenuPanel> {
            translate: IReactTranslateService;
            sites: FilteringListBox.Item[];
            itemSelected: () => void;
            serverUrls: ServerUrls;
            onServerPage: boolean;
        }
    }
}
declare module VizPortalReact {
    class SiteSwitcher extends React.Component<SiteSwitcher.Props, SiteSwitcher.State> {
        static displayName: string;
        static element: React.Factory<SiteSwitcher.Props>;
        state: SiteSwitcher.State;
        render(): React.ReactElement<Menu.Props>;
        private loadSites();
        private onServerPage();
        private siteUrl(site);
    }
    module SiteSwitcher {
        interface Props extends React.Props<SiteSwitcher> {
            siteStore: SiteStore;
            translate: IReactTranslateService;
            location?: Location;
            navLocation: Navigation.Location;
            currentSite: VizPortal.ServerApi.ISiteNameWithId;
            serverUrls: ServerUrls;
        }
        interface State {
            sites?: FilteringListBox.Item[];
        }
    }
}
declare module VizPortalReact {
    class AlertActions {
        private alerts;
        private extractTasks;
        private datasources;
        private workbooks;
        constructor(alerts: VizPortal.Alerts, extractTasks: VizPortal.ExtractTasks, datasources: VizPortal.DataSources, workbooks: VizPortal.Workbooks);
        getAlertCount(): void;
        getAlerts(): void;
        tryAgain(alert: VizPortal.IAlertInfo): void;
    }
    function GetAlertCountAction(alerts: VizPortal.Alerts): void;
    module GetAlertCountAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            count: number;
        }
    }
    function GetAlertsAction(alerts: VizPortal.Alerts): void;
    module GetAlertsAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            alerts: VizPortal.IAlertListInfo;
        }
    }
    function AlertTryAgainAction(alertId: string): void;
    module AlertTryAgainAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            alertId: string;
        }
    }
}
declare module VizPortalReact {
    class AlertsStore extends Store<Store.ChangeListener> {
        static AlertsPending: VizPortal.IAlertListInfo;
        private alertList;
        private count;
        constructor();
        getCount(): number;
        getAlerts(): VizPortal.IAlertListInfo;
    }
}
declare module VizPortalReact {
    class AlertsMenuPanel extends React.Component<AlertsMenuPanel.Props, AlertsMenuPanel.State> {
        static displayName: string;
        static element: React.Factory<AlertsMenuPanel.Props>;
        private static alertsMenuContainerStyle;
        componentDidMount(): void;
        render(): React.DOMElement<React.HTMLAttributes>;
        private alertItems();
    }
    module AlertsMenuPanel {
        interface Props extends React.Props<AlertsMenuPanel> {
            translate: IReactTranslateService;
            itemSelected: () => void;
            alertsStore: AlertsStore;
            alertActions: AlertActions;
            siteUrls: SiteUrls;
        }
        interface State {
        }
    }
    class AlertsMenuItem extends React.Component<AlertsMenuItem.Props, AlertsMenuItem.State> {
        static displayName: string;
        static element: React.Factory<AlertsMenuItem.Props>;
        static remoteRefreshStatusCodes: number[];
        static labelStyle: any;
        render(): React.DOMElement<React.HTMLAttributes>;
        private labelCell(text);
        private title();
        private failureType(statusCode);
        private dateTimeOrNever(date);
        private tryAgainLink();
        private connectionDetailsLink();
        private isEditableFailure();
        private isRemoteRefresh();
    }
    module AlertsMenuItem {
        interface Props extends React.Props<AlertsMenuItem> {
            translate: IReactTranslateService;
            alertActions: AlertActions;
            alert: VizPortal.IAlertInfo;
            siteUrls: SiteUrls;
            itemSelected: () => void;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class AlertsMenu extends React.Component<AlertsMenu.Props, AlertsMenu.State> {
        static displayName: string;
        static element: React.Factory<AlertsMenu.Props>;
        private boundOnAlertsStoreChange;
        constructor(props: AlertsMenu.Props);
        componentDidMount(): void;
        componentWillUnmount(): void;
        private onAlertsStoreChange();
        private getAlertCount();
        state: AlertsMenu.State;
        render(): React.ReactElement<Menu.Props>;
    }
    module AlertsMenu {
        interface Props extends VizPortal.ReactDirectiveProps<AlertsMenu> {
            alertsStore: AlertsStore;
            alertActions: AlertActions;
            translate: IReactTranslateService;
            style?: any;
            siteUrls: SiteUrls;
        }
        interface State {
            alertCount?: number;
        }
    }
}
declare module VizPortalReact {
    class HelpMenuPanel extends React.Component<HelpMenuPanel.Props, HelpMenuPanel.State> {
        static displayName: string;
        static element: React.Factory<HelpMenuPanel.Props>;
        private static helpMenuContainerStyle;
        private boundItemSelected;
        private boundShowAbout;
        private boundShowGettingStarted;
        constructor(props: HelpMenuPanel.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
        private renderSearchBox();
        private renderMenuItems();
    }
    module HelpMenuPanel {
        interface Props extends HelpMenu.Props {
            itemSelected: () => void;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class HelpMenu extends React.Component<HelpMenu.Props, HelpMenu.State> {
        static displayName: string;
        static element: React.Factory<HelpMenu.Props>;
        render(): React.ReactElement<Menu.Props>;
    }
    module HelpMenu {
        interface Props extends VizPortal.ReactDirectiveProps<HelpMenu> {
            translate: IReactTranslateService;
            helpActions: HelpActions;
            style?: any;
            isOfflineHelpEnabled: boolean;
            showGettingStartedLink: boolean;
            serverHelpLabel: string;
            serverHelpUrl: string;
            supportUrl: string;
            serverName: string;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class HeaderSearchBox extends React.Component<HeaderSearchBox.Props, HeaderSearchBox.State> {
        static displayName: string;
        static element: React.Factory<HeaderSearchBox.Props>;
        state: HeaderSearchBox.State;
        private boundBlur;
        private boundClick;
        private boundMouseEnter;
        private boundMouseLeave;
        private handleClick();
        private handleBlur();
        render(): React.DOMElement<React.HTMLAttributes>;
        private contents();
    }
    module HeaderSearchBox {
        interface Props extends VizPortal.ReactDirectiveProps<HeaderSearchBox> {
        }
        interface State {
            hovered?: boolean;
            open?: boolean;
        }
    }
}
declare module VizPortalReact {
    class Logo extends React.Component<Logo.Props, any> {
        static displayName: string;
        static element: React.Factory<Logo.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module Logo {
        interface Props extends React.Props<Logo> {
            siteUrls: SiteUrls;
            logo: VizPortal.ILogo;
        }
    }
}
declare module VizPortalReact {
    class HeaderMenuItem extends React.Component<HeaderMenuItem.Props, HeaderMenuItem.State> {
        static displayName: string;
        static element: React.Factory<HeaderMenuItem.Props>;
        private static linkStyle;
        private boundMouseEnter;
        private boundMouseLeave;
        state: HeaderMenuItem.State;
        constructor(props: HeaderMenuItem.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module HeaderMenuItem {
        interface Props extends React.Props<HeaderMenuItem> {
            label: string;
            url?: string;
            isDisabled?: boolean;
            title?: string;
            onClick?: () => void;
            target?: string;
        }
        interface State {
            hovered: boolean;
        }
    }
}
declare module VizPortalReact {
    class UserMenuPanel extends React.Component<UserMenuPanel.Props, UserMenuPanel.State> {
        static displayName: string;
        static element: React.Factory<UserMenuPanel.Props>;
        private static userMenuContainerStyle;
        private boundItemSelected;
        private boundSignout;
        private boundChangeUserStartPage;
        private boundChangeDefaultStartPage;
        constructor(props: UserMenuPanel.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module UserMenuPanel {
        interface Props extends React.Props<UserMenuPanel> {
            translate: IReactTranslateService;
            siteUrls: SiteUrls;
            serverUrls: ServerUrls;
            userActions: UserActions;
            itemSelected: () => void;
            user: VizPortal.IUserInfo;
            location: Navigation.Location;
            isLogoutEnabled: boolean;
            isSessionMultiSite: boolean;
            isSessionServerAdmin: boolean;
            authenticationType: string;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class UserMenu extends React.Component<UserMenu.Props, UserMenu.State> {
        static displayName: string;
        static element: React.Factory<UserMenu.Props>;
        render(): React.ReactElement<Menu.Props>;
    }
    module UserMenu {
        interface Props extends VizPortal.ReactDirectiveProps<UserMenu> {
            translate: IReactTranslateService;
            siteUrls: SiteUrls;
            serverUrls: ServerUrls;
            userActions: UserActions;
            style?: any;
            user: VizPortal.IUserInfo;
            location: Navigation.Location;
            isLogoutEnabled: boolean;
            isSessionMultiSite: boolean;
            isSessionServerAdmin: boolean;
            authenticationType: string;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class UserActions {
        private serverService;
        private userSettingsActions;
        constructor(serverService: VizPortal.ServerService, userSettingsActions: VizPortal.UserSettingsActions);
        signout(): void;
        changeUserStartPage(): void;
        changeDefaultStartPage(): void;
    }
}
declare module VizPortalReact {
    class TopBar extends React.Component<TopBar.Props, TopBar.State> {
        static displayName: string;
        static element: React.Factory<TopBar.Props>;
        static menuButtonStyle: {
            marginRight: number;
            verticalAlign: string;
        };
        state: TopBar.State;
        render(): React.DOMElement<React.HTMLAttributes>;
        private onServerPage();
        private logo();
        private tableCell(key, content, style?);
        private siteSwitcher();
        private searchBox();
        private menus();
        private alertsMenu();
        private favoritesMenu();
        private helpMenu();
        private userMenu();
        private navigation();
    }
    module TopBar {
        interface Props extends VizPortal.ReactDirectiveProps<TopBar> {
            logo: VizPortal.ILogo;
            siteStore: SiteStore;
            favoritesStore: FavoritesStore;
            alertsStore: AlertsStore;
            alertActions: AlertActions;
            userActions: UserActions;
            helpActions: HelpActions;
            translate: IReactTranslateService;
            location?: Location;
            navLocation: Navigation.Location;
            currentSite: VizPortal.ServerApi.ISiteNameWithId;
            user: VizPortal.IUserInfo;
            siteUrls: SiteUrls;
            serverUrls: ServerUrls;
            isLogoutEnabled: boolean;
            isSessionMultiSite: boolean;
            isSessionServerAdmin: boolean;
            authenticationType: string;
            isOfflineHelpEnabled: boolean;
            showGettingStartedLink: boolean;
            serverHelpLabel: string;
            serverHelpUrl: string;
            supportUrl: string;
            serverName: string;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class TypeaheadFilterButton extends React.Component<TypeaheadFilterButton.Props, any> {
        static displayName: string;
        static element: React.Factory<TypeaheadFilterButton.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module TypeaheadFilterButton {
        interface Props extends Menu.ButtonProps {
            buttonTitle: string;
        }
    }
}
declare module VizPortalReact {
    class TypeaheadFilterPanel extends React.Component<TypeaheadFilterPanel.Props, any> {
        static displayName: string;
        static element: React.Factory<TypeaheadFilterPanel.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module TypeaheadFilterPanel {
        interface Props extends React.Props<TypeaheadFilterPanel> {
            itemStore: FilteringListBox.ItemStore;
            translate: IReactTranslateService;
            matchPrefixesOnly: boolean;
            itemSelected: () => void;
        }
    }
}
declare module VizPortalReact {
    class TypeaheadFilter extends React.Component<TypeaheadFilter.Props, TypeaheadFilter.State> {
        static displayName: string;
        static element: React.Factory<TypeaheadFilter.Props>;
        private cachedFieldValues;
        private lastFilter;
        state: TypeaheadFilter.State;
        render(): React.ReactElement<Menu.Props>;
        private resetCachedFieldValues();
        private initializeCachedFieldValues(searchTerm);
        private addParameter(originalUrl, param, value);
    }
    module TypeaheadFilter {
        interface Props extends React.Props<TypeaheadFilter> {
            filter: VizPortal.IFilterControl;
            translate: IReactTranslateService;
            getFieldValueQuery: () => VizPortal.FieldValuesQuery;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class PermissionLockStatus extends React.Component<PermissionLockStatus.Props, PermissionLockStatus.State> {
        static displayName: string;
        static element: React.Factory<PermissionLockStatus.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module PermissionLockStatus {
        interface Props extends React.Props<PermissionLockStatus> {
            translate: IReactTranslateService;
            lockState: VizPortal.LockUnlockProjectPermissionsState;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class OffsetCorrector {
        private boundRect;
        constructor(element: Element);
        correctHorizontalOffset(element: Element): number;
    }
    class Sparkline extends React.Component<Sparkline.Props, Sparkline.State> {
        static displayName: string;
        static element: React.Factory<Sparkline.Props>;
        static LineWidth: number;
        static LineColor: string;
        static BackgroundColor: string;
        static TextBuffer: number;
        static DefaultPadding: {
            paddingTop: number;
            paddingRight: number;
            paddingBottom: number;
            paddingLeft: number;
        };
        static CircleStyleEnd: {
            r: number;
            strokeWidth: number;
            fill: string;
        };
        static CircleStyleMax: {
            r: number;
            strokeWidth: number;
            fill: string;
            stroke: string;
        };
        static CircleStyleMin: {
            r: number;
            strokeWidth: number;
            fill: string;
        };
        static LabelStyle: {
            fontFamily: string;
            fontSize: number;
            fill: string;
        };
        private normalize;
        constructor(props: Sparkline.Props);
        private measureTextAndSetOffsets();
        private defaultState(props);
        componentWillReceiveProps(nextProps: Sparkline.Props): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): React.DOMElement<React.SVGAttributes>;
        private path();
        private circleAtDataPoint(spec);
        private labelAtDataPoint(spec);
        private getPointsToLabel(dataPoints);
    }
    module Sparkline {
        interface Props extends React.Props<Sparkline> {
            dataPoints: number[];
            width: number;
            height: number;
        }
        interface State {
            readyForFullRender: boolean;
            dataPointsToLabel: DataPointLabelSpec[];
        }
        interface DataPointLabelSpec {
            key: string;
            index: number;
            circleStyle: any;
            above: boolean;
            xOffset?: number;
        }
    }
    class SparklineWithTitle extends React.Component<SparklineWithTitle.Props, SparklineWithTitle.State> {
        static displayName: string;
        static element: React.Factory<SparklineWithTitle.Props>;
        static TitleStyle: {
            fontFamily: string;
            fontSize: number;
            color: string;
            marginBottom: number;
            textAlign: string;
        };
        static CaptionStyle: {
            fontFamily: string;
            fontSize: number;
            color: string;
            marginTop: number;
            textAlign: string;
        };
        render(): React.DOMElement<React.DOMAttributes>;
    }
    module SparklineWithTitle {
        interface Props extends React.Props<SparklineWithTitle> {
            title?: string;
            caption?: string;
            sparklineProps: Sparkline.Props;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class StackedComponentStore extends Store<Store.ChangeListener> {
        static ChangeEvent: string;
        private static _instance;
        static instance(): StackedComponentStore;
        private stackedComponents;
        constructor();
        handleAction(action: Dispatcher.Payload): void;
        getAll(): React.ReactElement<any>[];
        private addStackedComponent(component);
        private removeStackedComponent(component);
    }
}
declare module VizPortalReact {
    class ComponentStacker extends React.Component<any, ComponentStacker.State> {
        static displayName: string;
        static element: React.Factory<any>;
        private static getStackedComponentsState();
        state: ComponentStacker.State;
        constructor();
        render(): React.DOMElement<React.HTMLAttributes>;
        componentDidMount(): void;
        componentWillUnmount(): void;
        private refresh();
    }
    module ComponentStacker {
        interface State {
            allStackedComponents: React.ReactElement<any>[];
        }
    }
}
declare module VizPortalReact {
    class ThumbnailImage extends React.Component<ThumbnailImage.Props, ThumbnailImage.State> {
        static displayName: string;
        static element: React.Factory<ThumbnailImage.Props>;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module ThumbnailImage {
        interface Props extends React.Props<ThumbnailImage> {
            url: string;
            tbTestId: string;
            style?: any;
            className?: string;
        }
        interface State {
        }
    }
}
declare module VizPortalReact {
    class ActionMenuButton extends React.Component<any, any> {
        static displayName: string;
        static element: React.Factory<any>;
        constructor();
        render(): React.DOMElement<React.HTMLAttributes>;
    }
}
declare module VizPortalReact {
    class ActionMenuItem extends React.Component<ActionMenuItem.Props, any> {
        static displayName: string;
        static element: React.Factory<ActionMenuItem.Props>;
        constructor(props: ActionMenuItem.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module ActionMenuItem {
        interface Props extends React.Props<ActionMenuItem> {
            actionButton: VizPortal.IActionButton<any>;
            selectedItems: VizPortal.Set<VizPortal.INamedItemInfo>;
            actionMenuContext: any;
            detailedItem: any;
            allowedActions: any;
            contentSubplaceScope: VizPortal.IContentSubplaceScope;
        }
    }
}
declare module VizPortalReact {
    function AddStackedComponentAction(component: React.ReactElement<any>): void;
    module AddStackedComponentAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            stackedComponent: React.ReactElement<any>;
        }
    }
}
declare module VizPortalReact {
    function RemoveStackedComponentAction(component: React.ReactElement<any>): void;
    module RemoveStackedComponentAction {
        var Type: string;
        interface Payload extends Dispatcher.Payload {
            stackedComponent: React.ReactElement<any>;
        }
    }
}
declare module VizPortal {
    module MousedownOutsideDetector {
        function attach(element: JQuery, getIdFn: (element: JQuery) => string, downOutsideFn: (mousedownEvent: JQueryMouseEventObject) => any): () => void;
    }
}
declare module VizPortalReact {
    class Popup extends React.Component<Popup.Props, any> {
        static displayName: string;
        static element: React.Factory<Popup.Props>;
        private static nextId;
        private detachMousedownOutsideDetector;
        constructor(props: Popup.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
        componentDidMount(): void;
        componentWillUnmount(): void;
    }
    module Popup {
        interface Props extends React.Props<Popup> {
            popupContentDescriptor: React.ReactElement<any>;
            positionCorner: any;
            contentCorner: any;
            getPositionElement?: () => void;
            width?: number;
            closePopupMenu: () => void;
            mouseDownOutsideFunc: (mouseDownEvent: JQueryMouseEventObject) => void;
        }
    }
}
declare module VizPortalReact {
    class PopupMenu extends React.Component<PopupMenu.Props, PopupMenu.State> {
        static displayName: string;
        static element: React.Factory<PopupMenu.Props>;
        constructor(props: PopupMenu.Props, context?: any);
        state: PopupMenu.State;
        render(): React.DOMElement<React.HTMLAttributes>;
        private popupComponent;
        private onKeyDown(e);
        private toggle();
        private open();
        private close();
        private isDisabled();
        private positionCorner();
        private contentCorner();
    }
    module PopupMenu {
        interface Props extends React.Props<PopupMenu> {
            buttonClickHandler: () => void;
            contentMatchButtonWidth?: boolean;
            direction?: string;
            isDisabled?: boolean;
            onPopupOpened?: (locals: any) => any;
            onPopupClosed?: () => any;
            popupContentDescriptor: React.ReactElement<any>;
        }
        interface State {
            open: boolean;
        }
    }
}
declare module VizPortalReact {
    class ActionsMenu extends React.Component<ActionsMenu.Props, any> {
        static displayName: string;
        static element: React.Factory<ActionsMenu.Props>;
        constructor(props: ActionsMenu.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module ActionsMenu {
        interface Props extends React.Props<ActionsMenu> {
            menuActions: VizPortal.IActionButton<any>[];
            availableAction: (action: VizPortal.IActionButton<any>) => boolean;
            selectedItems: VizPortal.Set<VizPortal.INamedItemInfo>;
            actionMenuContext: (menuButton: JQuery) => VizPortal.IActionContext;
            detailedItem: any;
            allowedActions: any;
            contentSubplaceScope: VizPortal.IContentSubplaceScope;
        }
    }
}
declare module VizPortalReact {
    class FavoriteToggle extends React.Component<FavoriteToggle.Props, FavoriteToggle.State> {
        static displayName: string;
        static element: React.Factory<FavoriteToggle.Props>;
        state: FavoriteToggle.State;
        private toggle();
        private selected();
        private show();
        render(): React.DOMElement<React.HTMLAttributes>;
        shouldComponentUpdate(nextProps: FavoriteToggle.Props, nextState: FavoriteToggle.State): boolean;
    }
    module FavoriteToggle {
        interface Props {
            item: VizPortal.IFavoriteItem;
            hover: boolean;
            isTouch: boolean;
            addFavorite: (item: VizPortal.IFavoriteItem) => ng.IPromise<any>;
            removeFavorite: (item: VizPortal.IFavoriteItem) => ng.IPromise<any>;
        }
        interface State {
            favorite?: boolean;
        }
    }
}
declare module VizPortalReact {
    /**
    * This is a react component that is used to instantiate angular directives. The purpose of this component is to
    * allow angular directives to be ported to React one at a time.
    */
    class AngularDirective extends React.Component<AngularDirective.Props, any> implements React.ComponentLifecycle<AngularDirective.Props, any> {
        static element: React.Factory<AngularDirective.Props>;
        constructor(props: AngularDirective.Props, context: any);
        componentDidMount(): void;
        componentDidUpdate(prevProps: AngularDirective.Props): void;
        render(): {};
        componentWillUnmount(): void;
        /**
        * updates the DOM element based on the value of current props. Uses prevProps to determine if the things that have changed
        * require angular compilation of the element or just a digest cycle.
        */
        private updateFromProps(prevProps?);
        private compileElement();
        private digest();
    }
    module AngularDirective {
        /**
        * Properties:
        *
        * setupScope: an optional function parameter that can be used to setup the scope before the directive is compiled
        * attributes:
        *   An object containing key:value pairs which will be assinged to the DOM Element as attributes and values.
        *   You would use this to instantiate attribute directives.
        *   Required if 'template' is not used.
        * template:
        *   a string containing markup which will be compiled by angular. This would be used to instantiate element
        *   directives. Example: "<tb:permissions-panel />". Required if 'attributes' is not used.
        */
        interface Props extends VizPortal.ReactDirectiveProps<AngularDirective>, RenderedProps {
            angularContext: VizPortal.AngularContext;
            setupScope?(scope: ng.IScope): ng.IScope;
        }
        interface RenderedProps {
            attributes?: _.Dictionary<string>;
            template?: string;
        }
    }
}
declare module VizPortalReact {
    /**
     * Opens an angular tb-popover.
     * $todo: Replace with native react popover implementation
     */
    class PopoverTrigger extends React.Component<PopoverTrigger.Props, any> {
        static element: React.Factory<PopoverTrigger.Props>;
        private scope;
        render(): React.ReactElement<AngularDirective.Props>;
        componentWillUnmount(): void;
    }
    module PopoverTrigger {
        interface Props extends VizPortal.ReactDirectiveProps<PopoverTrigger> {
            popoverTemplateUrl: string;
            item: any;
            getItemDetails: (item: VizPortal.INamedItemInfo) => ng.IPromise<any>;
            delay?: number;
            hide?: boolean;
        }
        interface Scope extends ng.IScope {
            item: VizPortal.INamedItemInfo;
            getItemDetails: (item: VizPortal.INamedItemInfo) => ng.IPromise<any>;
        }
    }
}
declare module VizPortalReact {
    /**
     * An thumbnail representing a single workbook or view.
     */
    class Thumbnail extends React.Component<Thumbnail.Props, Thumbnail.State> {
        static displayName: string;
        static element: React.Factory<Thumbnail.Props>;
        constructor(props: Thumbnail.Props);
        private angularContext;
        state: Thumbnail.State;
        private mouseEnter();
        private mouseLeave();
        private isSelected();
        private toggleSelected();
        render(): React.ReactElement<PopoverTrigger.Props>;
    }
    module Thumbnail {
        interface Props extends VizPortal.ReactDirectiveProps<Thumbnail> {
            item: VizPortal.INamedThumbnailItemInfo;
            detailsUrl: string;
            getItemDetails: (item: VizPortal.INamedItemInfo) => ng.IPromise<any>;
            selected: boolean;
            selectedItems: VizPortal.Set<VizPortal.INamedThumbnailItemInfo>;
            favoriteProps: FavoriteToggle.Props;
            actionsMenuProps: ActionsMenu.Props;
            popoverTriggerProps: PopoverTrigger.Props;
            popoverTemplateUrl: string;
            angularContext: VizPortal.AngularContext;
        }
        interface State {
            hover: boolean;
        }
    }
}
declare module VizPortalReact {
    /**
     * The thumbnails view in the Views and Workbooks subplaces.
     */
    class Thumbnails extends React.Component<Thumbnails.Props, any> {
        static displayName: string;
        static element: React.Factory<Thumbnails.Props>;
        constructor(props: Thumbnails.Props);
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module Thumbnails {
        interface Props extends VizPortal.ReactDirectiveProps<Thumbnails> {
            items: VizPortal.INamedThumbnailItemInfo[];
            selectedItems: VizPortal.Set<VizPortal.INamedThumbnailItemInfo>;
            isTouch: boolean;
            getItemDetails: (item: VizPortal.INamedItemInfo) => ng.IPromise<any>;
            getDetailsUrl: (item: VizPortal.INamedItemInfo, subplaceName?: string) => string;
            favoriteProps: FavoriteToggle.Props;
            actionsMenuProps: ActionsMenu.Props;
            popoverTriggerProps: PopoverTrigger.Props;
            contentType: string;
        }
    }
}
declare module VizPortalReact {
    class Toast extends React.Component<Toast.Props, any> {
        static displayName: string;
        static element: React.Factory<Toast.Props>;
        private fadeOutTimeoutId;
        private closeTimeoutId;
        private static FadeOutTime;
        private static FadeInTime;
        private static HoverRestoreTime;
        private static FadeOutEasing;
        private static FadeInEasing;
        private boundHover;
        private boundFadeOut;
        private boundClose;
        private boundMouseOut;
        private isFading;
        state: Toast.State;
        constructor(props: Toast.Props);
        private close();
        componentDidMount(): void;
        mouseOut(): void;
        hover(): void;
        private fadeOut();
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module Toast {
        interface Props extends React.Props<Toast> {
            toastContent?: React.ReactElement<any>;
            timeoutDelay: number;
            toastType: string;
            lines?: string[];
            close: () => void;
        }
        interface State {
            fadeOpacity: number;
            fadeTransitionTime?: number;
        }
    }
}
declare module VizPortalReact {
    var ToastType: {
        Info: string;
        Error: string;
        External: string;
    };
    interface IToastOptions {
        content?: React.ReactElement<any>;
        timeoutDelay?: number;
        type?: VizPortal.ToastType;
        text?: string;
        id: number;
        lines?: string[];
    }
    class Toaster extends React.Component<Toaster.Props, Toaster.State> {
        static displayName: string;
        state: Toaster.State;
        static element: React.Factory<Toaster.Props>;
        private angularContext;
        private listenerId;
        private toasterService;
        private boundListenerFn;
        constructor(props: Toaster.Props);
        componentDidMount(): void;
        componentWillUnmount(): void;
        private close(id);
        toastsUpdated(toastOptionsArray: VizPortal.IToast[]): void;
        render(): React.DOMElement<React.HTMLAttributes>;
    }
    module Toaster {
        interface Props extends VizPortal.ReactDirectiveProps<Toaster> {
            angularContext: VizPortal.AngularContext;
        }
        interface State {
            toasts?: React.ReactElement<any>[];
        }
    }
}
declare module VizPortalReact {
}
declare module VizPortal.ServerApi {
    interface IUpdateConnectionsOAuthParams {
        ids: string[];
        keychainEntryId?: string;
    }
    class UpdateConnectionsOAuthRequest extends Request<IUpdateConnectionsOAuthParams, IActionResult> {
        constructor(params: IUpdateConnectionsParams);
    }
}
declare module VizPortal {
    interface IEmbeddedPasswordUpdate {
        isEmbedded: boolean;
        newPassword?: string;
    }
    interface IConnectionUpdate {
        server?: string;
        port?: string;
        username?: string;
        passwordUpdate?: IEmbeddedPasswordUpdate;
    }
    class DataConnections {
        private $q;
        private ErrorNotifyingServer;
        private LongRunningActionService;
        static $inject: string[];
        private server;
        constructor($q: ng.IQService, ErrorNotifyingServer: ErrorNotifyingServer, LongRunningActionService: LongRunningActionService);
        checkExistingConnection(dataSourceId: string): ng.IPromise<ServerApi.ICheckConnectionResult>;
        checkConnection(dataSourceId: string, connectionUpdate: IConnectionUpdate): ng.IPromise<ServerApi.ICheckConnectionResult>;
        updateConnections(dataSourceIds: string[], connectionUpdate: IConnectionUpdate): ng.IPromise<ServerApi.IResult>;
        updateConnectionsOAuth(dataSourceIds: string[], keychainEntryId?: string): ng.IPromise<ServerApi.IResult>;
        private setPasswordParams(requestParams, passwordUpdate);
    }
}
declare module VizPortal.ServerApi {
    interface IGetDataConnectionTypesResult extends IGetItemsResult {
        dataConnectionTypes: IDataConnectionType[];
    }
    class GetDataConnectionTypesRequest extends Request<IGetDataConnectionTypesResult, IGetDataConnectionTypesResult> {
        constructor(params: IGetDataConnectionTypesResult);
    }
}
declare module VizPortal {
    class DataConnectionTypes extends Resource<ServerApi.IDataConnectionType> {
        static $inject: string[];
        private fieldValuesFetcher;
        constructor(server: ServerService, FetcherFactory: FetcherFactory);
        getByDataConnectionType(dataConnectionType: string): ng.IPromise<ServerApi.IDataConnectionType>;
        valuesForField(field: string): FieldValuesQuery;
    }
}
declare module VizPortal.ServerApi {
    interface IGetProjectNamesResult extends IGetItemsResult {
        projects: IProjectName[];
    }
    class GetProjectNamesRequest extends Request<IGetItemsParams, IGetProjectNamesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal {
    class ProjectNames extends Resource<ServerApi.IProjectName> {
        static $inject: string[];
        constructor(FetcherFactory: FetcherFactory);
    }
}
declare module VizPortal.ServerApi {
    interface ITag {
        name: string;
    }
}
declare module VizPortal.ServerApi {
    interface IGetTagsParams extends IGetItemsParams {
    }
    interface IGetTagsResult extends IGetItemsResult {
        tags: ITag[];
    }
    class GetTagsRequest extends Request<IGetTagsParams, IGetTagsResult> {
        constructor(params: IGetTagsParams);
    }
}
declare module VizPortal {
    class Tags extends Resource<ServerApi.ITag> {
        static $inject: string[];
        constructor(FetcherFactory: FetcherFactory);
    }
}
declare module VizPortal.ServerApi {
    interface IGetUserNamesResult extends IGetItemsResult {
        users: IUserName[];
    }
    class GetUserNamesRequest extends Request<IGetItemsParams, IGetUserNamesResult> {
        constructor(params: IGetItemsParams);
    }
}
declare module VizPortal {
    class UserNames extends Resource<ServerApi.IUserName> {
        static $inject: string[];
        constructor(FetcherFactory: FetcherFactory);
    }
}
declare module VizPortal {
    class AddUsersToGroupAction {
        private modal;
        static $inject: string[];
        constructor(modal: ModalService);
        showAddUsersToGroupDialog(group: IGroupInfo): ng.IPromise<any>;
    }
}
declare module VizPortal.ServerApi {
    interface IAssignPermissionsToContentsParams {
        authorizables: ITypedIds;
    }
    interface IAssignPermissionsToContentsResult {
        actionId?: string;
    }
    class AssignPermissionsToContentsRequest extends Request<IAssignPermissionsToContentsParams, IAssignPermissionsToContentsResult> {
        constructor(params: IAssignPermissionsToContentsParams);
    }
}
declare module VizPortal {
    class AssignPermissionsToContentsService {
        private $translate;
        private server;
        private lrActionService;
        private toasterService;
        private assignPermissionsToContentsPoller;
        private assignPermissionsToContentsPending;
        private assignPermissionsToContentsPercent;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, server: ServerService, lrActionService: LongRunningActionService, toasterService: ToasterService);
        handleCurrentJob(): ng.IPromise<any>;
        getAssignPermissionsToContentsPercent(): number;
        getAssignPermissionsToContentsPending(): boolean;
        assignPermissionsToContents(params: ServerApi.IAssignPermissionsToContentsParams): ng.IPromise<any>;
        cancelPoll(): void;
        private trackAssignPermissionsToContentsProgress(actionId);
        private getAssignPermissionsToContentsStatus();
        private handleAssignPermissionsToContentsStatus(action);
    }
}
declare module VizPortal {
    interface IBackdropInstance {
        remove: () => void;
    }
    class BackdropService {
        static $inject: string[];
        private StackedElementsService;
        constructor(StackedElementsService: StackedElementsService);
        add(): IBackdropInstance;
    }
}
declare module VizPortal {
    class BulkImportUsersAction {
        private modal;
        static $inject: string[];
        constructor(modal: ModalService);
        showBulkImportSiteUsersDialog(dialogScope: ng.IScope): ng.IPromise<any>;
        showBulkImportServerUsersDialog(dialogScope: ng.IScope): ng.IPromise<any>;
        private showBulkImportUsersDialog(dialogScope, method);
    }
}
declare module VizPortal {
    class ChangeDatasourceRefreshModeAction {
        private $translate;
        private $q;
        private toaster;
        private DataSources;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, toaster: ToasterService, DataSources: DataSources);
        execute(datasource: IDataSourceInfo, currentRefreshMode: string, newRefreshMode: string, currentRemoteAgentName: string, suppressSuccessToast: boolean, suppressErrorToast: boolean): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error, datasource);
    }
}
declare module VizPortal {
    class ChangeDatasourceRemoteAgentAction {
        private $translate;
        private $q;
        private ToasterService;
        private DataSources;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, ToasterService: ToasterService, DataSources: DataSources);
        execute(datasource: IDataSourceInfo, currentRemoteAgentName: string, newRemoteAgentName: string, currentRefreshMode: string, suppressSuccessToast: boolean, suppressErrorToast: boolean): ng.IPromise<ServerApi.IResult>;
        private errorMessageFor(error, datasource);
    }
}
declare module VizPortal {
    class DeleteGroupsActionNotification {
        private $state;
        private $translate;
        private contentActionNotification;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, contentActionNotification: ContentActionNotification);
        notify(result: ServerApi.IResult, groups: Set<IGroupInfo>): void;
        private errorMessageFor(error, groupName);
    }
    class RenameGroupActionNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(showErrorMsgFunc: (errorMsg: string) => void, result: ServerApi.IResult, newGroupName: string, oldGroupName: string): void;
        private errorMessageFor(error, newGroupName, oldGroupName);
    }
    class CreateGroupActionNotification {
        private $translate;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService);
        notify(showErrorMsgFunc: (errorMsg: string) => void, result: ServerApi.IResult, groupName: string): void;
        private errorMessageFor(error, groupName);
    }
}
declare module VizPortal {
    interface ICreateGroupDialogScope extends ng.IScope {
        description: string;
        input: {
            text: string;
            maxLength?: number;
        };
    }
    class CreateGroupDialogAction {
        private $translate;
        private ConfirmActionDialog;
        private createGroupActionNotification;
        private Groups;
        private ServerService;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, createGroupActionNotification: CreateGroupActionNotification, Groups: Groups, ServerService: ServerService);
        showCreateGroupDialog(parentScope: ng.IScope): ng.IPromise<ServerApi.IResult>;
    }
}
declare module VizPortal {
    class DataSourceErrors {
        private ContentUrl;
        private $translate;
        static $inject: string[];
        constructor(ContentUrl: ContentUrl, $translate: ng.translate.ITranslateService);
        errorDetailsFor(datasourceErrorItem: IErrorItem<IDataSourceInfo>): IErrorDetail;
        private errorMessageForItem(errorItem);
        errorMessageFor(error: ServerApi.IError, datasourceName?: string): string;
    }
}
declare module VizPortal {
    class DeleteGroupAction {
        private $translate;
        private ConfirmActionDialog;
        private deleteGroupsActionNotification;
        private Groups;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, deleteGroupsActionNotification: DeleteGroupsActionNotification, Groups: Groups, toaster: ToasterService);
        showDeleteGroupDialog(groups: Set<IGroupBasicInfo>, dialogScope: ng.IScope): ng.IPromise<any>;
    }
}
declare module VizPortal.ServerApi {
    interface IDeleteServerUsersParams {
        ids: string[];
    }
    interface IDeleteServerUsersResult extends IResult {
    }
    class DeleteServerUsersRequest extends Request<IDeleteServerUsersParams, IDeleteServerUsersResult> {
        constructor(params: IDeleteServerUsersParams);
    }
}
declare module VizPortal {
    class DeleteUsersFromServerAction {
        private $state;
        private $translate;
        private ConfirmActionDialog;
        private userActionNotification;
        private ServerUsers;
        private toaster;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, userActionNotification: UserActionNotification, ServerUsers: ServerUsers, toaster: ToasterService);
        showDeleteUsersFromServerDialog(serverUsers: Set<ServerApi.IServerUser>, context: IActionContext): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class DesktopLaunchService {
        private $q;
        private $timeout;
        private windowLocationService;
        private static DesktopLaunchTimeoutMillis;
        private static URIScheme;
        private hiddenIFrame;
        static $inject: string[];
        constructor($q: ng.IQService, $timeout: ng.ITimeoutService, $window: ng.IWindowService, windowLocationService: WindowLocationService);
        private initHiddenIFrame($window);
        launchDesktop(focusElm: JQuery): ng.IPromise<any>;
    }
}
declare module VizPortal {
    interface IDetailFetcher<T> {
        fetchById(id: string): ng.IPromise<T>;
    }
}
declare module VizPortal.ServerApi {
    interface IGetDetailParams {
        id: string;
    }
}
declare module VizPortal.ServerApi {
    class GetDetailRequest<TDetailResult> extends Request<IGetDetailParams, TDetailResult> {
        constructor(method: string, id: string);
    }
}
declare module VizPortal {
    class ServerDetailFetcher<TResource, TRequestResult extends ServerApi.IResult> implements IDetailFetcher<TResource> {
        private server;
        private $q;
        private requestMethod;
        private resultMapper;
        constructor(server: ServerService, $q: ng.IQService, requestMethod: string, resultMapper: (result: TRequestResult) => TResource);
        fetchById(id: string): ng.IPromise<TResource>;
    }
}
declare module VizPortal {
    class FetcherFactory {
        private $q;
        private server;
        static $inject: string[];
        constructor($q: ng.IQService, server: ServerService);
        getServerDetailFetcher<TRequestResult, TResource>(requestMethod: string, resultMapper: (result: TRequestResult) => TResource): IDetailFetcher<TResource>;
        getServerResourceFetcher<TRequestResult, TResource>(requestType: new (params: ServerApi.IPagedItemsParams) => ServerApi.IRequest<ServerApi.IPagedItemsParams, TRequestResult>, resultMapper: (result: TRequestResult) => TResource[]): IListFetcher<TResource>;
    }
}
declare module VizPortal.ServerApi {
    interface IGetActionableObjectsParams {
        authorizables: ServerApi.ITypedIds;
    }
    interface IGetActionableObjectsResult extends IResult {
        ids: string[];
    }
    class GetActionableObjectsRequest extends Request<IGetActionableObjectsParams, IResult> {
        constructor(params: IGetActionableObjectsParams);
    }
}
declare module VizPortal {
    class GetActionableObjectsForAction {
        private server;
        static $inject: string[];
        constructor(server: ServerService);
        editPermissions(ids: ServerApi.ITypedIds): ng.IPromise<ServerApi.IGetActionableObjectsResult>;
        private static combineResults(results);
    }
}
declare module VizPortal {
    class ProjectErrors {
        private $state;
        private $translate;
        static $inject: string[];
        constructor($state: ng.ui.IStateService, $translate: ng.translate.ITranslateService);
        errorDetailsFor(projectErrorItem: IErrorItem<IProjectBase>): IErrorDetail;
        private projectUrl(project);
        errorMessageFor(errorItem: IErrorItem<IProjectBase>): string;
    }
}
declare module VizPortal {
    class RemoveUsersFromGroupAction {
        private $translate;
        private ConfirmActionDialog;
        private SiteUsers;
        private groupMembershipUpdateActionNotification;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, ConfirmActionDialog: ConfirmActionDialog, SiteUsers: SiteUsers, groupMembershipUpdateActionNotification: GroupMembershipUpdateActionNotification);
        showRemoveUsersFromGroupDialog(groupUsers: Set<ISiteUserInfo>, group: IGroupInfo): ng.IPromise<any>;
    }
}
declare module VizPortal {
    class SetProjectControlledPermissionsAction {
        private $translate;
        private toaster;
        private Projects;
        private longRunningActionService;
        private scope;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, toaster: ToasterService, Projects: Projects, longRunningActionService: LongRunningActionService, scope: ILockUnlockProjectPermissionsScope);
        execute(projects: Set<IProjectInfo>, updatedPermissionSource: LockUnlockProjectPermissionsState[], scope: ILockUnlockProjectPermissionsScope): ng.IPromise<ServerApi.IResult>;
        private lockProjectPermissions(projects);
        private unlockProjectPermissions(projects);
        private errorMessageFor(error, project);
    }
}
declare module VizPortal {
    interface IUpdateGroupNameDialogScope extends ng.IScope {
        description: string;
        input: {
            text: string;
            maxLength?: number;
        };
    }
    class UpdateGroupNameAction {
        private $translate;
        private $q;
        private ConfirmActionDialog;
        private Groups;
        private renameGroupActionNotification;
        private toaster;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService, $q: ng.IQService, ConfirmActionDialog: ConfirmActionDialog, Groups: Groups, renameGroupActionNotification: RenameGroupActionNotification, toaster: ToasterService);
        showUpdateGroupNameDialog(group: IGroupInfo, parentScope: ng.IScope): ng.IPromise<ServerApi.IResult>;
        updateGroupNameInPlace(group: IGroupInfo, newName: string): ng.IPromise<ServerApi.IResult>;
        private rejectOnError(serverResult);
    }
}
declare module VizPortal {
    class UserActionResultCode {
        private $translate;
        static $inject: string[];
        private static validUserActionCodes;
        constructor($translate: ng.translate.ITranslateService);
        toLocalizedResultMessage(userActionCode: number, count?: number): string;
        toLocalizedErrorMessage(userActionCode: number, count?: number): string;
        private normalizeUserActionCode(userActionCode);
        private isValidUserActionCode(code);
        private isValidUserActionErrorCode(code);
    }
}
declare module VizPortal {
    class ViewErrors {
        private $translate;
        static $inject: string[];
        constructor($translate: ng.translate.ITranslateService);
        errorDetailsFor(viewErrorItem: IErrorItem<IViewInfo>): IErrorDetail;
        errorMessageFor(errorItem: IErrorItem<IViewInfo>): string;
    }
}
declare module VizPortal.ServerApi {
    interface IBulkImportUsersFromCsvAction {
        actionId: string;
    }
    interface IBulkImportUsersFromCsvResult {
        processedLineCount: number;
        skippedLineCount: number;
        results: IImportUserFromCSVResult[];
        errors: IImportUserFromCSVError[];
    }
    interface IImportUserFromCSVResult {
        username: string;
        line: number;
        codes: number[];
    }
    interface IImportUserFromCSVError extends IError {
        username: string;
        line: number;
        errorCode: number;
    }
}
declare module VizPortal {
}
