"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyFundState_OrderBy = exports.DailyCurrencyPriceCandle_OrderBy = exports.DailyAssetPriceCandle_OrderBy = exports.CurvePoolAssetDetail_OrderBy = exports.CurveAssetType = exports.Currency_OrderBy = exports.CurrencyPrice_OrderBy = exports.Cron_OrderBy = exports.ComptrollerProxy_OrderBy = exports.ComptrollerProxyStatus = exports.ComptrollerProxyDeployedEvent_OrderBy = exports.ComptrollerLibSetEvent_OrderBy = exports.ComptrollerEventInterface_OrderBy = exports.ClaimRewardsTrade_OrderBy = exports.ClaimRewardsAndSwapTrade_OrderBy = exports.ClaimRewardsAndReinvestTrade_OrderBy = exports.ChainlinkAggregatorProxy_OrderBy = exports.ChainlinkAggregatorProxyType = exports.CallOnIntegrationExecutedForFundEvent_OrderBy = exports.BuySharesCallerWhitelistSetting_OrderBy = exports.BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy = exports.BuySharesCallerWhitelistAddressesAddedEvent_OrderBy = exports.AuthUserRemovedForFundEvent_OrderBy = exports.AuthUserAddedForFundEvent_OrderBy = exports.Asset_OrderBy = exports.AssetWithdrawnEvent_OrderBy = exports.AssetWhitelistSetting_OrderBy = exports.AssetWhitelistAddressesRemovedEvent_OrderBy = exports.AssetWhitelistAddressesAddedEvent_OrderBy = exports.AssetType = exports.AssetPrice_OrderBy = exports.AssetBlacklistSetting_OrderBy = exports.AssetBlacklistAddressesRemovedEvent_OrderBy = exports.AssetBlacklistAddressesAddedEvent_OrderBy = exports.AssetAmount_OrderBy = exports.ApproveAssetsTrade_OrderBy = exports.ApprovalEvent_OrderBy = exports.AllSharesOutstandingForcePaidForFundEvent_OrderBy = exports.AggregatorUpdatedEvent_OrderBy = exports.AddTrackedAssetsTrade_OrderBy = exports.AdapterWhitelistSetting_OrderBy = exports.AdapterWhitelistAddressesRemovedEvent_OrderBy = exports.AdapterWhitelistAddressesAddedEvent_OrderBy = exports.AdapterRegisteredEvent_OrderBy = exports.AdapterDeregisteredEvent_OrderBy = exports.AdapterBlacklistSetting_OrderBy = exports.AdapterBlacklistAddressesRemovedEvent_OrderBy = exports.AdapterBlacklistAddressesAddedEvent_OrderBy = exports.Account_OrderBy = exports.AccessorSetEvent_OrderBy = void 0;
exports.Investment_OrderBy = exports.InvestmentState_OrderBy = exports.InvestmentSharesChangeInterface_OrderBy = exports.IntegrationMethod = exports.IntegrationManager_OrderBy = exports.IntegrationAdapter_OrderBy = exports.IndividualFeeStateInterface_OrderBy = exports.HourlyPriceCandleGroup_OrderBy = exports.HourlyFundState_OrderBy = exports.HourlyCurrencyPriceCandle_OrderBy = exports.HourlyAssetPriceCandle_OrderBy = exports.HoldingState_OrderBy = exports.GuaranteedRedemption_OrderBy = exports.GuaranteedRedemptionSetting_OrderBy = exports.GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy = exports.GuaranteedRedemptionFundSettingsSetEvent_OrderBy = exports.GuaranteedRedemptionAdapterRemovedEvent_OrderBy = exports.GuaranteedRedemptionAdapterAddedEvent_OrderBy = exports.Fund_OrderBy = exports.FundState_OrderBy = exports.FundStateInterface_OrderBy = exports.FundEventInterface_OrderBy = exports.FundDeployerSetEvent_OrderBy = exports.FeesRecipientSetForFundEvent_OrderBy = exports.Fee_OrderBy = exports.FeeState_OrderBy = exports.FeeSharesChangeInterface_OrderBy = exports.FeeSettledForFundEvent_OrderBy = exports.FeeSettingInterface_OrderBy = exports.FeeRegisteredEvent_OrderBy = exports.FeeManager_OrderBy = exports.FeeHook = exports.FeeEnabledForFundEvent_OrderBy = exports.FeeDeregisteredEvent_OrderBy = exports.EventInterface_OrderBy = exports.EthUsdAggregatorSetEvent_OrderBy = exports.EntranceRateDirectFeeState_OrderBy = exports.EntranceRateDirectFeeSettledEvent_OrderBy = exports.EntranceRateDirectFeeSettingsAddedEvent_OrderBy = exports.EntranceRateDirectFeeSetting_OrderBy = exports.EntranceRateBurnFeeState_OrderBy = exports.EntranceRateBurnFeeSettledEvent_OrderBy = exports.EntranceRateBurnFeeSettingsAddedEvent_OrderBy = exports.EntranceRateBurnFeeSetting_OrderBy = exports.DispatcherOwnershipTransferredEvent_OrderBy = exports.DerivativeUpdatedEvent_OrderBy = exports.DerivativeType = exports.DerivativeRemovedEvent_OrderBy = exports.DerivativeAddedEvent_OrderBy = exports.DailyPriceCandleGroup_OrderBy = void 0;
exports.PolicyDeregisteredEvent_OrderBy = exports.PeriodicFundStateInterface_OrderBy = exports.PerformanceFeeState_OrderBy = exports.PerformanceFeeSharePriceUpdatedEvent_OrderBy = exports.PerformanceFeeSettingsAddedEvent_OrderBy = exports.PerformanceFeeSetting_OrderBy = exports.PerformanceFeePerformanceUpdatedEvent_OrderBy = exports.PerformanceFeePaidOutEvent_OrderBy = exports.PerformanceFeeActivatedForFundEvent_OrderBy = exports.OwnershipTransferredEvent_OrderBy = exports.OwnerSetEvent_OrderBy = exports.OverridePauseSetEvent_OrderBy = exports.OrderDirection = exports.NominatedOwnerSetEvent_OrderBy = exports.NominatedOwnerRemovedEvent_OrderBy = exports.NewFundCreatedEvent_OrderBy = exports.Network_OrderBy = exports.NetworkState_OrderBy = exports.NetworkEventInterface_OrderBy = exports.NetworkAssetHolding_OrderBy = exports.MultiTokenSwapTrade_OrderBy = exports.MultiRedeemTrade_OrderBy = exports.MultiLendTrade_OrderBy = exports.MonthlyPriceCandleGroup_OrderBy = exports.MonthlyFundState_OrderBy = exports.MonthlyCurrencyPriceCandle_OrderBy = exports.MonthlyAssetPriceCandle_OrderBy = exports.MinMaxInvestmentSetting_OrderBy = exports.MinMaxInvestmentFundSettingsSetEvent_OrderBy = exports.MigratorSetEvent_OrderBy = exports.Migration_OrderBy = exports.MigrationTimelockSetEvent_OrderBy = exports.MigrationSignaledEvent_OrderBy = exports.MigrationOutHookFailedEvent_OrderBy = exports.MigrationInCancelHookFailedEvent_OrderBy = exports.MigrationExecutedEvent_OrderBy = exports.MigrationCancelledEvent_OrderBy = exports.MigratedSharesDuePaidEvent_OrderBy = exports.MaxConcentrationSetting_OrderBy = exports.MaxConcentrationSetEvent_OrderBy = exports.ManagementFeeState_OrderBy = exports.ManagementFeeSettledEvent_OrderBy = exports.ManagementFeeSettingsAddedEvent_OrderBy = exports.ManagementFeeSetting_OrderBy = exports.ManagementFeeActivatedForMigratedFundEvent_OrderBy = exports.LendTrade_OrderBy = exports.LendAndStakeTrade_OrderBy = exports.InvestorWhitelistSetting_OrderBy = exports.InvestorWhitelistAddressesRemovedEvent_OrderBy = exports.InvestorWhitelistAddressesAddedEvent_OrderBy = void 0;
exports.getSdk = exports.VaultDocument = exports.CurrentReleaseContractsDocument = exports.AssetsDocument = exports._SubgraphErrorPolicy_ = exports.VaultProxySetEvent_OrderBy = exports.VaultProxyDeployedEvent_OrderBy = exports.VaultLibSetEvent_OrderBy = exports.VaultCallRegisteredEvent_OrderBy = exports.VaultCallDeregisteredEvent_OrderBy = exports.ValueInterpreterSetEvent_OrderBy = exports.UnstakeTrade_OrderBy = exports.UnstakeAndRedeemTrade_OrderBy = exports.UnknownPolicySetting_OrderBy = exports.UniswapV2PoolAssetDetail_OrderBy = exports.TransferEvent_OrderBy = exports.Transaction_OrderBy = exports.Trade_OrderBy = exports.TrackedAssetsLimitSetEvent_OrderBy = exports.TrackedAssetRemovedEvent_OrderBy = exports.TrackedAssetAddedEvent_OrderBy = exports.TokenSwapTrade_OrderBy = exports.StakeTrade_OrderBy = exports.SharesTokenSymbolSetEvent_OrderBy = exports.SharesRedeemedEvent_OrderBy = exports.SharesOutstandingPaidForFundEvent_OrderBy = exports.SharesChangeInterface_OrderBy = exports.SharesBoughtEvent_OrderBy = exports.ShareState_OrderBy = exports.ShareChangeType = exports.SettlementType = exports.RemoveTrackedAssetsTrade_OrderBy = exports.Release_OrderBy = exports.ReleaseStatusSetEvent_OrderBy = exports.RedeemTrade_OrderBy = exports.PrimitiveRemovedEvent_OrderBy = exports.PrimitiveAddedEvent_OrderBy = exports.PreRedeemSharesHookFailedEvent_OrderBy = exports.PortfolioState_OrderBy = exports.Policy_OrderBy = exports.PolicySettingInterface_OrderBy = exports.PolicyRegisteredEvent_OrderBy = exports.PolicyManager_OrderBy = exports.PolicyHook = exports.PolicyEnabledForFundEvent_OrderBy = exports.PolicyDisabledForFundEvent_OrderBy = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
var AccessorSetEvent_OrderBy;
(function (AccessorSetEvent_OrderBy) {
    AccessorSetEvent_OrderBy["Id"] = "id";
    AccessorSetEvent_OrderBy["Fund"] = "fund";
    AccessorSetEvent_OrderBy["PrevAccessor"] = "prevAccessor";
    AccessorSetEvent_OrderBy["NextAccessor"] = "nextAccessor";
    AccessorSetEvent_OrderBy["Transaction"] = "transaction";
    AccessorSetEvent_OrderBy["Timestamp"] = "timestamp";
})(AccessorSetEvent_OrderBy = exports.AccessorSetEvent_OrderBy || (exports.AccessorSetEvent_OrderBy = {}));
var Account_OrderBy;
(function (Account_OrderBy) {
    Account_OrderBy["Id"] = "id";
    Account_OrderBy["FirstSeen"] = "firstSeen";
    Account_OrderBy["Manager"] = "manager";
    Account_OrderBy["ManagerSince"] = "managerSince";
    Account_OrderBy["Managements"] = "managements";
    Account_OrderBy["Investor"] = "investor";
    Account_OrderBy["InvestorSince"] = "investorSince";
    Account_OrderBy["Investments"] = "investments";
    Account_OrderBy["AuthUser"] = "authUser";
    Account_OrderBy["AuthorizedForComptroller"] = "authorizedForComptroller";
    Account_OrderBy["SharesChanges"] = "sharesChanges";
    Account_OrderBy["FeeSharesChanges"] = "feeSharesChanges";
    Account_OrderBy["InvestmentSharesChanges"] = "investmentSharesChanges";
    Account_OrderBy["Whitelisted"] = "whitelisted";
})(Account_OrderBy = exports.Account_OrderBy || (exports.Account_OrderBy = {}));
var AdapterBlacklistAddressesAddedEvent_OrderBy;
(function (AdapterBlacklistAddressesAddedEvent_OrderBy) {
    AdapterBlacklistAddressesAddedEvent_OrderBy["Id"] = "id";
    AdapterBlacklistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    AdapterBlacklistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterBlacklistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    AdapterBlacklistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AdapterBlacklistAddressesAddedEvent_OrderBy["Items"] = "items";
})(AdapterBlacklistAddressesAddedEvent_OrderBy = exports.AdapterBlacklistAddressesAddedEvent_OrderBy || (exports.AdapterBlacklistAddressesAddedEvent_OrderBy = {}));
var AdapterBlacklistAddressesRemovedEvent_OrderBy;
(function (AdapterBlacklistAddressesRemovedEvent_OrderBy) {
    AdapterBlacklistAddressesRemovedEvent_OrderBy["Id"] = "id";
    AdapterBlacklistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    AdapterBlacklistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterBlacklistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    AdapterBlacklistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AdapterBlacklistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(AdapterBlacklistAddressesRemovedEvent_OrderBy = exports.AdapterBlacklistAddressesRemovedEvent_OrderBy || (exports.AdapterBlacklistAddressesRemovedEvent_OrderBy = {}));
var AdapterBlacklistSetting_OrderBy;
(function (AdapterBlacklistSetting_OrderBy) {
    AdapterBlacklistSetting_OrderBy["Id"] = "id";
    AdapterBlacklistSetting_OrderBy["Policy"] = "policy";
    AdapterBlacklistSetting_OrderBy["Comptroller"] = "comptroller";
    AdapterBlacklistSetting_OrderBy["Listed"] = "listed";
    AdapterBlacklistSetting_OrderBy["Adapters"] = "adapters";
    AdapterBlacklistSetting_OrderBy["Timestamp"] = "timestamp";
    AdapterBlacklistSetting_OrderBy["Enabled"] = "enabled";
    AdapterBlacklistSetting_OrderBy["Events"] = "events";
})(AdapterBlacklistSetting_OrderBy = exports.AdapterBlacklistSetting_OrderBy || (exports.AdapterBlacklistSetting_OrderBy = {}));
var AdapterDeregisteredEvent_OrderBy;
(function (AdapterDeregisteredEvent_OrderBy) {
    AdapterDeregisteredEvent_OrderBy["Id"] = "id";
    AdapterDeregisteredEvent_OrderBy["Identifier"] = "identifier";
    AdapterDeregisteredEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterDeregisteredEvent_OrderBy["Transaction"] = "transaction";
    AdapterDeregisteredEvent_OrderBy["IntegrationAdapter"] = "integrationAdapter";
})(AdapterDeregisteredEvent_OrderBy = exports.AdapterDeregisteredEvent_OrderBy || (exports.AdapterDeregisteredEvent_OrderBy = {}));
var AdapterRegisteredEvent_OrderBy;
(function (AdapterRegisteredEvent_OrderBy) {
    AdapterRegisteredEvent_OrderBy["Id"] = "id";
    AdapterRegisteredEvent_OrderBy["Identifier"] = "identifier";
    AdapterRegisteredEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterRegisteredEvent_OrderBy["Transaction"] = "transaction";
    AdapterRegisteredEvent_OrderBy["IntegrationAdapter"] = "integrationAdapter";
})(AdapterRegisteredEvent_OrderBy = exports.AdapterRegisteredEvent_OrderBy || (exports.AdapterRegisteredEvent_OrderBy = {}));
var AdapterWhitelistAddressesAddedEvent_OrderBy;
(function (AdapterWhitelistAddressesAddedEvent_OrderBy) {
    AdapterWhitelistAddressesAddedEvent_OrderBy["Id"] = "id";
    AdapterWhitelistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    AdapterWhitelistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterWhitelistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    AdapterWhitelistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AdapterWhitelistAddressesAddedEvent_OrderBy["Items"] = "items";
})(AdapterWhitelistAddressesAddedEvent_OrderBy = exports.AdapterWhitelistAddressesAddedEvent_OrderBy || (exports.AdapterWhitelistAddressesAddedEvent_OrderBy = {}));
var AdapterWhitelistAddressesRemovedEvent_OrderBy;
(function (AdapterWhitelistAddressesRemovedEvent_OrderBy) {
    AdapterWhitelistAddressesRemovedEvent_OrderBy["Id"] = "id";
    AdapterWhitelistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    AdapterWhitelistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    AdapterWhitelistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    AdapterWhitelistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AdapterWhitelistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(AdapterWhitelistAddressesRemovedEvent_OrderBy = exports.AdapterWhitelistAddressesRemovedEvent_OrderBy || (exports.AdapterWhitelistAddressesRemovedEvent_OrderBy = {}));
var AdapterWhitelistSetting_OrderBy;
(function (AdapterWhitelistSetting_OrderBy) {
    AdapterWhitelistSetting_OrderBy["Id"] = "id";
    AdapterWhitelistSetting_OrderBy["Policy"] = "policy";
    AdapterWhitelistSetting_OrderBy["Comptroller"] = "comptroller";
    AdapterWhitelistSetting_OrderBy["Listed"] = "listed";
    AdapterWhitelistSetting_OrderBy["Adapters"] = "adapters";
    AdapterWhitelistSetting_OrderBy["Timestamp"] = "timestamp";
    AdapterWhitelistSetting_OrderBy["Enabled"] = "enabled";
    AdapterWhitelistSetting_OrderBy["Events"] = "events";
})(AdapterWhitelistSetting_OrderBy = exports.AdapterWhitelistSetting_OrderBy || (exports.AdapterWhitelistSetting_OrderBy = {}));
var AddTrackedAssetsTrade_OrderBy;
(function (AddTrackedAssetsTrade_OrderBy) {
    AddTrackedAssetsTrade_OrderBy["Id"] = "id";
    AddTrackedAssetsTrade_OrderBy["Fund"] = "fund";
    AddTrackedAssetsTrade_OrderBy["Adapter"] = "adapter";
    AddTrackedAssetsTrade_OrderBy["Method"] = "method";
    AddTrackedAssetsTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    AddTrackedAssetsTrade_OrderBy["Timestamp"] = "timestamp";
    AddTrackedAssetsTrade_OrderBy["FundState"] = "fundState";
})(AddTrackedAssetsTrade_OrderBy = exports.AddTrackedAssetsTrade_OrderBy || (exports.AddTrackedAssetsTrade_OrderBy = {}));
var AggregatorUpdatedEvent_OrderBy;
(function (AggregatorUpdatedEvent_OrderBy) {
    AggregatorUpdatedEvent_OrderBy["Id"] = "id";
    AggregatorUpdatedEvent_OrderBy["Timestamp"] = "timestamp";
    AggregatorUpdatedEvent_OrderBy["Transaction"] = "transaction";
    AggregatorUpdatedEvent_OrderBy["Primitive"] = "primitive";
    AggregatorUpdatedEvent_OrderBy["PrevAggregator"] = "prevAggregator";
    AggregatorUpdatedEvent_OrderBy["NextAggregator"] = "nextAggregator";
})(AggregatorUpdatedEvent_OrderBy = exports.AggregatorUpdatedEvent_OrderBy || (exports.AggregatorUpdatedEvent_OrderBy = {}));
var AllSharesOutstandingForcePaidForFundEvent_OrderBy;
(function (AllSharesOutstandingForcePaidForFundEvent_OrderBy) {
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Id"] = "id";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Fund"] = "fund";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Type"] = "type";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Investor"] = "investor";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Timestamp"] = "timestamp";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Transaction"] = "transaction";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["InvestmentState"] = "investmentState";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Shares"] = "shares";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["Payee"] = "payee";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["SharesDue"] = "sharesDue";
    AllSharesOutstandingForcePaidForFundEvent_OrderBy["FundState"] = "fundState";
})(AllSharesOutstandingForcePaidForFundEvent_OrderBy = exports.AllSharesOutstandingForcePaidForFundEvent_OrderBy || (exports.AllSharesOutstandingForcePaidForFundEvent_OrderBy = {}));
var ApprovalEvent_OrderBy;
(function (ApprovalEvent_OrderBy) {
    ApprovalEvent_OrderBy["Id"] = "id";
    ApprovalEvent_OrderBy["Fund"] = "fund";
    ApprovalEvent_OrderBy["Timestamp"] = "timestamp";
    ApprovalEvent_OrderBy["Transaction"] = "transaction";
    ApprovalEvent_OrderBy["Owner"] = "owner";
    ApprovalEvent_OrderBy["Spender"] = "spender";
    ApprovalEvent_OrderBy["Value"] = "value";
})(ApprovalEvent_OrderBy = exports.ApprovalEvent_OrderBy || (exports.ApprovalEvent_OrderBy = {}));
var ApproveAssetsTrade_OrderBy;
(function (ApproveAssetsTrade_OrderBy) {
    ApproveAssetsTrade_OrderBy["Id"] = "id";
    ApproveAssetsTrade_OrderBy["Fund"] = "fund";
    ApproveAssetsTrade_OrderBy["Adapter"] = "adapter";
    ApproveAssetsTrade_OrderBy["Method"] = "method";
    ApproveAssetsTrade_OrderBy["IncomingAssets"] = "incomingAssets";
    ApproveAssetsTrade_OrderBy["Timestamp"] = "timestamp";
    ApproveAssetsTrade_OrderBy["FundState"] = "fundState";
})(ApproveAssetsTrade_OrderBy = exports.ApproveAssetsTrade_OrderBy || (exports.ApproveAssetsTrade_OrderBy = {}));
var AssetAmount_OrderBy;
(function (AssetAmount_OrderBy) {
    AssetAmount_OrderBy["Id"] = "id";
    AssetAmount_OrderBy["Asset"] = "asset";
    AssetAmount_OrderBy["Amount"] = "amount";
    AssetAmount_OrderBy["Price"] = "price";
})(AssetAmount_OrderBy = exports.AssetAmount_OrderBy || (exports.AssetAmount_OrderBy = {}));
var AssetBlacklistAddressesAddedEvent_OrderBy;
(function (AssetBlacklistAddressesAddedEvent_OrderBy) {
    AssetBlacklistAddressesAddedEvent_OrderBy["Id"] = "id";
    AssetBlacklistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    AssetBlacklistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    AssetBlacklistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    AssetBlacklistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AssetBlacklistAddressesAddedEvent_OrderBy["Items"] = "items";
})(AssetBlacklistAddressesAddedEvent_OrderBy = exports.AssetBlacklistAddressesAddedEvent_OrderBy || (exports.AssetBlacklistAddressesAddedEvent_OrderBy = {}));
var AssetBlacklistAddressesRemovedEvent_OrderBy;
(function (AssetBlacklistAddressesRemovedEvent_OrderBy) {
    AssetBlacklistAddressesRemovedEvent_OrderBy["Id"] = "id";
    AssetBlacklistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    AssetBlacklistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    AssetBlacklistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    AssetBlacklistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AssetBlacklistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(AssetBlacklistAddressesRemovedEvent_OrderBy = exports.AssetBlacklistAddressesRemovedEvent_OrderBy || (exports.AssetBlacklistAddressesRemovedEvent_OrderBy = {}));
var AssetBlacklistSetting_OrderBy;
(function (AssetBlacklistSetting_OrderBy) {
    AssetBlacklistSetting_OrderBy["Id"] = "id";
    AssetBlacklistSetting_OrderBy["Policy"] = "policy";
    AssetBlacklistSetting_OrderBy["Comptroller"] = "comptroller";
    AssetBlacklistSetting_OrderBy["Listed"] = "listed";
    AssetBlacklistSetting_OrderBy["Assets"] = "assets";
    AssetBlacklistSetting_OrderBy["Timestamp"] = "timestamp";
    AssetBlacklistSetting_OrderBy["Enabled"] = "enabled";
    AssetBlacklistSetting_OrderBy["Events"] = "events";
})(AssetBlacklistSetting_OrderBy = exports.AssetBlacklistSetting_OrderBy || (exports.AssetBlacklistSetting_OrderBy = {}));
var AssetPrice_OrderBy;
(function (AssetPrice_OrderBy) {
    AssetPrice_OrderBy["Id"] = "id";
    AssetPrice_OrderBy["Asset"] = "asset";
    AssetPrice_OrderBy["Price"] = "price";
    AssetPrice_OrderBy["Timestamp"] = "timestamp";
})(AssetPrice_OrderBy = exports.AssetPrice_OrderBy || (exports.AssetPrice_OrderBy = {}));
var AssetType;
(function (AssetType) {
    AssetType["Unknown"] = "UNKNOWN";
    AssetType["Derivative"] = "DERIVATIVE";
    AssetType["Eth"] = "ETH";
    AssetType["Usd"] = "USD";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
var AssetWhitelistAddressesAddedEvent_OrderBy;
(function (AssetWhitelistAddressesAddedEvent_OrderBy) {
    AssetWhitelistAddressesAddedEvent_OrderBy["Id"] = "id";
    AssetWhitelistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    AssetWhitelistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    AssetWhitelistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    AssetWhitelistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AssetWhitelistAddressesAddedEvent_OrderBy["Items"] = "items";
})(AssetWhitelistAddressesAddedEvent_OrderBy = exports.AssetWhitelistAddressesAddedEvent_OrderBy || (exports.AssetWhitelistAddressesAddedEvent_OrderBy = {}));
var AssetWhitelistAddressesRemovedEvent_OrderBy;
(function (AssetWhitelistAddressesRemovedEvent_OrderBy) {
    AssetWhitelistAddressesRemovedEvent_OrderBy["Id"] = "id";
    AssetWhitelistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    AssetWhitelistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    AssetWhitelistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    AssetWhitelistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AssetWhitelistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(AssetWhitelistAddressesRemovedEvent_OrderBy = exports.AssetWhitelistAddressesRemovedEvent_OrderBy || (exports.AssetWhitelistAddressesRemovedEvent_OrderBy = {}));
var AssetWhitelistSetting_OrderBy;
(function (AssetWhitelistSetting_OrderBy) {
    AssetWhitelistSetting_OrderBy["Id"] = "id";
    AssetWhitelistSetting_OrderBy["Policy"] = "policy";
    AssetWhitelistSetting_OrderBy["Comptroller"] = "comptroller";
    AssetWhitelistSetting_OrderBy["Listed"] = "listed";
    AssetWhitelistSetting_OrderBy["Assets"] = "assets";
    AssetWhitelistSetting_OrderBy["Timestamp"] = "timestamp";
    AssetWhitelistSetting_OrderBy["Enabled"] = "enabled";
    AssetWhitelistSetting_OrderBy["Events"] = "events";
})(AssetWhitelistSetting_OrderBy = exports.AssetWhitelistSetting_OrderBy || (exports.AssetWhitelistSetting_OrderBy = {}));
var AssetWithdrawnEvent_OrderBy;
(function (AssetWithdrawnEvent_OrderBy) {
    AssetWithdrawnEvent_OrderBy["Id"] = "id";
    AssetWithdrawnEvent_OrderBy["Asset"] = "asset";
    AssetWithdrawnEvent_OrderBy["Fund"] = "fund";
    AssetWithdrawnEvent_OrderBy["Timestamp"] = "timestamp";
    AssetWithdrawnEvent_OrderBy["Transaction"] = "transaction";
    AssetWithdrawnEvent_OrderBy["Target"] = "target";
    AssetWithdrawnEvent_OrderBy["Amount"] = "amount";
})(AssetWithdrawnEvent_OrderBy = exports.AssetWithdrawnEvent_OrderBy || (exports.AssetWithdrawnEvent_OrderBy = {}));
var Asset_OrderBy;
(function (Asset_OrderBy) {
    Asset_OrderBy["Id"] = "id";
    Asset_OrderBy["Name"] = "name";
    Asset_OrderBy["Symbol"] = "symbol";
    Asset_OrderBy["Decimals"] = "decimals";
    Asset_OrderBy["Type"] = "type";
    Asset_OrderBy["Releases"] = "releases";
    Asset_OrderBy["DerivativeType"] = "derivativeType";
    Asset_OrderBy["UnderlyingAsset"] = "underlyingAsset";
    Asset_OrderBy["CurvePoolAssetDetails"] = "curvePoolAssetDetails";
    Asset_OrderBy["UniswapV2PoolAssetDetails"] = "uniswapV2PoolAssetDetails";
    Asset_OrderBy["Price"] = "price";
    Asset_OrderBy["Hourly"] = "hourly";
    Asset_OrderBy["Daily"] = "daily";
    Asset_OrderBy["Monthly"] = "monthly";
    Asset_OrderBy["PriceHistory"] = "priceHistory";
    Asset_OrderBy["HourlyHistory"] = "hourlyHistory";
    Asset_OrderBy["DailyHistory"] = "dailyHistory";
    Asset_OrderBy["MonthlyHistory"] = "monthlyHistory";
    Asset_OrderBy["TrackingFunds"] = "trackingFunds";
    Asset_OrderBy["Blacklisted"] = "blacklisted";
    Asset_OrderBy["Whitelisted"] = "whitelisted";
    Asset_OrderBy["NetworkAssetHolding"] = "networkAssetHolding";
    Asset_OrderBy["NetworkAssetHoldingHistory"] = "networkAssetHoldingHistory";
})(Asset_OrderBy = exports.Asset_OrderBy || (exports.Asset_OrderBy = {}));
var AuthUserAddedForFundEvent_OrderBy;
(function (AuthUserAddedForFundEvent_OrderBy) {
    AuthUserAddedForFundEvent_OrderBy["Id"] = "id";
    AuthUserAddedForFundEvent_OrderBy["Fund"] = "fund";
    AuthUserAddedForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AuthUserAddedForFundEvent_OrderBy["User"] = "user";
    AuthUserAddedForFundEvent_OrderBy["Timestamp"] = "timestamp";
    AuthUserAddedForFundEvent_OrderBy["Transaction"] = "transaction";
})(AuthUserAddedForFundEvent_OrderBy = exports.AuthUserAddedForFundEvent_OrderBy || (exports.AuthUserAddedForFundEvent_OrderBy = {}));
var AuthUserRemovedForFundEvent_OrderBy;
(function (AuthUserRemovedForFundEvent_OrderBy) {
    AuthUserRemovedForFundEvent_OrderBy["Id"] = "id";
    AuthUserRemovedForFundEvent_OrderBy["Fund"] = "fund";
    AuthUserRemovedForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    AuthUserRemovedForFundEvent_OrderBy["User"] = "user";
    AuthUserRemovedForFundEvent_OrderBy["Timestamp"] = "timestamp";
    AuthUserRemovedForFundEvent_OrderBy["Transaction"] = "transaction";
})(AuthUserRemovedForFundEvent_OrderBy = exports.AuthUserRemovedForFundEvent_OrderBy || (exports.AuthUserRemovedForFundEvent_OrderBy = {}));
var BuySharesCallerWhitelistAddressesAddedEvent_OrderBy;
(function (BuySharesCallerWhitelistAddressesAddedEvent_OrderBy) {
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["Id"] = "id";
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    BuySharesCallerWhitelistAddressesAddedEvent_OrderBy["Items"] = "items";
})(BuySharesCallerWhitelistAddressesAddedEvent_OrderBy = exports.BuySharesCallerWhitelistAddressesAddedEvent_OrderBy || (exports.BuySharesCallerWhitelistAddressesAddedEvent_OrderBy = {}));
var BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy;
(function (BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy) {
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["Id"] = "id";
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy = exports.BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy || (exports.BuySharesCallerWhitelistAddressesRemovedEvent_OrderBy = {}));
var BuySharesCallerWhitelistSetting_OrderBy;
(function (BuySharesCallerWhitelistSetting_OrderBy) {
    BuySharesCallerWhitelistSetting_OrderBy["Id"] = "id";
    BuySharesCallerWhitelistSetting_OrderBy["Policy"] = "policy";
    BuySharesCallerWhitelistSetting_OrderBy["Comptroller"] = "comptroller";
    BuySharesCallerWhitelistSetting_OrderBy["Listed"] = "listed";
    BuySharesCallerWhitelistSetting_OrderBy["Timestamp"] = "timestamp";
    BuySharesCallerWhitelistSetting_OrderBy["Enabled"] = "enabled";
    BuySharesCallerWhitelistSetting_OrderBy["Events"] = "events";
})(BuySharesCallerWhitelistSetting_OrderBy = exports.BuySharesCallerWhitelistSetting_OrderBy || (exports.BuySharesCallerWhitelistSetting_OrderBy = {}));
var CallOnIntegrationExecutedForFundEvent_OrderBy;
(function (CallOnIntegrationExecutedForFundEvent_OrderBy) {
    CallOnIntegrationExecutedForFundEvent_OrderBy["Id"] = "id";
    CallOnIntegrationExecutedForFundEvent_OrderBy["Fund"] = "fund";
    CallOnIntegrationExecutedForFundEvent_OrderBy["Adapter"] = "adapter";
    CallOnIntegrationExecutedForFundEvent_OrderBy["Selector"] = "selector";
    CallOnIntegrationExecutedForFundEvent_OrderBy["IntegrationData"] = "integrationData";
    CallOnIntegrationExecutedForFundEvent_OrderBy["IncomingAssets"] = "incomingAssets";
    CallOnIntegrationExecutedForFundEvent_OrderBy["OutgoingAssets"] = "outgoingAssets";
    CallOnIntegrationExecutedForFundEvent_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    CallOnIntegrationExecutedForFundEvent_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    CallOnIntegrationExecutedForFundEvent_OrderBy["Timestamp"] = "timestamp";
    CallOnIntegrationExecutedForFundEvent_OrderBy["Transaction"] = "transaction";
})(CallOnIntegrationExecutedForFundEvent_OrderBy = exports.CallOnIntegrationExecutedForFundEvent_OrderBy || (exports.CallOnIntegrationExecutedForFundEvent_OrderBy = {}));
var ChainlinkAggregatorProxyType;
(function (ChainlinkAggregatorProxyType) {
    ChainlinkAggregatorProxyType["Asset"] = "ASSET";
    ChainlinkAggregatorProxyType["Ethusd"] = "ETHUSD";
    ChainlinkAggregatorProxyType["Currency"] = "CURRENCY";
})(ChainlinkAggregatorProxyType = exports.ChainlinkAggregatorProxyType || (exports.ChainlinkAggregatorProxyType = {}));
var ChainlinkAggregatorProxy_OrderBy;
(function (ChainlinkAggregatorProxy_OrderBy) {
    ChainlinkAggregatorProxy_OrderBy["Id"] = "id";
    ChainlinkAggregatorProxy_OrderBy["Aggregator"] = "aggregator";
    ChainlinkAggregatorProxy_OrderBy["Type"] = "type";
    ChainlinkAggregatorProxy_OrderBy["Decimals"] = "decimals";
    ChainlinkAggregatorProxy_OrderBy["Asset"] = "asset";
    ChainlinkAggregatorProxy_OrderBy["Currency"] = "currency";
})(ChainlinkAggregatorProxy_OrderBy = exports.ChainlinkAggregatorProxy_OrderBy || (exports.ChainlinkAggregatorProxy_OrderBy = {}));
var ClaimRewardsAndReinvestTrade_OrderBy;
(function (ClaimRewardsAndReinvestTrade_OrderBy) {
    ClaimRewardsAndReinvestTrade_OrderBy["Id"] = "id";
    ClaimRewardsAndReinvestTrade_OrderBy["Fund"] = "fund";
    ClaimRewardsAndReinvestTrade_OrderBy["Adapter"] = "adapter";
    ClaimRewardsAndReinvestTrade_OrderBy["Method"] = "method";
    ClaimRewardsAndReinvestTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    ClaimRewardsAndReinvestTrade_OrderBy["Timestamp"] = "timestamp";
    ClaimRewardsAndReinvestTrade_OrderBy["FundState"] = "fundState";
})(ClaimRewardsAndReinvestTrade_OrderBy = exports.ClaimRewardsAndReinvestTrade_OrderBy || (exports.ClaimRewardsAndReinvestTrade_OrderBy = {}));
var ClaimRewardsAndSwapTrade_OrderBy;
(function (ClaimRewardsAndSwapTrade_OrderBy) {
    ClaimRewardsAndSwapTrade_OrderBy["Id"] = "id";
    ClaimRewardsAndSwapTrade_OrderBy["Fund"] = "fund";
    ClaimRewardsAndSwapTrade_OrderBy["Adapter"] = "adapter";
    ClaimRewardsAndSwapTrade_OrderBy["Method"] = "method";
    ClaimRewardsAndSwapTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    ClaimRewardsAndSwapTrade_OrderBy["Timestamp"] = "timestamp";
    ClaimRewardsAndSwapTrade_OrderBy["FundState"] = "fundState";
})(ClaimRewardsAndSwapTrade_OrderBy = exports.ClaimRewardsAndSwapTrade_OrderBy || (exports.ClaimRewardsAndSwapTrade_OrderBy = {}));
var ClaimRewardsTrade_OrderBy;
(function (ClaimRewardsTrade_OrderBy) {
    ClaimRewardsTrade_OrderBy["Id"] = "id";
    ClaimRewardsTrade_OrderBy["Fund"] = "fund";
    ClaimRewardsTrade_OrderBy["Adapter"] = "adapter";
    ClaimRewardsTrade_OrderBy["Method"] = "method";
    ClaimRewardsTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    ClaimRewardsTrade_OrderBy["Timestamp"] = "timestamp";
    ClaimRewardsTrade_OrderBy["FundState"] = "fundState";
})(ClaimRewardsTrade_OrderBy = exports.ClaimRewardsTrade_OrderBy || (exports.ClaimRewardsTrade_OrderBy = {}));
var ComptrollerEventInterface_OrderBy;
(function (ComptrollerEventInterface_OrderBy) {
    ComptrollerEventInterface_OrderBy["Id"] = "id";
    ComptrollerEventInterface_OrderBy["Comptroller"] = "comptroller";
    ComptrollerEventInterface_OrderBy["Timestamp"] = "timestamp";
    ComptrollerEventInterface_OrderBy["Transaction"] = "transaction";
})(ComptrollerEventInterface_OrderBy = exports.ComptrollerEventInterface_OrderBy || (exports.ComptrollerEventInterface_OrderBy = {}));
var ComptrollerLibSetEvent_OrderBy;
(function (ComptrollerLibSetEvent_OrderBy) {
    ComptrollerLibSetEvent_OrderBy["Id"] = "id";
    ComptrollerLibSetEvent_OrderBy["Timestamp"] = "timestamp";
    ComptrollerLibSetEvent_OrderBy["Transaction"] = "transaction";
    ComptrollerLibSetEvent_OrderBy["ComptrollerLib"] = "comptrollerLib";
})(ComptrollerLibSetEvent_OrderBy = exports.ComptrollerLibSetEvent_OrderBy || (exports.ComptrollerLibSetEvent_OrderBy = {}));
var ComptrollerProxyDeployedEvent_OrderBy;
(function (ComptrollerProxyDeployedEvent_OrderBy) {
    ComptrollerProxyDeployedEvent_OrderBy["Id"] = "id";
    ComptrollerProxyDeployedEvent_OrderBy["Timestamp"] = "timestamp";
    ComptrollerProxyDeployedEvent_OrderBy["Creator"] = "creator";
    ComptrollerProxyDeployedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    ComptrollerProxyDeployedEvent_OrderBy["Transaction"] = "transaction";
    ComptrollerProxyDeployedEvent_OrderBy["DenominationAsset"] = "denominationAsset";
    ComptrollerProxyDeployedEvent_OrderBy["SharesActionTimelock"] = "sharesActionTimelock";
    ComptrollerProxyDeployedEvent_OrderBy["FeeManagerConfigData"] = "feeManagerConfigData";
    ComptrollerProxyDeployedEvent_OrderBy["PolicyManagerConfigData"] = "policyManagerConfigData";
    ComptrollerProxyDeployedEvent_OrderBy["ForMigration"] = "forMigration";
})(ComptrollerProxyDeployedEvent_OrderBy = exports.ComptrollerProxyDeployedEvent_OrderBy || (exports.ComptrollerProxyDeployedEvent_OrderBy = {}));
var ComptrollerProxyStatus;
(function (ComptrollerProxyStatus) {
    ComptrollerProxyStatus["Free"] = "FREE";
    ComptrollerProxyStatus["Signalled"] = "SIGNALLED";
    ComptrollerProxyStatus["Committed"] = "COMMITTED";
    ComptrollerProxyStatus["Destructed"] = "DESTRUCTED";
})(ComptrollerProxyStatus = exports.ComptrollerProxyStatus || (exports.ComptrollerProxyStatus = {}));
var ComptrollerProxy_OrderBy;
(function (ComptrollerProxy_OrderBy) {
    ComptrollerProxy_OrderBy["Id"] = "id";
    ComptrollerProxy_OrderBy["Fund"] = "fund";
    ComptrollerProxy_OrderBy["Creator"] = "creator";
    ComptrollerProxy_OrderBy["Timestamp"] = "timestamp";
    ComptrollerProxy_OrderBy["ActivationTime"] = "activationTime";
    ComptrollerProxy_OrderBy["DestructionTime"] = "destructionTime";
    ComptrollerProxy_OrderBy["DenominationAsset"] = "denominationAsset";
    ComptrollerProxy_OrderBy["SharesActionTimelock"] = "sharesActionTimelock";
    ComptrollerProxy_OrderBy["FeeManagerConfigData"] = "feeManagerConfigData";
    ComptrollerProxy_OrderBy["PolicyManagerConfigData"] = "policyManagerConfigData";
    ComptrollerProxy_OrderBy["Release"] = "release";
    ComptrollerProxy_OrderBy["AuthUsers"] = "authUsers";
    ComptrollerProxy_OrderBy["Status"] = "status";
    ComptrollerProxy_OrderBy["FeeSettings"] = "feeSettings";
    ComptrollerProxy_OrderBy["PolicySettings"] = "policySettings";
})(ComptrollerProxy_OrderBy = exports.ComptrollerProxy_OrderBy || (exports.ComptrollerProxy_OrderBy = {}));
var Cron_OrderBy;
(function (Cron_OrderBy) {
    Cron_OrderBy["Id"] = "id";
    Cron_OrderBy["Cron"] = "cron";
    Cron_OrderBy["Primitives"] = "primitives";
    Cron_OrderBy["UsdQuotedPrimitives"] = "usdQuotedPrimitives";
    Cron_OrderBy["Derivatives"] = "derivatives";
    Cron_OrderBy["Currencies"] = "currencies";
    Cron_OrderBy["ChainlinkAggregatorProxies"] = "chainlinkAggregatorProxies";
})(Cron_OrderBy = exports.Cron_OrderBy || (exports.Cron_OrderBy = {}));
var CurrencyPrice_OrderBy;
(function (CurrencyPrice_OrderBy) {
    CurrencyPrice_OrderBy["Id"] = "id";
    CurrencyPrice_OrderBy["Currency"] = "currency";
    CurrencyPrice_OrderBy["Price"] = "price";
    CurrencyPrice_OrderBy["Timestamp"] = "timestamp";
})(CurrencyPrice_OrderBy = exports.CurrencyPrice_OrderBy || (exports.CurrencyPrice_OrderBy = {}));
var Currency_OrderBy;
(function (Currency_OrderBy) {
    Currency_OrderBy["Id"] = "id";
    Currency_OrderBy["Price"] = "price";
    Currency_OrderBy["Hourly"] = "hourly";
    Currency_OrderBy["Daily"] = "daily";
    Currency_OrderBy["Monthly"] = "monthly";
    Currency_OrderBy["PriceHistory"] = "priceHistory";
    Currency_OrderBy["HourlyHistory"] = "hourlyHistory";
    Currency_OrderBy["DailyHistory"] = "dailyHistory";
    Currency_OrderBy["MonthlyHistory"] = "monthlyHistory";
})(Currency_OrderBy = exports.Currency_OrderBy || (exports.Currency_OrderBy = {}));
var CurveAssetType;
(function (CurveAssetType) {
    CurveAssetType["Gauge"] = "GAUGE";
    CurveAssetType["Pool"] = "POOL";
})(CurveAssetType = exports.CurveAssetType || (exports.CurveAssetType = {}));
var CurvePoolAssetDetail_OrderBy;
(function (CurvePoolAssetDetail_OrderBy) {
    CurvePoolAssetDetail_OrderBy["Id"] = "id";
    CurvePoolAssetDetail_OrderBy["Pool"] = "pool";
    CurvePoolAssetDetail_OrderBy["Gauge"] = "gauge";
    CurvePoolAssetDetail_OrderBy["LpToken"] = "lpToken";
    CurvePoolAssetDetail_OrderBy["GaugeToken"] = "gaugeToken";
    CurvePoolAssetDetail_OrderBy["CurveAssetType"] = "curveAssetType";
    CurvePoolAssetDetail_OrderBy["InvariantProxyAsset"] = "invariantProxyAsset";
    CurvePoolAssetDetail_OrderBy["NumberOfTokens"] = "numberOfTokens";
    CurvePoolAssetDetail_OrderBy["Token0"] = "token0";
    CurvePoolAssetDetail_OrderBy["Token1"] = "token1";
    CurvePoolAssetDetail_OrderBy["Token2"] = "token2";
})(CurvePoolAssetDetail_OrderBy = exports.CurvePoolAssetDetail_OrderBy || (exports.CurvePoolAssetDetail_OrderBy = {}));
var DailyAssetPriceCandle_OrderBy;
(function (DailyAssetPriceCandle_OrderBy) {
    DailyAssetPriceCandle_OrderBy["Id"] = "id";
    DailyAssetPriceCandle_OrderBy["Asset"] = "asset";
    DailyAssetPriceCandle_OrderBy["Group"] = "group";
    DailyAssetPriceCandle_OrderBy["From"] = "from";
    DailyAssetPriceCandle_OrderBy["To"] = "to";
    DailyAssetPriceCandle_OrderBy["Open"] = "open";
    DailyAssetPriceCandle_OrderBy["OpenRef"] = "openRef";
    DailyAssetPriceCandle_OrderBy["Close"] = "close";
    DailyAssetPriceCandle_OrderBy["CloseRef"] = "closeRef";
    DailyAssetPriceCandle_OrderBy["Low"] = "low";
    DailyAssetPriceCandle_OrderBy["LowRef"] = "lowRef";
    DailyAssetPriceCandle_OrderBy["High"] = "high";
    DailyAssetPriceCandle_OrderBy["HighRef"] = "highRef";
})(DailyAssetPriceCandle_OrderBy = exports.DailyAssetPriceCandle_OrderBy || (exports.DailyAssetPriceCandle_OrderBy = {}));
var DailyCurrencyPriceCandle_OrderBy;
(function (DailyCurrencyPriceCandle_OrderBy) {
    DailyCurrencyPriceCandle_OrderBy["Id"] = "id";
    DailyCurrencyPriceCandle_OrderBy["Currency"] = "currency";
    DailyCurrencyPriceCandle_OrderBy["Group"] = "group";
    DailyCurrencyPriceCandle_OrderBy["From"] = "from";
    DailyCurrencyPriceCandle_OrderBy["To"] = "to";
    DailyCurrencyPriceCandle_OrderBy["Open"] = "open";
    DailyCurrencyPriceCandle_OrderBy["OpenRef"] = "openRef";
    DailyCurrencyPriceCandle_OrderBy["Close"] = "close";
    DailyCurrencyPriceCandle_OrderBy["CloseRef"] = "closeRef";
    DailyCurrencyPriceCandle_OrderBy["Low"] = "low";
    DailyCurrencyPriceCandle_OrderBy["LowRef"] = "lowRef";
    DailyCurrencyPriceCandle_OrderBy["High"] = "high";
    DailyCurrencyPriceCandle_OrderBy["HighRef"] = "highRef";
})(DailyCurrencyPriceCandle_OrderBy = exports.DailyCurrencyPriceCandle_OrderBy || (exports.DailyCurrencyPriceCandle_OrderBy = {}));
var DailyFundState_OrderBy;
(function (DailyFundState_OrderBy) {
    DailyFundState_OrderBy["Id"] = "id";
    DailyFundState_OrderBy["Fund"] = "fund";
    DailyFundState_OrderBy["Start"] = "start";
    DailyFundState_OrderBy["End"] = "end";
    DailyFundState_OrderBy["First"] = "first";
    DailyFundState_OrderBy["Last"] = "last";
})(DailyFundState_OrderBy = exports.DailyFundState_OrderBy || (exports.DailyFundState_OrderBy = {}));
var DailyPriceCandleGroup_OrderBy;
(function (DailyPriceCandleGroup_OrderBy) {
    DailyPriceCandleGroup_OrderBy["Id"] = "id";
    DailyPriceCandleGroup_OrderBy["From"] = "from";
    DailyPriceCandleGroup_OrderBy["To"] = "to";
    DailyPriceCandleGroup_OrderBy["AssetCandles"] = "assetCandles";
    DailyPriceCandleGroup_OrderBy["CurrencyCandles"] = "currencyCandles";
})(DailyPriceCandleGroup_OrderBy = exports.DailyPriceCandleGroup_OrderBy || (exports.DailyPriceCandleGroup_OrderBy = {}));
var DerivativeAddedEvent_OrderBy;
(function (DerivativeAddedEvent_OrderBy) {
    DerivativeAddedEvent_OrderBy["Id"] = "id";
    DerivativeAddedEvent_OrderBy["Timestamp"] = "timestamp";
    DerivativeAddedEvent_OrderBy["Transaction"] = "transaction";
    DerivativeAddedEvent_OrderBy["Derivative"] = "derivative";
    DerivativeAddedEvent_OrderBy["PriceFeed"] = "priceFeed";
})(DerivativeAddedEvent_OrderBy = exports.DerivativeAddedEvent_OrderBy || (exports.DerivativeAddedEvent_OrderBy = {}));
var DerivativeRemovedEvent_OrderBy;
(function (DerivativeRemovedEvent_OrderBy) {
    DerivativeRemovedEvent_OrderBy["Id"] = "id";
    DerivativeRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    DerivativeRemovedEvent_OrderBy["Transaction"] = "transaction";
    DerivativeRemovedEvent_OrderBy["Derivative"] = "derivative";
})(DerivativeRemovedEvent_OrderBy = exports.DerivativeRemovedEvent_OrderBy || (exports.DerivativeRemovedEvent_OrderBy = {}));
var DerivativeType;
(function (DerivativeType) {
    DerivativeType["Aave"] = "Aave";
    DerivativeType["Alpha"] = "Alpha";
    DerivativeType["Chai"] = "Chai";
    DerivativeType["Compound"] = "Compound";
    DerivativeType["CurvePool"] = "CurvePool";
    DerivativeType["Idle"] = "Idle";
    DerivativeType["Stakehound"] = "Stakehound";
    DerivativeType["Synthetix"] = "Synthetix";
    DerivativeType["UniswapPool"] = "UniswapPool";
    DerivativeType["Yearn"] = "Yearn";
})(DerivativeType = exports.DerivativeType || (exports.DerivativeType = {}));
var DerivativeUpdatedEvent_OrderBy;
(function (DerivativeUpdatedEvent_OrderBy) {
    DerivativeUpdatedEvent_OrderBy["Id"] = "id";
    DerivativeUpdatedEvent_OrderBy["Timestamp"] = "timestamp";
    DerivativeUpdatedEvent_OrderBy["Transaction"] = "transaction";
    DerivativeUpdatedEvent_OrderBy["Derivative"] = "derivative";
    DerivativeUpdatedEvent_OrderBy["PrevPriceFeed"] = "prevPriceFeed";
    DerivativeUpdatedEvent_OrderBy["NextPriceFeed"] = "nextPriceFeed";
})(DerivativeUpdatedEvent_OrderBy = exports.DerivativeUpdatedEvent_OrderBy || (exports.DerivativeUpdatedEvent_OrderBy = {}));
var DispatcherOwnershipTransferredEvent_OrderBy;
(function (DispatcherOwnershipTransferredEvent_OrderBy) {
    DispatcherOwnershipTransferredEvent_OrderBy["Id"] = "id";
    DispatcherOwnershipTransferredEvent_OrderBy["Timestamp"] = "timestamp";
    DispatcherOwnershipTransferredEvent_OrderBy["Transaction"] = "transaction";
    DispatcherOwnershipTransferredEvent_OrderBy["PrevOwner"] = "prevOwner";
    DispatcherOwnershipTransferredEvent_OrderBy["NextOwner"] = "nextOwner";
})(DispatcherOwnershipTransferredEvent_OrderBy = exports.DispatcherOwnershipTransferredEvent_OrderBy || (exports.DispatcherOwnershipTransferredEvent_OrderBy = {}));
var EntranceRateBurnFeeSetting_OrderBy;
(function (EntranceRateBurnFeeSetting_OrderBy) {
    EntranceRateBurnFeeSetting_OrderBy["Id"] = "id";
    EntranceRateBurnFeeSetting_OrderBy["Fee"] = "fee";
    EntranceRateBurnFeeSetting_OrderBy["Comptroller"] = "comptroller";
    EntranceRateBurnFeeSetting_OrderBy["Rate"] = "rate";
    EntranceRateBurnFeeSetting_OrderBy["Timestamp"] = "timestamp";
    EntranceRateBurnFeeSetting_OrderBy["Events"] = "events";
})(EntranceRateBurnFeeSetting_OrderBy = exports.EntranceRateBurnFeeSetting_OrderBy || (exports.EntranceRateBurnFeeSetting_OrderBy = {}));
var EntranceRateBurnFeeSettingsAddedEvent_OrderBy;
(function (EntranceRateBurnFeeSettingsAddedEvent_OrderBy) {
    EntranceRateBurnFeeSettingsAddedEvent_OrderBy["Id"] = "id";
    EntranceRateBurnFeeSettingsAddedEvent_OrderBy["Comptroller"] = "comptroller";
    EntranceRateBurnFeeSettingsAddedEvent_OrderBy["Timestamp"] = "timestamp";
    EntranceRateBurnFeeSettingsAddedEvent_OrderBy["Transaction"] = "transaction";
    EntranceRateBurnFeeSettingsAddedEvent_OrderBy["Rate"] = "rate";
})(EntranceRateBurnFeeSettingsAddedEvent_OrderBy = exports.EntranceRateBurnFeeSettingsAddedEvent_OrderBy || (exports.EntranceRateBurnFeeSettingsAddedEvent_OrderBy = {}));
var EntranceRateBurnFeeSettledEvent_OrderBy;
(function (EntranceRateBurnFeeSettledEvent_OrderBy) {
    EntranceRateBurnFeeSettledEvent_OrderBy["Id"] = "id";
    EntranceRateBurnFeeSettledEvent_OrderBy["Fund"] = "fund";
    EntranceRateBurnFeeSettledEvent_OrderBy["Timestamp"] = "timestamp";
    EntranceRateBurnFeeSettledEvent_OrderBy["Transaction"] = "transaction";
    EntranceRateBurnFeeSettledEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    EntranceRateBurnFeeSettledEvent_OrderBy["SharesQuantity"] = "sharesQuantity";
    EntranceRateBurnFeeSettledEvent_OrderBy["Payer"] = "payer";
})(EntranceRateBurnFeeSettledEvent_OrderBy = exports.EntranceRateBurnFeeSettledEvent_OrderBy || (exports.EntranceRateBurnFeeSettledEvent_OrderBy = {}));
var EntranceRateBurnFeeState_OrderBy;
(function (EntranceRateBurnFeeState_OrderBy) {
    EntranceRateBurnFeeState_OrderBy["Id"] = "id";
    EntranceRateBurnFeeState_OrderBy["Fund"] = "fund";
    EntranceRateBurnFeeState_OrderBy["Timestamp"] = "timestamp";
    EntranceRateBurnFeeState_OrderBy["Fee"] = "fee";
    EntranceRateBurnFeeState_OrderBy["LastSettled"] = "lastSettled";
    EntranceRateBurnFeeState_OrderBy["Events"] = "events";
})(EntranceRateBurnFeeState_OrderBy = exports.EntranceRateBurnFeeState_OrderBy || (exports.EntranceRateBurnFeeState_OrderBy = {}));
var EntranceRateDirectFeeSetting_OrderBy;
(function (EntranceRateDirectFeeSetting_OrderBy) {
    EntranceRateDirectFeeSetting_OrderBy["Id"] = "id";
    EntranceRateDirectFeeSetting_OrderBy["Fee"] = "fee";
    EntranceRateDirectFeeSetting_OrderBy["Comptroller"] = "comptroller";
    EntranceRateDirectFeeSetting_OrderBy["Rate"] = "rate";
    EntranceRateDirectFeeSetting_OrderBy["Timestamp"] = "timestamp";
    EntranceRateDirectFeeSetting_OrderBy["Events"] = "events";
})(EntranceRateDirectFeeSetting_OrderBy = exports.EntranceRateDirectFeeSetting_OrderBy || (exports.EntranceRateDirectFeeSetting_OrderBy = {}));
var EntranceRateDirectFeeSettingsAddedEvent_OrderBy;
(function (EntranceRateDirectFeeSettingsAddedEvent_OrderBy) {
    EntranceRateDirectFeeSettingsAddedEvent_OrderBy["Id"] = "id";
    EntranceRateDirectFeeSettingsAddedEvent_OrderBy["Comptroller"] = "comptroller";
    EntranceRateDirectFeeSettingsAddedEvent_OrderBy["Timestamp"] = "timestamp";
    EntranceRateDirectFeeSettingsAddedEvent_OrderBy["Transaction"] = "transaction";
    EntranceRateDirectFeeSettingsAddedEvent_OrderBy["Rate"] = "rate";
})(EntranceRateDirectFeeSettingsAddedEvent_OrderBy = exports.EntranceRateDirectFeeSettingsAddedEvent_OrderBy || (exports.EntranceRateDirectFeeSettingsAddedEvent_OrderBy = {}));
var EntranceRateDirectFeeSettledEvent_OrderBy;
(function (EntranceRateDirectFeeSettledEvent_OrderBy) {
    EntranceRateDirectFeeSettledEvent_OrderBy["Id"] = "id";
    EntranceRateDirectFeeSettledEvent_OrderBy["Fund"] = "fund";
    EntranceRateDirectFeeSettledEvent_OrderBy["Timestamp"] = "timestamp";
    EntranceRateDirectFeeSettledEvent_OrderBy["Transaction"] = "transaction";
    EntranceRateDirectFeeSettledEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    EntranceRateDirectFeeSettledEvent_OrderBy["SharesQuantity"] = "sharesQuantity";
    EntranceRateDirectFeeSettledEvent_OrderBy["Payer"] = "payer";
})(EntranceRateDirectFeeSettledEvent_OrderBy = exports.EntranceRateDirectFeeSettledEvent_OrderBy || (exports.EntranceRateDirectFeeSettledEvent_OrderBy = {}));
var EntranceRateDirectFeeState_OrderBy;
(function (EntranceRateDirectFeeState_OrderBy) {
    EntranceRateDirectFeeState_OrderBy["Id"] = "id";
    EntranceRateDirectFeeState_OrderBy["Fund"] = "fund";
    EntranceRateDirectFeeState_OrderBy["Timestamp"] = "timestamp";
    EntranceRateDirectFeeState_OrderBy["Fee"] = "fee";
    EntranceRateDirectFeeState_OrderBy["LastSettled"] = "lastSettled";
    EntranceRateDirectFeeState_OrderBy["Events"] = "events";
})(EntranceRateDirectFeeState_OrderBy = exports.EntranceRateDirectFeeState_OrderBy || (exports.EntranceRateDirectFeeState_OrderBy = {}));
var EthUsdAggregatorSetEvent_OrderBy;
(function (EthUsdAggregatorSetEvent_OrderBy) {
    EthUsdAggregatorSetEvent_OrderBy["Id"] = "id";
    EthUsdAggregatorSetEvent_OrderBy["Timestamp"] = "timestamp";
    EthUsdAggregatorSetEvent_OrderBy["Transaction"] = "transaction";
    EthUsdAggregatorSetEvent_OrderBy["PrevEthUsdAggregator"] = "prevEthUsdAggregator";
    EthUsdAggregatorSetEvent_OrderBy["NextEthUsdAggregator"] = "nextEthUsdAggregator";
})(EthUsdAggregatorSetEvent_OrderBy = exports.EthUsdAggregatorSetEvent_OrderBy || (exports.EthUsdAggregatorSetEvent_OrderBy = {}));
var EventInterface_OrderBy;
(function (EventInterface_OrderBy) {
    EventInterface_OrderBy["Id"] = "id";
    EventInterface_OrderBy["Timestamp"] = "timestamp";
    EventInterface_OrderBy["Transaction"] = "transaction";
})(EventInterface_OrderBy = exports.EventInterface_OrderBy || (exports.EventInterface_OrderBy = {}));
var FeeDeregisteredEvent_OrderBy;
(function (FeeDeregisteredEvent_OrderBy) {
    FeeDeregisteredEvent_OrderBy["Id"] = "id";
    FeeDeregisteredEvent_OrderBy["Timestamp"] = "timestamp";
    FeeDeregisteredEvent_OrderBy["Transaction"] = "transaction";
    FeeDeregisteredEvent_OrderBy["Fee"] = "fee";
    FeeDeregisteredEvent_OrderBy["Identifier"] = "identifier";
})(FeeDeregisteredEvent_OrderBy = exports.FeeDeregisteredEvent_OrderBy || (exports.FeeDeregisteredEvent_OrderBy = {}));
var FeeEnabledForFundEvent_OrderBy;
(function (FeeEnabledForFundEvent_OrderBy) {
    FeeEnabledForFundEvent_OrderBy["Id"] = "id";
    FeeEnabledForFundEvent_OrderBy["Fund"] = "fund";
    FeeEnabledForFundEvent_OrderBy["Timestamp"] = "timestamp";
    FeeEnabledForFundEvent_OrderBy["Transaction"] = "transaction";
    FeeEnabledForFundEvent_OrderBy["Fee"] = "fee";
    FeeEnabledForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    FeeEnabledForFundEvent_OrderBy["SettingsData"] = "settingsData";
})(FeeEnabledForFundEvent_OrderBy = exports.FeeEnabledForFundEvent_OrderBy || (exports.FeeEnabledForFundEvent_OrderBy = {}));
var FeeHook;
(function (FeeHook) {
    FeeHook["Continuous"] = "Continuous";
    FeeHook["BuySharesSetup"] = "BuySharesSetup";
    FeeHook["PreBuyShares"] = "PreBuyShares";
    FeeHook["PostBuyShares"] = "PostBuyShares";
    FeeHook["BuySharesCompleted"] = "BuySharesCompleted";
    FeeHook["PreRedeemShares"] = "PreRedeemShares";
    FeeHook["Unknown"] = "Unknown";
})(FeeHook = exports.FeeHook || (exports.FeeHook = {}));
var FeeManager_OrderBy;
(function (FeeManager_OrderBy) {
    FeeManager_OrderBy["Id"] = "id";
    FeeManager_OrderBy["Release"] = "release";
    FeeManager_OrderBy["Fees"] = "fees";
})(FeeManager_OrderBy = exports.FeeManager_OrderBy || (exports.FeeManager_OrderBy = {}));
var FeeRegisteredEvent_OrderBy;
(function (FeeRegisteredEvent_OrderBy) {
    FeeRegisteredEvent_OrderBy["Id"] = "id";
    FeeRegisteredEvent_OrderBy["Timestamp"] = "timestamp";
    FeeRegisteredEvent_OrderBy["Transaction"] = "transaction";
    FeeRegisteredEvent_OrderBy["Fee"] = "fee";
    FeeRegisteredEvent_OrderBy["Identifier"] = "identifier";
    FeeRegisteredEvent_OrderBy["ImplementedHooksForSettle"] = "implementedHooksForSettle";
    FeeRegisteredEvent_OrderBy["ImplementedHooksForUpdate"] = "implementedHooksForUpdate";
    FeeRegisteredEvent_OrderBy["UsesGavOnSettle"] = "usesGavOnSettle";
    FeeRegisteredEvent_OrderBy["UsesGavOnUpdate"] = "usesGavOnUpdate";
})(FeeRegisteredEvent_OrderBy = exports.FeeRegisteredEvent_OrderBy || (exports.FeeRegisteredEvent_OrderBy = {}));
var FeeSettingInterface_OrderBy;
(function (FeeSettingInterface_OrderBy) {
    FeeSettingInterface_OrderBy["Id"] = "id";
    FeeSettingInterface_OrderBy["Fee"] = "fee";
    FeeSettingInterface_OrderBy["Comptroller"] = "comptroller";
    FeeSettingInterface_OrderBy["Timestamp"] = "timestamp";
    FeeSettingInterface_OrderBy["Events"] = "events";
})(FeeSettingInterface_OrderBy = exports.FeeSettingInterface_OrderBy || (exports.FeeSettingInterface_OrderBy = {}));
var FeeSettledForFundEvent_OrderBy;
(function (FeeSettledForFundEvent_OrderBy) {
    FeeSettledForFundEvent_OrderBy["Id"] = "id";
    FeeSettledForFundEvent_OrderBy["Fund"] = "fund";
    FeeSettledForFundEvent_OrderBy["Type"] = "type";
    FeeSettledForFundEvent_OrderBy["Investor"] = "investor";
    FeeSettledForFundEvent_OrderBy["Timestamp"] = "timestamp";
    FeeSettledForFundEvent_OrderBy["Transaction"] = "transaction";
    FeeSettledForFundEvent_OrderBy["InvestmentState"] = "investmentState";
    FeeSettledForFundEvent_OrderBy["Shares"] = "shares";
    FeeSettledForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    FeeSettledForFundEvent_OrderBy["Fee"] = "fee";
    FeeSettledForFundEvent_OrderBy["Payer"] = "payer";
    FeeSettledForFundEvent_OrderBy["Payee"] = "payee";
    FeeSettledForFundEvent_OrderBy["SettlementType"] = "settlementType";
    FeeSettledForFundEvent_OrderBy["SharesDue"] = "sharesDue";
    FeeSettledForFundEvent_OrderBy["FundState"] = "fundState";
})(FeeSettledForFundEvent_OrderBy = exports.FeeSettledForFundEvent_OrderBy || (exports.FeeSettledForFundEvent_OrderBy = {}));
var FeeSharesChangeInterface_OrderBy;
(function (FeeSharesChangeInterface_OrderBy) {
    FeeSharesChangeInterface_OrderBy["Id"] = "id";
    FeeSharesChangeInterface_OrderBy["Fund"] = "fund";
    FeeSharesChangeInterface_OrderBy["Investor"] = "investor";
    FeeSharesChangeInterface_OrderBy["Timestamp"] = "timestamp";
    FeeSharesChangeInterface_OrderBy["Type"] = "type";
    FeeSharesChangeInterface_OrderBy["InvestmentState"] = "investmentState";
    FeeSharesChangeInterface_OrderBy["Shares"] = "shares";
    FeeSharesChangeInterface_OrderBy["FundState"] = "fundState";
    FeeSharesChangeInterface_OrderBy["Transaction"] = "transaction";
})(FeeSharesChangeInterface_OrderBy = exports.FeeSharesChangeInterface_OrderBy || (exports.FeeSharesChangeInterface_OrderBy = {}));
var FeeState_OrderBy;
(function (FeeState_OrderBy) {
    FeeState_OrderBy["Id"] = "id";
    FeeState_OrderBy["Fund"] = "fund";
    FeeState_OrderBy["Timestamp"] = "timestamp";
    FeeState_OrderBy["FeeStates"] = "feeStates";
    FeeState_OrderBy["Events"] = "events";
})(FeeState_OrderBy = exports.FeeState_OrderBy || (exports.FeeState_OrderBy = {}));
var Fee_OrderBy;
(function (Fee_OrderBy) {
    Fee_OrderBy["Id"] = "id";
    Fee_OrderBy["FeeManager"] = "feeManager";
    Fee_OrderBy["Identifier"] = "identifier";
    Fee_OrderBy["Settings"] = "settings";
})(Fee_OrderBy = exports.Fee_OrderBy || (exports.Fee_OrderBy = {}));
var FeesRecipientSetForFundEvent_OrderBy;
(function (FeesRecipientSetForFundEvent_OrderBy) {
    FeesRecipientSetForFundEvent_OrderBy["Id"] = "id";
    FeesRecipientSetForFundEvent_OrderBy["Fund"] = "fund";
    FeesRecipientSetForFundEvent_OrderBy["Timestamp"] = "timestamp";
    FeesRecipientSetForFundEvent_OrderBy["Transaction"] = "transaction";
    FeesRecipientSetForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    FeesRecipientSetForFundEvent_OrderBy["PrevFeesRecipient"] = "prevFeesRecipient";
    FeesRecipientSetForFundEvent_OrderBy["NextFeesRecipient"] = "nextFeesRecipient";
})(FeesRecipientSetForFundEvent_OrderBy = exports.FeesRecipientSetForFundEvent_OrderBy || (exports.FeesRecipientSetForFundEvent_OrderBy = {}));
var FundDeployerSetEvent_OrderBy;
(function (FundDeployerSetEvent_OrderBy) {
    FundDeployerSetEvent_OrderBy["Id"] = "id";
    FundDeployerSetEvent_OrderBy["Timestamp"] = "timestamp";
    FundDeployerSetEvent_OrderBy["Transaction"] = "transaction";
    FundDeployerSetEvent_OrderBy["NextFundDeployer"] = "nextFundDeployer";
    FundDeployerSetEvent_OrderBy["PrevFundDeployer"] = "prevFundDeployer";
})(FundDeployerSetEvent_OrderBy = exports.FundDeployerSetEvent_OrderBy || (exports.FundDeployerSetEvent_OrderBy = {}));
var FundEventInterface_OrderBy;
(function (FundEventInterface_OrderBy) {
    FundEventInterface_OrderBy["Id"] = "id";
    FundEventInterface_OrderBy["Fund"] = "fund";
    FundEventInterface_OrderBy["Timestamp"] = "timestamp";
    FundEventInterface_OrderBy["Transaction"] = "transaction";
})(FundEventInterface_OrderBy = exports.FundEventInterface_OrderBy || (exports.FundEventInterface_OrderBy = {}));
var FundStateInterface_OrderBy;
(function (FundStateInterface_OrderBy) {
    FundStateInterface_OrderBy["Id"] = "id";
    FundStateInterface_OrderBy["Fund"] = "fund";
    FundStateInterface_OrderBy["Timestamp"] = "timestamp";
    FundStateInterface_OrderBy["Events"] = "events";
})(FundStateInterface_OrderBy = exports.FundStateInterface_OrderBy || (exports.FundStateInterface_OrderBy = {}));
var FundState_OrderBy;
(function (FundState_OrderBy) {
    FundState_OrderBy["Id"] = "id";
    FundState_OrderBy["Fund"] = "fund";
    FundState_OrderBy["Timestamp"] = "timestamp";
    FundState_OrderBy["Shares"] = "shares";
    FundState_OrderBy["Portfolio"] = "portfolio";
    FundState_OrderBy["FeeState"] = "feeState";
    FundState_OrderBy["CurrencyPrices"] = "currencyPrices";
    FundState_OrderBy["InvestmentCount"] = "investmentCount";
    FundState_OrderBy["Events"] = "events";
})(FundState_OrderBy = exports.FundState_OrderBy || (exports.FundState_OrderBy = {}));
var Fund_OrderBy;
(function (Fund_OrderBy) {
    Fund_OrderBy["Id"] = "id";
    Fund_OrderBy["Accessor"] = "accessor";
    Fund_OrderBy["ComptrollerProxies"] = "comptrollerProxies";
    Fund_OrderBy["Name"] = "name";
    Fund_OrderBy["Inception"] = "inception";
    Fund_OrderBy["Creator"] = "creator";
    Fund_OrderBy["Release"] = "release";
    Fund_OrderBy["Manager"] = "manager";
    Fund_OrderBy["Migrator"] = "migrator";
    Fund_OrderBy["LastKnowGavInEth"] = "lastKnowGavInEth";
    Fund_OrderBy["TrackedAssets"] = "trackedAssets";
    Fund_OrderBy["Trades"] = "trades";
    Fund_OrderBy["Investments"] = "investments";
    Fund_OrderBy["InvestmentCount"] = "investmentCount";
    Fund_OrderBy["SharesChanges"] = "sharesChanges";
    Fund_OrderBy["FeeSharesChanges"] = "feeSharesChanges";
    Fund_OrderBy["InvestmentSharesChanges"] = "investmentSharesChanges";
    Fund_OrderBy["Shares"] = "shares";
    Fund_OrderBy["SharesHistory"] = "sharesHistory";
    Fund_OrderBy["Portfolio"] = "portfolio";
    Fund_OrderBy["PortfolioHistory"] = "portfolioHistory";
    Fund_OrderBy["FeeState"] = "feeState";
    Fund_OrderBy["FeeStateHistory"] = "feeStateHistory";
    Fund_OrderBy["State"] = "state";
    Fund_OrderBy["StateHistory"] = "stateHistory";
    Fund_OrderBy["FirstInvestmentState"] = "firstInvestmentState";
    Fund_OrderBy["HourlyStates"] = "hourlyStates";
    Fund_OrderBy["DailyStates"] = "dailyStates";
    Fund_OrderBy["MonthlyStates"] = "monthlyStates";
    Fund_OrderBy["Events"] = "events";
    Fund_OrderBy["Migrations"] = "migrations";
})(Fund_OrderBy = exports.Fund_OrderBy || (exports.Fund_OrderBy = {}));
var GuaranteedRedemptionAdapterAddedEvent_OrderBy;
(function (GuaranteedRedemptionAdapterAddedEvent_OrderBy) {
    GuaranteedRedemptionAdapterAddedEvent_OrderBy["Id"] = "id";
    GuaranteedRedemptionAdapterAddedEvent_OrderBy["Timestamp"] = "timestamp";
    GuaranteedRedemptionAdapterAddedEvent_OrderBy["Transaction"] = "transaction";
    GuaranteedRedemptionAdapterAddedEvent_OrderBy["Adapter"] = "adapter";
})(GuaranteedRedemptionAdapterAddedEvent_OrderBy = exports.GuaranteedRedemptionAdapterAddedEvent_OrderBy || (exports.GuaranteedRedemptionAdapterAddedEvent_OrderBy = {}));
var GuaranteedRedemptionAdapterRemovedEvent_OrderBy;
(function (GuaranteedRedemptionAdapterRemovedEvent_OrderBy) {
    GuaranteedRedemptionAdapterRemovedEvent_OrderBy["Id"] = "id";
    GuaranteedRedemptionAdapterRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    GuaranteedRedemptionAdapterRemovedEvent_OrderBy["Transaction"] = "transaction";
    GuaranteedRedemptionAdapterRemovedEvent_OrderBy["Adapter"] = "adapter";
})(GuaranteedRedemptionAdapterRemovedEvent_OrderBy = exports.GuaranteedRedemptionAdapterRemovedEvent_OrderBy || (exports.GuaranteedRedemptionAdapterRemovedEvent_OrderBy = {}));
var GuaranteedRedemptionFundSettingsSetEvent_OrderBy;
(function (GuaranteedRedemptionFundSettingsSetEvent_OrderBy) {
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["Id"] = "id";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["Fund"] = "fund";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["Timestamp"] = "timestamp";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["Transaction"] = "transaction";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["StartTimestamp"] = "startTimestamp";
    GuaranteedRedemptionFundSettingsSetEvent_OrderBy["Duration"] = "duration";
})(GuaranteedRedemptionFundSettingsSetEvent_OrderBy = exports.GuaranteedRedemptionFundSettingsSetEvent_OrderBy || (exports.GuaranteedRedemptionFundSettingsSetEvent_OrderBy = {}));
var GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy;
(function (GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy) {
    GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy["Id"] = "id";
    GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy["Timestamp"] = "timestamp";
    GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy["Transaction"] = "transaction";
    GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy["PrevBuffer"] = "prevBuffer";
    GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy["NextBuffer"] = "nextBuffer";
})(GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy = exports.GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy || (exports.GuaranteedRedemptionRedemptionWindowBufferSetEvent_OrderBy = {}));
var GuaranteedRedemptionSetting_OrderBy;
(function (GuaranteedRedemptionSetting_OrderBy) {
    GuaranteedRedemptionSetting_OrderBy["Id"] = "id";
    GuaranteedRedemptionSetting_OrderBy["Policy"] = "policy";
    GuaranteedRedemptionSetting_OrderBy["Comptroller"] = "comptroller";
    GuaranteedRedemptionSetting_OrderBy["StartTimestamp"] = "startTimestamp";
    GuaranteedRedemptionSetting_OrderBy["Duration"] = "duration";
    GuaranteedRedemptionSetting_OrderBy["Timestamp"] = "timestamp";
    GuaranteedRedemptionSetting_OrderBy["Enabled"] = "enabled";
    GuaranteedRedemptionSetting_OrderBy["Events"] = "events";
})(GuaranteedRedemptionSetting_OrderBy = exports.GuaranteedRedemptionSetting_OrderBy || (exports.GuaranteedRedemptionSetting_OrderBy = {}));
var GuaranteedRedemption_OrderBy;
(function (GuaranteedRedemption_OrderBy) {
    GuaranteedRedemption_OrderBy["Id"] = "id";
    GuaranteedRedemption_OrderBy["Adapters"] = "adapters";
    GuaranteedRedemption_OrderBy["Buffer"] = "buffer";
})(GuaranteedRedemption_OrderBy = exports.GuaranteedRedemption_OrderBy || (exports.GuaranteedRedemption_OrderBy = {}));
var HoldingState_OrderBy;
(function (HoldingState_OrderBy) {
    HoldingState_OrderBy["Id"] = "id";
    HoldingState_OrderBy["Fund"] = "fund";
    HoldingState_OrderBy["Timestamp"] = "timestamp";
    HoldingState_OrderBy["Asset"] = "asset";
    HoldingState_OrderBy["Price"] = "price";
    HoldingState_OrderBy["Amount"] = "amount";
    HoldingState_OrderBy["Events"] = "events";
})(HoldingState_OrderBy = exports.HoldingState_OrderBy || (exports.HoldingState_OrderBy = {}));
var HourlyAssetPriceCandle_OrderBy;
(function (HourlyAssetPriceCandle_OrderBy) {
    HourlyAssetPriceCandle_OrderBy["Id"] = "id";
    HourlyAssetPriceCandle_OrderBy["Asset"] = "asset";
    HourlyAssetPriceCandle_OrderBy["Group"] = "group";
    HourlyAssetPriceCandle_OrderBy["From"] = "from";
    HourlyAssetPriceCandle_OrderBy["To"] = "to";
    HourlyAssetPriceCandle_OrderBy["Open"] = "open";
    HourlyAssetPriceCandle_OrderBy["OpenRef"] = "openRef";
    HourlyAssetPriceCandle_OrderBy["Close"] = "close";
    HourlyAssetPriceCandle_OrderBy["CloseRef"] = "closeRef";
    HourlyAssetPriceCandle_OrderBy["Low"] = "low";
    HourlyAssetPriceCandle_OrderBy["LowRef"] = "lowRef";
    HourlyAssetPriceCandle_OrderBy["High"] = "high";
    HourlyAssetPriceCandle_OrderBy["HighRef"] = "highRef";
})(HourlyAssetPriceCandle_OrderBy = exports.HourlyAssetPriceCandle_OrderBy || (exports.HourlyAssetPriceCandle_OrderBy = {}));
var HourlyCurrencyPriceCandle_OrderBy;
(function (HourlyCurrencyPriceCandle_OrderBy) {
    HourlyCurrencyPriceCandle_OrderBy["Id"] = "id";
    HourlyCurrencyPriceCandle_OrderBy["Currency"] = "currency";
    HourlyCurrencyPriceCandle_OrderBy["Group"] = "group";
    HourlyCurrencyPriceCandle_OrderBy["From"] = "from";
    HourlyCurrencyPriceCandle_OrderBy["To"] = "to";
    HourlyCurrencyPriceCandle_OrderBy["Open"] = "open";
    HourlyCurrencyPriceCandle_OrderBy["OpenRef"] = "openRef";
    HourlyCurrencyPriceCandle_OrderBy["Close"] = "close";
    HourlyCurrencyPriceCandle_OrderBy["CloseRef"] = "closeRef";
    HourlyCurrencyPriceCandle_OrderBy["Low"] = "low";
    HourlyCurrencyPriceCandle_OrderBy["LowRef"] = "lowRef";
    HourlyCurrencyPriceCandle_OrderBy["High"] = "high";
    HourlyCurrencyPriceCandle_OrderBy["HighRef"] = "highRef";
})(HourlyCurrencyPriceCandle_OrderBy = exports.HourlyCurrencyPriceCandle_OrderBy || (exports.HourlyCurrencyPriceCandle_OrderBy = {}));
var HourlyFundState_OrderBy;
(function (HourlyFundState_OrderBy) {
    HourlyFundState_OrderBy["Id"] = "id";
    HourlyFundState_OrderBy["Fund"] = "fund";
    HourlyFundState_OrderBy["Start"] = "start";
    HourlyFundState_OrderBy["End"] = "end";
    HourlyFundState_OrderBy["First"] = "first";
    HourlyFundState_OrderBy["Last"] = "last";
})(HourlyFundState_OrderBy = exports.HourlyFundState_OrderBy || (exports.HourlyFundState_OrderBy = {}));
var HourlyPriceCandleGroup_OrderBy;
(function (HourlyPriceCandleGroup_OrderBy) {
    HourlyPriceCandleGroup_OrderBy["Id"] = "id";
    HourlyPriceCandleGroup_OrderBy["From"] = "from";
    HourlyPriceCandleGroup_OrderBy["To"] = "to";
    HourlyPriceCandleGroup_OrderBy["AssetCandles"] = "assetCandles";
    HourlyPriceCandleGroup_OrderBy["CurrencyCandles"] = "currencyCandles";
})(HourlyPriceCandleGroup_OrderBy = exports.HourlyPriceCandleGroup_OrderBy || (exports.HourlyPriceCandleGroup_OrderBy = {}));
var IndividualFeeStateInterface_OrderBy;
(function (IndividualFeeStateInterface_OrderBy) {
    IndividualFeeStateInterface_OrderBy["Id"] = "id";
    IndividualFeeStateInterface_OrderBy["Fund"] = "fund";
    IndividualFeeStateInterface_OrderBy["Timestamp"] = "timestamp";
    IndividualFeeStateInterface_OrderBy["Fee"] = "fee";
    IndividualFeeStateInterface_OrderBy["Events"] = "events";
})(IndividualFeeStateInterface_OrderBy = exports.IndividualFeeStateInterface_OrderBy || (exports.IndividualFeeStateInterface_OrderBy = {}));
var IntegrationAdapter_OrderBy;
(function (IntegrationAdapter_OrderBy) {
    IntegrationAdapter_OrderBy["Id"] = "id";
    IntegrationAdapter_OrderBy["IntegrationManager"] = "integrationManager";
    IntegrationAdapter_OrderBy["Identifier"] = "identifier";
    IntegrationAdapter_OrderBy["Blacklisted"] = "blacklisted";
    IntegrationAdapter_OrderBy["Whitelisted"] = "whitelisted";
})(IntegrationAdapter_OrderBy = exports.IntegrationAdapter_OrderBy || (exports.IntegrationAdapter_OrderBy = {}));
var IntegrationManager_OrderBy;
(function (IntegrationManager_OrderBy) {
    IntegrationManager_OrderBy["Id"] = "id";
    IntegrationManager_OrderBy["Release"] = "release";
    IntegrationManager_OrderBy["Adapters"] = "adapters";
})(IntegrationManager_OrderBy = exports.IntegrationManager_OrderBy || (exports.IntegrationManager_OrderBy = {}));
var IntegrationMethod;
(function (IntegrationMethod) {
    IntegrationMethod["AddTrackedAssets"] = "ADD_TRACKED_ASSETS";
    IntegrationMethod["RemoveTrackedAssets"] = "REMOVE_TRACKED_ASSETS";
    IntegrationMethod["ApproveAssets"] = "APPROVE_ASSETS";
    IntegrationMethod["TakeOrder"] = "TAKE_ORDER";
    IntegrationMethod["Lend"] = "LEND";
    IntegrationMethod["Redeem"] = "REDEEM";
    IntegrationMethod["Stake"] = "STAKE";
    IntegrationMethod["Unstake"] = "UNSTAKE";
    IntegrationMethod["ClaimRewards"] = "CLAIM_REWARDS";
    IntegrationMethod["ClaimRewardsAndReinvest"] = "CLAIM_REWARDS_AND_REINVEST";
    IntegrationMethod["ClaimRewardsAndSwap"] = "CLAIM_REWARDS_AND_SWAP";
    IntegrationMethod["LendAndStake"] = "LEND_AND_STAKE";
    IntegrationMethod["UnstakeAndRedeem"] = "UNSTAKE_AND_REDEEM";
    IntegrationMethod["Unknown"] = "UNKNOWN";
})(IntegrationMethod = exports.IntegrationMethod || (exports.IntegrationMethod = {}));
var InvestmentSharesChangeInterface_OrderBy;
(function (InvestmentSharesChangeInterface_OrderBy) {
    InvestmentSharesChangeInterface_OrderBy["Id"] = "id";
    InvestmentSharesChangeInterface_OrderBy["Fund"] = "fund";
    InvestmentSharesChangeInterface_OrderBy["Investor"] = "investor";
    InvestmentSharesChangeInterface_OrderBy["Timestamp"] = "timestamp";
    InvestmentSharesChangeInterface_OrderBy["Type"] = "type";
    InvestmentSharesChangeInterface_OrderBy["InvestmentState"] = "investmentState";
    InvestmentSharesChangeInterface_OrderBy["Shares"] = "shares";
    InvestmentSharesChangeInterface_OrderBy["FundState"] = "fundState";
    InvestmentSharesChangeInterface_OrderBy["Transaction"] = "transaction";
})(InvestmentSharesChangeInterface_OrderBy = exports.InvestmentSharesChangeInterface_OrderBy || (exports.InvestmentSharesChangeInterface_OrderBy = {}));
var InvestmentState_OrderBy;
(function (InvestmentState_OrderBy) {
    InvestmentState_OrderBy["Id"] = "id";
    InvestmentState_OrderBy["Timestamp"] = "timestamp";
    InvestmentState_OrderBy["Fund"] = "fund";
    InvestmentState_OrderBy["Investor"] = "investor";
    InvestmentState_OrderBy["Investment"] = "investment";
    InvestmentState_OrderBy["Shares"] = "shares";
    InvestmentState_OrderBy["Changes"] = "changes";
    InvestmentState_OrderBy["FundState"] = "fundState";
})(InvestmentState_OrderBy = exports.InvestmentState_OrderBy || (exports.InvestmentState_OrderBy = {}));
var Investment_OrderBy;
(function (Investment_OrderBy) {
    Investment_OrderBy["Id"] = "id";
    Investment_OrderBy["Since"] = "since";
    Investment_OrderBy["Fund"] = "fund";
    Investment_OrderBy["Investor"] = "investor";
    Investment_OrderBy["Shares"] = "shares";
    Investment_OrderBy["State"] = "state";
    Investment_OrderBy["StateHistory"] = "stateHistory";
})(Investment_OrderBy = exports.Investment_OrderBy || (exports.Investment_OrderBy = {}));
var InvestorWhitelistAddressesAddedEvent_OrderBy;
(function (InvestorWhitelistAddressesAddedEvent_OrderBy) {
    InvestorWhitelistAddressesAddedEvent_OrderBy["Id"] = "id";
    InvestorWhitelistAddressesAddedEvent_OrderBy["Fund"] = "fund";
    InvestorWhitelistAddressesAddedEvent_OrderBy["Timestamp"] = "timestamp";
    InvestorWhitelistAddressesAddedEvent_OrderBy["Transaction"] = "transaction";
    InvestorWhitelistAddressesAddedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    InvestorWhitelistAddressesAddedEvent_OrderBy["Items"] = "items";
})(InvestorWhitelistAddressesAddedEvent_OrderBy = exports.InvestorWhitelistAddressesAddedEvent_OrderBy || (exports.InvestorWhitelistAddressesAddedEvent_OrderBy = {}));
var InvestorWhitelistAddressesRemovedEvent_OrderBy;
(function (InvestorWhitelistAddressesRemovedEvent_OrderBy) {
    InvestorWhitelistAddressesRemovedEvent_OrderBy["Id"] = "id";
    InvestorWhitelistAddressesRemovedEvent_OrderBy["Fund"] = "fund";
    InvestorWhitelistAddressesRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    InvestorWhitelistAddressesRemovedEvent_OrderBy["Transaction"] = "transaction";
    InvestorWhitelistAddressesRemovedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    InvestorWhitelistAddressesRemovedEvent_OrderBy["Items"] = "items";
})(InvestorWhitelistAddressesRemovedEvent_OrderBy = exports.InvestorWhitelistAddressesRemovedEvent_OrderBy || (exports.InvestorWhitelistAddressesRemovedEvent_OrderBy = {}));
var InvestorWhitelistSetting_OrderBy;
(function (InvestorWhitelistSetting_OrderBy) {
    InvestorWhitelistSetting_OrderBy["Id"] = "id";
    InvestorWhitelistSetting_OrderBy["Policy"] = "policy";
    InvestorWhitelistSetting_OrderBy["Comptroller"] = "comptroller";
    InvestorWhitelistSetting_OrderBy["Listed"] = "listed";
    InvestorWhitelistSetting_OrderBy["Timestamp"] = "timestamp";
    InvestorWhitelistSetting_OrderBy["Enabled"] = "enabled";
    InvestorWhitelistSetting_OrderBy["Events"] = "events";
})(InvestorWhitelistSetting_OrderBy = exports.InvestorWhitelistSetting_OrderBy || (exports.InvestorWhitelistSetting_OrderBy = {}));
var LendAndStakeTrade_OrderBy;
(function (LendAndStakeTrade_OrderBy) {
    LendAndStakeTrade_OrderBy["Id"] = "id";
    LendAndStakeTrade_OrderBy["Fund"] = "fund";
    LendAndStakeTrade_OrderBy["Adapter"] = "adapter";
    LendAndStakeTrade_OrderBy["Method"] = "method";
    LendAndStakeTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    LendAndStakeTrade_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    LendAndStakeTrade_OrderBy["Timestamp"] = "timestamp";
    LendAndStakeTrade_OrderBy["FundState"] = "fundState";
})(LendAndStakeTrade_OrderBy = exports.LendAndStakeTrade_OrderBy || (exports.LendAndStakeTrade_OrderBy = {}));
var LendTrade_OrderBy;
(function (LendTrade_OrderBy) {
    LendTrade_OrderBy["Id"] = "id";
    LendTrade_OrderBy["Fund"] = "fund";
    LendTrade_OrderBy["Adapter"] = "adapter";
    LendTrade_OrderBy["Method"] = "method";
    LendTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    LendTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    LendTrade_OrderBy["Price"] = "price";
    LendTrade_OrderBy["Timestamp"] = "timestamp";
    LendTrade_OrderBy["FundState"] = "fundState";
})(LendTrade_OrderBy = exports.LendTrade_OrderBy || (exports.LendTrade_OrderBy = {}));
var ManagementFeeActivatedForMigratedFundEvent_OrderBy;
(function (ManagementFeeActivatedForMigratedFundEvent_OrderBy) {
    ManagementFeeActivatedForMigratedFundEvent_OrderBy["Id"] = "id";
    ManagementFeeActivatedForMigratedFundEvent_OrderBy["Fund"] = "fund";
    ManagementFeeActivatedForMigratedFundEvent_OrderBy["Timestamp"] = "timestamp";
    ManagementFeeActivatedForMigratedFundEvent_OrderBy["Transaction"] = "transaction";
    ManagementFeeActivatedForMigratedFundEvent_OrderBy["Comptroller"] = "comptroller";
})(ManagementFeeActivatedForMigratedFundEvent_OrderBy = exports.ManagementFeeActivatedForMigratedFundEvent_OrderBy || (exports.ManagementFeeActivatedForMigratedFundEvent_OrderBy = {}));
var ManagementFeeSetting_OrderBy;
(function (ManagementFeeSetting_OrderBy) {
    ManagementFeeSetting_OrderBy["Id"] = "id";
    ManagementFeeSetting_OrderBy["Fee"] = "fee";
    ManagementFeeSetting_OrderBy["Comptroller"] = "comptroller";
    ManagementFeeSetting_OrderBy["ScaledPerSecondRate"] = "scaledPerSecondRate";
    ManagementFeeSetting_OrderBy["Timestamp"] = "timestamp";
    ManagementFeeSetting_OrderBy["Events"] = "events";
})(ManagementFeeSetting_OrderBy = exports.ManagementFeeSetting_OrderBy || (exports.ManagementFeeSetting_OrderBy = {}));
var ManagementFeeSettingsAddedEvent_OrderBy;
(function (ManagementFeeSettingsAddedEvent_OrderBy) {
    ManagementFeeSettingsAddedEvent_OrderBy["Id"] = "id";
    ManagementFeeSettingsAddedEvent_OrderBy["Timestamp"] = "timestamp";
    ManagementFeeSettingsAddedEvent_OrderBy["Transaction"] = "transaction";
    ManagementFeeSettingsAddedEvent_OrderBy["Comptroller"] = "comptroller";
    ManagementFeeSettingsAddedEvent_OrderBy["ScaledPerSecondRate"] = "scaledPerSecondRate";
})(ManagementFeeSettingsAddedEvent_OrderBy = exports.ManagementFeeSettingsAddedEvent_OrderBy || (exports.ManagementFeeSettingsAddedEvent_OrderBy = {}));
var ManagementFeeSettledEvent_OrderBy;
(function (ManagementFeeSettledEvent_OrderBy) {
    ManagementFeeSettledEvent_OrderBy["Id"] = "id";
    ManagementFeeSettledEvent_OrderBy["Fund"] = "fund";
    ManagementFeeSettledEvent_OrderBy["Timestamp"] = "timestamp";
    ManagementFeeSettledEvent_OrderBy["Transaction"] = "transaction";
    ManagementFeeSettledEvent_OrderBy["Comptroller"] = "comptroller";
    ManagementFeeSettledEvent_OrderBy["SharesDue"] = "sharesDue";
    ManagementFeeSettledEvent_OrderBy["SecondsSinceSettlement"] = "secondsSinceSettlement";
})(ManagementFeeSettledEvent_OrderBy = exports.ManagementFeeSettledEvent_OrderBy || (exports.ManagementFeeSettledEvent_OrderBy = {}));
var ManagementFeeState_OrderBy;
(function (ManagementFeeState_OrderBy) {
    ManagementFeeState_OrderBy["Id"] = "id";
    ManagementFeeState_OrderBy["Fund"] = "fund";
    ManagementFeeState_OrderBy["Timestamp"] = "timestamp";
    ManagementFeeState_OrderBy["Fee"] = "fee";
    ManagementFeeState_OrderBy["LastSettled"] = "lastSettled";
    ManagementFeeState_OrderBy["TotalSharesPaidOut"] = "totalSharesPaidOut";
    ManagementFeeState_OrderBy["Events"] = "events";
})(ManagementFeeState_OrderBy = exports.ManagementFeeState_OrderBy || (exports.ManagementFeeState_OrderBy = {}));
var MaxConcentrationSetEvent_OrderBy;
(function (MaxConcentrationSetEvent_OrderBy) {
    MaxConcentrationSetEvent_OrderBy["Id"] = "id";
    MaxConcentrationSetEvent_OrderBy["Fund"] = "fund";
    MaxConcentrationSetEvent_OrderBy["Timestamp"] = "timestamp";
    MaxConcentrationSetEvent_OrderBy["Transaction"] = "transaction";
    MaxConcentrationSetEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    MaxConcentrationSetEvent_OrderBy["Value"] = "value";
})(MaxConcentrationSetEvent_OrderBy = exports.MaxConcentrationSetEvent_OrderBy || (exports.MaxConcentrationSetEvent_OrderBy = {}));
var MaxConcentrationSetting_OrderBy;
(function (MaxConcentrationSetting_OrderBy) {
    MaxConcentrationSetting_OrderBy["Id"] = "id";
    MaxConcentrationSetting_OrderBy["Policy"] = "policy";
    MaxConcentrationSetting_OrderBy["Comptroller"] = "comptroller";
    MaxConcentrationSetting_OrderBy["MaxConcentration"] = "maxConcentration";
    MaxConcentrationSetting_OrderBy["Timestamp"] = "timestamp";
    MaxConcentrationSetting_OrderBy["Enabled"] = "enabled";
    MaxConcentrationSetting_OrderBy["Events"] = "events";
})(MaxConcentrationSetting_OrderBy = exports.MaxConcentrationSetting_OrderBy || (exports.MaxConcentrationSetting_OrderBy = {}));
var MigratedSharesDuePaidEvent_OrderBy;
(function (MigratedSharesDuePaidEvent_OrderBy) {
    MigratedSharesDuePaidEvent_OrderBy["Id"] = "id";
    MigratedSharesDuePaidEvent_OrderBy["Fund"] = "fund";
    MigratedSharesDuePaidEvent_OrderBy["Type"] = "type";
    MigratedSharesDuePaidEvent_OrderBy["Investor"] = "investor";
    MigratedSharesDuePaidEvent_OrderBy["Timestamp"] = "timestamp";
    MigratedSharesDuePaidEvent_OrderBy["Transaction"] = "transaction";
    MigratedSharesDuePaidEvent_OrderBy["InvestmentState"] = "investmentState";
    MigratedSharesDuePaidEvent_OrderBy["Shares"] = "shares";
    MigratedSharesDuePaidEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    MigratedSharesDuePaidEvent_OrderBy["FundState"] = "fundState";
})(MigratedSharesDuePaidEvent_OrderBy = exports.MigratedSharesDuePaidEvent_OrderBy || (exports.MigratedSharesDuePaidEvent_OrderBy = {}));
var MigrationCancelledEvent_OrderBy;
(function (MigrationCancelledEvent_OrderBy) {
    MigrationCancelledEvent_OrderBy["Id"] = "id";
    MigrationCancelledEvent_OrderBy["Fund"] = "fund";
    MigrationCancelledEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationCancelledEvent_OrderBy["Transaction"] = "transaction";
    MigrationCancelledEvent_OrderBy["Migration"] = "migration";
    MigrationCancelledEvent_OrderBy["ExecutableTimestamp"] = "executableTimestamp";
})(MigrationCancelledEvent_OrderBy = exports.MigrationCancelledEvent_OrderBy || (exports.MigrationCancelledEvent_OrderBy = {}));
var MigrationExecutedEvent_OrderBy;
(function (MigrationExecutedEvent_OrderBy) {
    MigrationExecutedEvent_OrderBy["Id"] = "id";
    MigrationExecutedEvent_OrderBy["Fund"] = "fund";
    MigrationExecutedEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationExecutedEvent_OrderBy["Transaction"] = "transaction";
    MigrationExecutedEvent_OrderBy["Migration"] = "migration";
    MigrationExecutedEvent_OrderBy["ExecutableTimestamp"] = "executableTimestamp";
})(MigrationExecutedEvent_OrderBy = exports.MigrationExecutedEvent_OrderBy || (exports.MigrationExecutedEvent_OrderBy = {}));
var MigrationInCancelHookFailedEvent_OrderBy;
(function (MigrationInCancelHookFailedEvent_OrderBy) {
    MigrationInCancelHookFailedEvent_OrderBy["Id"] = "id";
    MigrationInCancelHookFailedEvent_OrderBy["Fund"] = "fund";
    MigrationInCancelHookFailedEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationInCancelHookFailedEvent_OrderBy["Transaction"] = "transaction";
    MigrationInCancelHookFailedEvent_OrderBy["VaultProxy"] = "vaultProxy";
    MigrationInCancelHookFailedEvent_OrderBy["PrevFundDeployer"] = "prevFundDeployer";
    MigrationInCancelHookFailedEvent_OrderBy["NextFundDeployer"] = "nextFundDeployer";
    MigrationInCancelHookFailedEvent_OrderBy["NextVaultLib"] = "nextVaultLib";
    MigrationInCancelHookFailedEvent_OrderBy["NextVaultAccessor"] = "nextVaultAccessor";
    MigrationInCancelHookFailedEvent_OrderBy["FailureReturnData"] = "failureReturnData";
})(MigrationInCancelHookFailedEvent_OrderBy = exports.MigrationInCancelHookFailedEvent_OrderBy || (exports.MigrationInCancelHookFailedEvent_OrderBy = {}));
var MigrationOutHookFailedEvent_OrderBy;
(function (MigrationOutHookFailedEvent_OrderBy) {
    MigrationOutHookFailedEvent_OrderBy["Id"] = "id";
    MigrationOutHookFailedEvent_OrderBy["Fund"] = "fund";
    MigrationOutHookFailedEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationOutHookFailedEvent_OrderBy["Transaction"] = "transaction";
    MigrationOutHookFailedEvent_OrderBy["VaultProxy"] = "vaultProxy";
    MigrationOutHookFailedEvent_OrderBy["PrevFundDeployer"] = "prevFundDeployer";
    MigrationOutHookFailedEvent_OrderBy["NextFundDeployer"] = "nextFundDeployer";
    MigrationOutHookFailedEvent_OrderBy["NextVaultLib"] = "nextVaultLib";
    MigrationOutHookFailedEvent_OrderBy["NextVaultAccessor"] = "nextVaultAccessor";
    MigrationOutHookFailedEvent_OrderBy["FailureReturnData"] = "failureReturnData";
})(MigrationOutHookFailedEvent_OrderBy = exports.MigrationOutHookFailedEvent_OrderBy || (exports.MigrationOutHookFailedEvent_OrderBy = {}));
var MigrationSignaledEvent_OrderBy;
(function (MigrationSignaledEvent_OrderBy) {
    MigrationSignaledEvent_OrderBy["Id"] = "id";
    MigrationSignaledEvent_OrderBy["Fund"] = "fund";
    MigrationSignaledEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationSignaledEvent_OrderBy["Transaction"] = "transaction";
    MigrationSignaledEvent_OrderBy["Migration"] = "migration";
})(MigrationSignaledEvent_OrderBy = exports.MigrationSignaledEvent_OrderBy || (exports.MigrationSignaledEvent_OrderBy = {}));
var MigrationTimelockSetEvent_OrderBy;
(function (MigrationTimelockSetEvent_OrderBy) {
    MigrationTimelockSetEvent_OrderBy["Id"] = "id";
    MigrationTimelockSetEvent_OrderBy["Timestamp"] = "timestamp";
    MigrationTimelockSetEvent_OrderBy["Transaction"] = "transaction";
    MigrationTimelockSetEvent_OrderBy["PrevTimelock"] = "prevTimelock";
    MigrationTimelockSetEvent_OrderBy["NextTimelock"] = "nextTimelock";
})(MigrationTimelockSetEvent_OrderBy = exports.MigrationTimelockSetEvent_OrderBy || (exports.MigrationTimelockSetEvent_OrderBy = {}));
var Migration_OrderBy;
(function (Migration_OrderBy) {
    Migration_OrderBy["Id"] = "id";
    Migration_OrderBy["PrevRelease"] = "prevRelease";
    Migration_OrderBy["NextRelease"] = "nextRelease";
    Migration_OrderBy["Fund"] = "fund";
    Migration_OrderBy["ExecutableTimestamp"] = "executableTimestamp";
    Migration_OrderBy["Executed"] = "executed";
    Migration_OrderBy["Cancelled"] = "cancelled";
    Migration_OrderBy["NextAccessor"] = "nextAccessor";
})(Migration_OrderBy = exports.Migration_OrderBy || (exports.Migration_OrderBy = {}));
var MigratorSetEvent_OrderBy;
(function (MigratorSetEvent_OrderBy) {
    MigratorSetEvent_OrderBy["Id"] = "id";
    MigratorSetEvent_OrderBy["Fund"] = "fund";
    MigratorSetEvent_OrderBy["Timestamp"] = "timestamp";
    MigratorSetEvent_OrderBy["Transaction"] = "transaction";
    MigratorSetEvent_OrderBy["PrevMigrator"] = "prevMigrator";
    MigratorSetEvent_OrderBy["NextMigrator"] = "nextMigrator";
})(MigratorSetEvent_OrderBy = exports.MigratorSetEvent_OrderBy || (exports.MigratorSetEvent_OrderBy = {}));
var MinMaxInvestmentFundSettingsSetEvent_OrderBy;
(function (MinMaxInvestmentFundSettingsSetEvent_OrderBy) {
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["Id"] = "id";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["Fund"] = "fund";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["Timestamp"] = "timestamp";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["Transaction"] = "transaction";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["MinInvestmentAmount"] = "minInvestmentAmount";
    MinMaxInvestmentFundSettingsSetEvent_OrderBy["MaxInvestmentAmount"] = "maxInvestmentAmount";
})(MinMaxInvestmentFundSettingsSetEvent_OrderBy = exports.MinMaxInvestmentFundSettingsSetEvent_OrderBy || (exports.MinMaxInvestmentFundSettingsSetEvent_OrderBy = {}));
var MinMaxInvestmentSetting_OrderBy;
(function (MinMaxInvestmentSetting_OrderBy) {
    MinMaxInvestmentSetting_OrderBy["Id"] = "id";
    MinMaxInvestmentSetting_OrderBy["Policy"] = "policy";
    MinMaxInvestmentSetting_OrderBy["Comptroller"] = "comptroller";
    MinMaxInvestmentSetting_OrderBy["MinInvestmentAmount"] = "minInvestmentAmount";
    MinMaxInvestmentSetting_OrderBy["MaxInvestmentAmount"] = "maxInvestmentAmount";
    MinMaxInvestmentSetting_OrderBy["Timestamp"] = "timestamp";
    MinMaxInvestmentSetting_OrderBy["Enabled"] = "enabled";
    MinMaxInvestmentSetting_OrderBy["Events"] = "events";
})(MinMaxInvestmentSetting_OrderBy = exports.MinMaxInvestmentSetting_OrderBy || (exports.MinMaxInvestmentSetting_OrderBy = {}));
var MonthlyAssetPriceCandle_OrderBy;
(function (MonthlyAssetPriceCandle_OrderBy) {
    MonthlyAssetPriceCandle_OrderBy["Id"] = "id";
    MonthlyAssetPriceCandle_OrderBy["Asset"] = "asset";
    MonthlyAssetPriceCandle_OrderBy["Group"] = "group";
    MonthlyAssetPriceCandle_OrderBy["From"] = "from";
    MonthlyAssetPriceCandle_OrderBy["To"] = "to";
    MonthlyAssetPriceCandle_OrderBy["Open"] = "open";
    MonthlyAssetPriceCandle_OrderBy["OpenRef"] = "openRef";
    MonthlyAssetPriceCandle_OrderBy["Close"] = "close";
    MonthlyAssetPriceCandle_OrderBy["CloseRef"] = "closeRef";
    MonthlyAssetPriceCandle_OrderBy["Low"] = "low";
    MonthlyAssetPriceCandle_OrderBy["LowRef"] = "lowRef";
    MonthlyAssetPriceCandle_OrderBy["High"] = "high";
    MonthlyAssetPriceCandle_OrderBy["HighRef"] = "highRef";
})(MonthlyAssetPriceCandle_OrderBy = exports.MonthlyAssetPriceCandle_OrderBy || (exports.MonthlyAssetPriceCandle_OrderBy = {}));
var MonthlyCurrencyPriceCandle_OrderBy;
(function (MonthlyCurrencyPriceCandle_OrderBy) {
    MonthlyCurrencyPriceCandle_OrderBy["Id"] = "id";
    MonthlyCurrencyPriceCandle_OrderBy["Currency"] = "currency";
    MonthlyCurrencyPriceCandle_OrderBy["Group"] = "group";
    MonthlyCurrencyPriceCandle_OrderBy["From"] = "from";
    MonthlyCurrencyPriceCandle_OrderBy["To"] = "to";
    MonthlyCurrencyPriceCandle_OrderBy["Open"] = "open";
    MonthlyCurrencyPriceCandle_OrderBy["OpenRef"] = "openRef";
    MonthlyCurrencyPriceCandle_OrderBy["Close"] = "close";
    MonthlyCurrencyPriceCandle_OrderBy["CloseRef"] = "closeRef";
    MonthlyCurrencyPriceCandle_OrderBy["Low"] = "low";
    MonthlyCurrencyPriceCandle_OrderBy["LowRef"] = "lowRef";
    MonthlyCurrencyPriceCandle_OrderBy["High"] = "high";
    MonthlyCurrencyPriceCandle_OrderBy["HighRef"] = "highRef";
})(MonthlyCurrencyPriceCandle_OrderBy = exports.MonthlyCurrencyPriceCandle_OrderBy || (exports.MonthlyCurrencyPriceCandle_OrderBy = {}));
var MonthlyFundState_OrderBy;
(function (MonthlyFundState_OrderBy) {
    MonthlyFundState_OrderBy["Id"] = "id";
    MonthlyFundState_OrderBy["Fund"] = "fund";
    MonthlyFundState_OrderBy["Start"] = "start";
    MonthlyFundState_OrderBy["End"] = "end";
    MonthlyFundState_OrderBy["First"] = "first";
    MonthlyFundState_OrderBy["Last"] = "last";
})(MonthlyFundState_OrderBy = exports.MonthlyFundState_OrderBy || (exports.MonthlyFundState_OrderBy = {}));
var MonthlyPriceCandleGroup_OrderBy;
(function (MonthlyPriceCandleGroup_OrderBy) {
    MonthlyPriceCandleGroup_OrderBy["Id"] = "id";
    MonthlyPriceCandleGroup_OrderBy["From"] = "from";
    MonthlyPriceCandleGroup_OrderBy["To"] = "to";
    MonthlyPriceCandleGroup_OrderBy["AssetCandles"] = "assetCandles";
    MonthlyPriceCandleGroup_OrderBy["CurrencyCandles"] = "currencyCandles";
})(MonthlyPriceCandleGroup_OrderBy = exports.MonthlyPriceCandleGroup_OrderBy || (exports.MonthlyPriceCandleGroup_OrderBy = {}));
var MultiLendTrade_OrderBy;
(function (MultiLendTrade_OrderBy) {
    MultiLendTrade_OrderBy["Id"] = "id";
    MultiLendTrade_OrderBy["Fund"] = "fund";
    MultiLendTrade_OrderBy["Adapter"] = "adapter";
    MultiLendTrade_OrderBy["Method"] = "method";
    MultiLendTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    MultiLendTrade_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    MultiLendTrade_OrderBy["Timestamp"] = "timestamp";
    MultiLendTrade_OrderBy["FundState"] = "fundState";
})(MultiLendTrade_OrderBy = exports.MultiLendTrade_OrderBy || (exports.MultiLendTrade_OrderBy = {}));
var MultiRedeemTrade_OrderBy;
(function (MultiRedeemTrade_OrderBy) {
    MultiRedeemTrade_OrderBy["Id"] = "id";
    MultiRedeemTrade_OrderBy["Fund"] = "fund";
    MultiRedeemTrade_OrderBy["Adapter"] = "adapter";
    MultiRedeemTrade_OrderBy["Method"] = "method";
    MultiRedeemTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    MultiRedeemTrade_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    MultiRedeemTrade_OrderBy["Timestamp"] = "timestamp";
    MultiRedeemTrade_OrderBy["FundState"] = "fundState";
})(MultiRedeemTrade_OrderBy = exports.MultiRedeemTrade_OrderBy || (exports.MultiRedeemTrade_OrderBy = {}));
var MultiTokenSwapTrade_OrderBy;
(function (MultiTokenSwapTrade_OrderBy) {
    MultiTokenSwapTrade_OrderBy["Id"] = "id";
    MultiTokenSwapTrade_OrderBy["Fund"] = "fund";
    MultiTokenSwapTrade_OrderBy["Adapter"] = "adapter";
    MultiTokenSwapTrade_OrderBy["Method"] = "method";
    MultiTokenSwapTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    MultiTokenSwapTrade_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    MultiTokenSwapTrade_OrderBy["Timestamp"] = "timestamp";
    MultiTokenSwapTrade_OrderBy["FundState"] = "fundState";
})(MultiTokenSwapTrade_OrderBy = exports.MultiTokenSwapTrade_OrderBy || (exports.MultiTokenSwapTrade_OrderBy = {}));
var NetworkAssetHolding_OrderBy;
(function (NetworkAssetHolding_OrderBy) {
    NetworkAssetHolding_OrderBy["Id"] = "id";
    NetworkAssetHolding_OrderBy["Timestamp"] = "timestamp";
    NetworkAssetHolding_OrderBy["Asset"] = "asset";
    NetworkAssetHolding_OrderBy["Amount"] = "amount";
})(NetworkAssetHolding_OrderBy = exports.NetworkAssetHolding_OrderBy || (exports.NetworkAssetHolding_OrderBy = {}));
var NetworkEventInterface_OrderBy;
(function (NetworkEventInterface_OrderBy) {
    NetworkEventInterface_OrderBy["Id"] = "id";
    NetworkEventInterface_OrderBy["Timestamp"] = "timestamp";
    NetworkEventInterface_OrderBy["Transaction"] = "transaction";
})(NetworkEventInterface_OrderBy = exports.NetworkEventInterface_OrderBy || (exports.NetworkEventInterface_OrderBy = {}));
var NetworkState_OrderBy;
(function (NetworkState_OrderBy) {
    NetworkState_OrderBy["Id"] = "id";
    NetworkState_OrderBy["Network"] = "network";
    NetworkState_OrderBy["Timestamp"] = "timestamp";
    NetworkState_OrderBy["AssetHoldings"] = "assetHoldings";
    NetworkState_OrderBy["Funds"] = "funds";
    NetworkState_OrderBy["Managers"] = "managers";
    NetworkState_OrderBy["Investors"] = "investors";
    NetworkState_OrderBy["Investments"] = "investments";
})(NetworkState_OrderBy = exports.NetworkState_OrderBy || (exports.NetworkState_OrderBy = {}));
var Network_OrderBy;
(function (Network_OrderBy) {
    Network_OrderBy["Id"] = "id";
    Network_OrderBy["Timestamp"] = "timestamp";
    Network_OrderBy["CurrentRelease"] = "currentRelease";
    Network_OrderBy["Releases"] = "releases";
    Network_OrderBy["State"] = "state";
    Network_OrderBy["StateHistory"] = "stateHistory";
})(Network_OrderBy = exports.Network_OrderBy || (exports.Network_OrderBy = {}));
var NewFundCreatedEvent_OrderBy;
(function (NewFundCreatedEvent_OrderBy) {
    NewFundCreatedEvent_OrderBy["Id"] = "id";
    NewFundCreatedEvent_OrderBy["Fund"] = "fund";
    NewFundCreatedEvent_OrderBy["Timestamp"] = "timestamp";
    NewFundCreatedEvent_OrderBy["Comptroller"] = "comptroller";
    NewFundCreatedEvent_OrderBy["VaultProxy"] = "vaultProxy";
    NewFundCreatedEvent_OrderBy["Creator"] = "creator";
    NewFundCreatedEvent_OrderBy["FundOwner"] = "fundOwner";
    NewFundCreatedEvent_OrderBy["FundName"] = "fundName";
    NewFundCreatedEvent_OrderBy["DenominationAsset"] = "denominationAsset";
    NewFundCreatedEvent_OrderBy["SharesActionTimelock"] = "sharesActionTimelock";
    NewFundCreatedEvent_OrderBy["FeeManagerConfigData"] = "feeManagerConfigData";
    NewFundCreatedEvent_OrderBy["PolicyManagerConfigData"] = "policyManagerConfigData";
    NewFundCreatedEvent_OrderBy["Transaction"] = "transaction";
})(NewFundCreatedEvent_OrderBy = exports.NewFundCreatedEvent_OrderBy || (exports.NewFundCreatedEvent_OrderBy = {}));
var NominatedOwnerRemovedEvent_OrderBy;
(function (NominatedOwnerRemovedEvent_OrderBy) {
    NominatedOwnerRemovedEvent_OrderBy["Id"] = "id";
    NominatedOwnerRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    NominatedOwnerRemovedEvent_OrderBy["Transaction"] = "transaction";
    NominatedOwnerRemovedEvent_OrderBy["NominatedOwner"] = "nominatedOwner";
})(NominatedOwnerRemovedEvent_OrderBy = exports.NominatedOwnerRemovedEvent_OrderBy || (exports.NominatedOwnerRemovedEvent_OrderBy = {}));
var NominatedOwnerSetEvent_OrderBy;
(function (NominatedOwnerSetEvent_OrderBy) {
    NominatedOwnerSetEvent_OrderBy["Id"] = "id";
    NominatedOwnerSetEvent_OrderBy["Timestamp"] = "timestamp";
    NominatedOwnerSetEvent_OrderBy["Transaction"] = "transaction";
    NominatedOwnerSetEvent_OrderBy["NominatedOwner"] = "nominatedOwner";
})(NominatedOwnerSetEvent_OrderBy = exports.NominatedOwnerSetEvent_OrderBy || (exports.NominatedOwnerSetEvent_OrderBy = {}));
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "asc";
    OrderDirection["Desc"] = "desc";
})(OrderDirection = exports.OrderDirection || (exports.OrderDirection = {}));
var OverridePauseSetEvent_OrderBy;
(function (OverridePauseSetEvent_OrderBy) {
    OverridePauseSetEvent_OrderBy["Id"] = "id";
    OverridePauseSetEvent_OrderBy["Fund"] = "fund";
    OverridePauseSetEvent_OrderBy["Timestamp"] = "timestamp";
    OverridePauseSetEvent_OrderBy["Transaction"] = "transaction";
    OverridePauseSetEvent_OrderBy["OverridePause"] = "overridePause";
})(OverridePauseSetEvent_OrderBy = exports.OverridePauseSetEvent_OrderBy || (exports.OverridePauseSetEvent_OrderBy = {}));
var OwnerSetEvent_OrderBy;
(function (OwnerSetEvent_OrderBy) {
    OwnerSetEvent_OrderBy["Id"] = "id";
    OwnerSetEvent_OrderBy["Fund"] = "fund";
    OwnerSetEvent_OrderBy["Timestamp"] = "timestamp";
    OwnerSetEvent_OrderBy["Transaction"] = "transaction";
    OwnerSetEvent_OrderBy["PrevOwner"] = "prevOwner";
    OwnerSetEvent_OrderBy["NextOwner"] = "nextOwner";
})(OwnerSetEvent_OrderBy = exports.OwnerSetEvent_OrderBy || (exports.OwnerSetEvent_OrderBy = {}));
var OwnershipTransferredEvent_OrderBy;
(function (OwnershipTransferredEvent_OrderBy) {
    OwnershipTransferredEvent_OrderBy["Id"] = "id";
    OwnershipTransferredEvent_OrderBy["Timestamp"] = "timestamp";
    OwnershipTransferredEvent_OrderBy["Transaction"] = "transaction";
    OwnershipTransferredEvent_OrderBy["PreviousOwner"] = "previousOwner";
    OwnershipTransferredEvent_OrderBy["NewOwner"] = "newOwner";
})(OwnershipTransferredEvent_OrderBy = exports.OwnershipTransferredEvent_OrderBy || (exports.OwnershipTransferredEvent_OrderBy = {}));
var PerformanceFeeActivatedForFundEvent_OrderBy;
(function (PerformanceFeeActivatedForFundEvent_OrderBy) {
    PerformanceFeeActivatedForFundEvent_OrderBy["Id"] = "id";
    PerformanceFeeActivatedForFundEvent_OrderBy["Fund"] = "fund";
    PerformanceFeeActivatedForFundEvent_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeeActivatedForFundEvent_OrderBy["Transaction"] = "transaction";
    PerformanceFeeActivatedForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    PerformanceFeeActivatedForFundEvent_OrderBy["HighWaterMark"] = "highWaterMark";
})(PerformanceFeeActivatedForFundEvent_OrderBy = exports.PerformanceFeeActivatedForFundEvent_OrderBy || (exports.PerformanceFeeActivatedForFundEvent_OrderBy = {}));
var PerformanceFeePaidOutEvent_OrderBy;
(function (PerformanceFeePaidOutEvent_OrderBy) {
    PerformanceFeePaidOutEvent_OrderBy["Id"] = "id";
    PerformanceFeePaidOutEvent_OrderBy["Fund"] = "fund";
    PerformanceFeePaidOutEvent_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeePaidOutEvent_OrderBy["Transaction"] = "transaction";
    PerformanceFeePaidOutEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    PerformanceFeePaidOutEvent_OrderBy["PrevHighWaterMark"] = "prevHighWaterMark";
    PerformanceFeePaidOutEvent_OrderBy["NextHighWaterMark"] = "nextHighWaterMark";
})(PerformanceFeePaidOutEvent_OrderBy = exports.PerformanceFeePaidOutEvent_OrderBy || (exports.PerformanceFeePaidOutEvent_OrderBy = {}));
var PerformanceFeePerformanceUpdatedEvent_OrderBy;
(function (PerformanceFeePerformanceUpdatedEvent_OrderBy) {
    PerformanceFeePerformanceUpdatedEvent_OrderBy["Id"] = "id";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["Fund"] = "fund";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["Transaction"] = "transaction";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["PrevAggregateValueDue"] = "prevAggregateValueDue";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["NextAggregateValueDue"] = "nextAggregateValueDue";
    PerformanceFeePerformanceUpdatedEvent_OrderBy["SharesOutstandingDiff"] = "sharesOutstandingDiff";
})(PerformanceFeePerformanceUpdatedEvent_OrderBy = exports.PerformanceFeePerformanceUpdatedEvent_OrderBy || (exports.PerformanceFeePerformanceUpdatedEvent_OrderBy = {}));
var PerformanceFeeSetting_OrderBy;
(function (PerformanceFeeSetting_OrderBy) {
    PerformanceFeeSetting_OrderBy["Id"] = "id";
    PerformanceFeeSetting_OrderBy["Fee"] = "fee";
    PerformanceFeeSetting_OrderBy["Comptroller"] = "comptroller";
    PerformanceFeeSetting_OrderBy["Rate"] = "rate";
    PerformanceFeeSetting_OrderBy["Period"] = "period";
    PerformanceFeeSetting_OrderBy["Activated"] = "activated";
    PerformanceFeeSetting_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeeSetting_OrderBy["Events"] = "events";
})(PerformanceFeeSetting_OrderBy = exports.PerformanceFeeSetting_OrderBy || (exports.PerformanceFeeSetting_OrderBy = {}));
var PerformanceFeeSettingsAddedEvent_OrderBy;
(function (PerformanceFeeSettingsAddedEvent_OrderBy) {
    PerformanceFeeSettingsAddedEvent_OrderBy["Id"] = "id";
    PerformanceFeeSettingsAddedEvent_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeeSettingsAddedEvent_OrderBy["Transaction"] = "transaction";
    PerformanceFeeSettingsAddedEvent_OrderBy["Comptroller"] = "comptroller";
    PerformanceFeeSettingsAddedEvent_OrderBy["Rate"] = "rate";
    PerformanceFeeSettingsAddedEvent_OrderBy["Period"] = "period";
})(PerformanceFeeSettingsAddedEvent_OrderBy = exports.PerformanceFeeSettingsAddedEvent_OrderBy || (exports.PerformanceFeeSettingsAddedEvent_OrderBy = {}));
var PerformanceFeeSharePriceUpdatedEvent_OrderBy;
(function (PerformanceFeeSharePriceUpdatedEvent_OrderBy) {
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["Id"] = "id";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["Fund"] = "fund";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["Transaction"] = "transaction";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["PrevSharePrice"] = "prevSharePrice";
    PerformanceFeeSharePriceUpdatedEvent_OrderBy["NextSharePrice"] = "nextSharePrice";
})(PerformanceFeeSharePriceUpdatedEvent_OrderBy = exports.PerformanceFeeSharePriceUpdatedEvent_OrderBy || (exports.PerformanceFeeSharePriceUpdatedEvent_OrderBy = {}));
var PerformanceFeeState_OrderBy;
(function (PerformanceFeeState_OrderBy) {
    PerformanceFeeState_OrderBy["Id"] = "id";
    PerformanceFeeState_OrderBy["Fund"] = "fund";
    PerformanceFeeState_OrderBy["Timestamp"] = "timestamp";
    PerformanceFeeState_OrderBy["Fee"] = "fee";
    PerformanceFeeState_OrderBy["LastPaid"] = "lastPaid";
    PerformanceFeeState_OrderBy["GrossSharePrice"] = "grossSharePrice";
    PerformanceFeeState_OrderBy["AggregateValueDue"] = "aggregateValueDue";
    PerformanceFeeState_OrderBy["HighWaterMark"] = "highWaterMark";
    PerformanceFeeState_OrderBy["SharesOutstanding"] = "sharesOutstanding";
    PerformanceFeeState_OrderBy["Events"] = "events";
})(PerformanceFeeState_OrderBy = exports.PerformanceFeeState_OrderBy || (exports.PerformanceFeeState_OrderBy = {}));
var PeriodicFundStateInterface_OrderBy;
(function (PeriodicFundStateInterface_OrderBy) {
    PeriodicFundStateInterface_OrderBy["Id"] = "id";
    PeriodicFundStateInterface_OrderBy["Fund"] = "fund";
    PeriodicFundStateInterface_OrderBy["Start"] = "start";
    PeriodicFundStateInterface_OrderBy["End"] = "end";
    PeriodicFundStateInterface_OrderBy["First"] = "first";
    PeriodicFundStateInterface_OrderBy["Last"] = "last";
})(PeriodicFundStateInterface_OrderBy = exports.PeriodicFundStateInterface_OrderBy || (exports.PeriodicFundStateInterface_OrderBy = {}));
var PolicyDeregisteredEvent_OrderBy;
(function (PolicyDeregisteredEvent_OrderBy) {
    PolicyDeregisteredEvent_OrderBy["Id"] = "id";
    PolicyDeregisteredEvent_OrderBy["Identifier"] = "identifier";
    PolicyDeregisteredEvent_OrderBy["Timestamp"] = "timestamp";
    PolicyDeregisteredEvent_OrderBy["Transaction"] = "transaction";
    PolicyDeregisteredEvent_OrderBy["Policy"] = "policy";
})(PolicyDeregisteredEvent_OrderBy = exports.PolicyDeregisteredEvent_OrderBy || (exports.PolicyDeregisteredEvent_OrderBy = {}));
var PolicyDisabledForFundEvent_OrderBy;
(function (PolicyDisabledForFundEvent_OrderBy) {
    PolicyDisabledForFundEvent_OrderBy["Id"] = "id";
    PolicyDisabledForFundEvent_OrderBy["Comptroller"] = "comptroller";
    PolicyDisabledForFundEvent_OrderBy["Policy"] = "policy";
    PolicyDisabledForFundEvent_OrderBy["Timestamp"] = "timestamp";
    PolicyDisabledForFundEvent_OrderBy["Transaction"] = "transaction";
})(PolicyDisabledForFundEvent_OrderBy = exports.PolicyDisabledForFundEvent_OrderBy || (exports.PolicyDisabledForFundEvent_OrderBy = {}));
var PolicyEnabledForFundEvent_OrderBy;
(function (PolicyEnabledForFundEvent_OrderBy) {
    PolicyEnabledForFundEvent_OrderBy["Id"] = "id";
    PolicyEnabledForFundEvent_OrderBy["Comptroller"] = "comptroller";
    PolicyEnabledForFundEvent_OrderBy["Policy"] = "policy";
    PolicyEnabledForFundEvent_OrderBy["SettingsData"] = "settingsData";
    PolicyEnabledForFundEvent_OrderBy["Timestamp"] = "timestamp";
    PolicyEnabledForFundEvent_OrderBy["Transaction"] = "transaction";
})(PolicyEnabledForFundEvent_OrderBy = exports.PolicyEnabledForFundEvent_OrderBy || (exports.PolicyEnabledForFundEvent_OrderBy = {}));
var PolicyHook;
(function (PolicyHook) {
    PolicyHook["BuySharesSetup"] = "BuySharesSetup";
    PolicyHook["PreBuyShares"] = "PreBuyShares";
    PolicyHook["PostBuyShares"] = "PostBuyShares";
    PolicyHook["BuySharesCompleted"] = "BuySharesCompleted";
    PolicyHook["PreCallOnIntegration"] = "PreCallOnIntegration";
    PolicyHook["PostCallOnIntegration"] = "PostCallOnIntegration";
    PolicyHook["Unknown"] = "Unknown";
})(PolicyHook = exports.PolicyHook || (exports.PolicyHook = {}));
var PolicyManager_OrderBy;
(function (PolicyManager_OrderBy) {
    PolicyManager_OrderBy["Id"] = "id";
    PolicyManager_OrderBy["Release"] = "release";
    PolicyManager_OrderBy["Policies"] = "policies";
})(PolicyManager_OrderBy = exports.PolicyManager_OrderBy || (exports.PolicyManager_OrderBy = {}));
var PolicyRegisteredEvent_OrderBy;
(function (PolicyRegisteredEvent_OrderBy) {
    PolicyRegisteredEvent_OrderBy["Id"] = "id";
    PolicyRegisteredEvent_OrderBy["Identifier"] = "identifier";
    PolicyRegisteredEvent_OrderBy["Timestamp"] = "timestamp";
    PolicyRegisteredEvent_OrderBy["Transaction"] = "transaction";
    PolicyRegisteredEvent_OrderBy["Policy"] = "policy";
    PolicyRegisteredEvent_OrderBy["ImplementedHooks"] = "implementedHooks";
})(PolicyRegisteredEvent_OrderBy = exports.PolicyRegisteredEvent_OrderBy || (exports.PolicyRegisteredEvent_OrderBy = {}));
var PolicySettingInterface_OrderBy;
(function (PolicySettingInterface_OrderBy) {
    PolicySettingInterface_OrderBy["Id"] = "id";
    PolicySettingInterface_OrderBy["Policy"] = "policy";
    PolicySettingInterface_OrderBy["Comptroller"] = "comptroller";
    PolicySettingInterface_OrderBy["Timestamp"] = "timestamp";
    PolicySettingInterface_OrderBy["Enabled"] = "enabled";
    PolicySettingInterface_OrderBy["Events"] = "events";
})(PolicySettingInterface_OrderBy = exports.PolicySettingInterface_OrderBy || (exports.PolicySettingInterface_OrderBy = {}));
var Policy_OrderBy;
(function (Policy_OrderBy) {
    Policy_OrderBy["Id"] = "id";
    Policy_OrderBy["PolicyManager"] = "policyManager";
    Policy_OrderBy["Identifier"] = "identifier";
    Policy_OrderBy["Settings"] = "settings";
})(Policy_OrderBy = exports.Policy_OrderBy || (exports.Policy_OrderBy = {}));
var PortfolioState_OrderBy;
(function (PortfolioState_OrderBy) {
    PortfolioState_OrderBy["Id"] = "id";
    PortfolioState_OrderBy["Fund"] = "fund";
    PortfolioState_OrderBy["Timestamp"] = "timestamp";
    PortfolioState_OrderBy["Holdings"] = "holdings";
    PortfolioState_OrderBy["Events"] = "events";
})(PortfolioState_OrderBy = exports.PortfolioState_OrderBy || (exports.PortfolioState_OrderBy = {}));
var PreRedeemSharesHookFailedEvent_OrderBy;
(function (PreRedeemSharesHookFailedEvent_OrderBy) {
    PreRedeemSharesHookFailedEvent_OrderBy["Id"] = "id";
    PreRedeemSharesHookFailedEvent_OrderBy["Fund"] = "fund";
    PreRedeemSharesHookFailedEvent_OrderBy["Timestamp"] = "timestamp";
    PreRedeemSharesHookFailedEvent_OrderBy["SharesQuantity"] = "sharesQuantity";
    PreRedeemSharesHookFailedEvent_OrderBy["Redeemer"] = "redeemer";
    PreRedeemSharesHookFailedEvent_OrderBy["FailureReturnData"] = "failureReturnData";
    PreRedeemSharesHookFailedEvent_OrderBy["Transaction"] = "transaction";
})(PreRedeemSharesHookFailedEvent_OrderBy = exports.PreRedeemSharesHookFailedEvent_OrderBy || (exports.PreRedeemSharesHookFailedEvent_OrderBy = {}));
var PrimitiveAddedEvent_OrderBy;
(function (PrimitiveAddedEvent_OrderBy) {
    PrimitiveAddedEvent_OrderBy["Id"] = "id";
    PrimitiveAddedEvent_OrderBy["Timestamp"] = "timestamp";
    PrimitiveAddedEvent_OrderBy["Transaction"] = "transaction";
    PrimitiveAddedEvent_OrderBy["Primitive"] = "primitive";
    PrimitiveAddedEvent_OrderBy["PriceFeed"] = "priceFeed";
    PrimitiveAddedEvent_OrderBy["RateAsset"] = "rateAsset";
})(PrimitiveAddedEvent_OrderBy = exports.PrimitiveAddedEvent_OrderBy || (exports.PrimitiveAddedEvent_OrderBy = {}));
var PrimitiveRemovedEvent_OrderBy;
(function (PrimitiveRemovedEvent_OrderBy) {
    PrimitiveRemovedEvent_OrderBy["Id"] = "id";
    PrimitiveRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    PrimitiveRemovedEvent_OrderBy["Transaction"] = "transaction";
    PrimitiveRemovedEvent_OrderBy["Primitive"] = "primitive";
})(PrimitiveRemovedEvent_OrderBy = exports.PrimitiveRemovedEvent_OrderBy || (exports.PrimitiveRemovedEvent_OrderBy = {}));
var RedeemTrade_OrderBy;
(function (RedeemTrade_OrderBy) {
    RedeemTrade_OrderBy["Id"] = "id";
    RedeemTrade_OrderBy["Fund"] = "fund";
    RedeemTrade_OrderBy["Adapter"] = "adapter";
    RedeemTrade_OrderBy["Method"] = "method";
    RedeemTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    RedeemTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    RedeemTrade_OrderBy["Price"] = "price";
    RedeemTrade_OrderBy["Timestamp"] = "timestamp";
    RedeemTrade_OrderBy["FundState"] = "fundState";
})(RedeemTrade_OrderBy = exports.RedeemTrade_OrderBy || (exports.RedeemTrade_OrderBy = {}));
var ReleaseStatusSetEvent_OrderBy;
(function (ReleaseStatusSetEvent_OrderBy) {
    ReleaseStatusSetEvent_OrderBy["Id"] = "id";
    ReleaseStatusSetEvent_OrderBy["Timestamp"] = "timestamp";
    ReleaseStatusSetEvent_OrderBy["Transaction"] = "transaction";
    ReleaseStatusSetEvent_OrderBy["PrevStatus"] = "prevStatus";
    ReleaseStatusSetEvent_OrderBy["NextStatus"] = "nextStatus";
})(ReleaseStatusSetEvent_OrderBy = exports.ReleaseStatusSetEvent_OrderBy || (exports.ReleaseStatusSetEvent_OrderBy = {}));
var Release_OrderBy;
(function (Release_OrderBy) {
    Release_OrderBy["Id"] = "id";
    Release_OrderBy["Current"] = "current";
    Release_OrderBy["Open"] = "open";
    Release_OrderBy["Close"] = "close";
    Release_OrderBy["Funds"] = "funds";
    Release_OrderBy["Assets"] = "assets";
    Release_OrderBy["Network"] = "network";
    Release_OrderBy["AdapterBlacklist"] = "adapterBlacklist";
    Release_OrderBy["AdapterWhitelist"] = "adapterWhitelist";
    Release_OrderBy["AggregatedDerivativePriceFeed"] = "aggregatedDerivativePriceFeed";
    Release_OrderBy["AlphaHomoraV1Adapter"] = "alphaHomoraV1Adapter";
    Release_OrderBy["AaveAdapter"] = "aaveAdapter";
    Release_OrderBy["AssetBlacklist"] = "assetBlacklist";
    Release_OrderBy["AssetWhitelist"] = "assetWhitelist";
    Release_OrderBy["BuySharesCallerWhitelist"] = "buySharesCallerWhitelist";
    Release_OrderBy["ChaiAdapter"] = "chaiAdapter";
    Release_OrderBy["ChaiIntegratee"] = "chaiIntegratee";
    Release_OrderBy["ChainlinkPriceFeed"] = "chainlinkPriceFeed";
    Release_OrderBy["CompoundAdapter"] = "compoundAdapter";
    Release_OrderBy["ComptrollerLib"] = "comptrollerLib";
    Release_OrderBy["Dispatcher"] = "dispatcher";
    Release_OrderBy["EntranceRateBurnFee"] = "entranceRateBurnFee";
    Release_OrderBy["EntranceRateDirectFee"] = "entranceRateDirectFee";
    Release_OrderBy["FeeManager"] = "feeManager";
    Release_OrderBy["FundActionsWrapper"] = "fundActionsWrapper";
    Release_OrderBy["FundDeployer"] = "fundDeployer";
    Release_OrderBy["GuaranteedRedemption"] = "guaranteedRedemption";
    Release_OrderBy["IdleAdapter"] = "idleAdapter";
    Release_OrderBy["IdlePriceFeed"] = "idlePriceFeed";
    Release_OrderBy["IntegrationManager"] = "integrationManager";
    Release_OrderBy["InvestorWhitelist"] = "investorWhitelist";
    Release_OrderBy["KyberAdapter"] = "kyberAdapter";
    Release_OrderBy["KyberIntegratee"] = "kyberIntegratee";
    Release_OrderBy["ManagementFee"] = "managementFee";
    Release_OrderBy["MaxConcentration"] = "maxConcentration";
    Release_OrderBy["MinMaxInvestment"] = "minMaxInvestment";
    Release_OrderBy["ParaSwapAdapter"] = "paraSwapAdapter";
    Release_OrderBy["ParaSwapV4Adapter"] = "paraSwapV4Adapter";
    Release_OrderBy["PerformanceFee"] = "performanceFee";
    Release_OrderBy["PolicyManager"] = "policyManager";
    Release_OrderBy["SynthetixAdapter"] = "synthetixAdapter";
    Release_OrderBy["SynthetixAddressResolver"] = "synthetixAddressResolver";
    Release_OrderBy["SynthetixDelegateApprovals"] = "synthetixDelegateApprovals";
    Release_OrderBy["SynthetixIntegratee"] = "synthetixIntegratee";
    Release_OrderBy["TrackedAssetsAdapter"] = "trackedAssetsAdapter";
    Release_OrderBy["UniswapV2Adapter"] = "uniswapV2Adapter";
    Release_OrderBy["UniswapV2Integratee"] = "uniswapV2Integratee";
    Release_OrderBy["YearnVaultV2Adapter"] = "yearnVaultV2Adapter";
    Release_OrderBy["ValueInterpreter"] = "valueInterpreter";
    Release_OrderBy["VaultLib"] = "vaultLib";
    Release_OrderBy["WethToken"] = "wethToken";
    Release_OrderBy["ZeroExV2Adapter"] = "zeroExV2Adapter";
    Release_OrderBy["AavePriceFeed"] = "aavePriceFeed";
    Release_OrderBy["AlphaHomoraV1PriceFeed"] = "alphaHomoraV1PriceFeed";
    Release_OrderBy["ChaiPriceFeed"] = "chaiPriceFeed";
    Release_OrderBy["CompoundPriceFeed"] = "compoundPriceFeed";
    Release_OrderBy["CurvePriceFeed"] = "curvePriceFeed";
    Release_OrderBy["CurveExchangeAdapter"] = "curveExchangeAdapter";
    Release_OrderBy["CurveLiquidityAaveAdapter"] = "curveLiquidityAaveAdapter";
    Release_OrderBy["CurveLiquiditySethAdapter"] = "curveLiquiditySethAdapter";
    Release_OrderBy["CurveLiquidityStethAdapter"] = "curveLiquidityStethAdapter";
    Release_OrderBy["LidoStethPriceFeed"] = "lidoStethPriceFeed";
    Release_OrderBy["StakehoundEthPriceFeed"] = "stakehoundEthPriceFeed";
    Release_OrderBy["SynthetixPriceFeed"] = "synthetixPriceFeed";
    Release_OrderBy["UniswapV2PoolPriceFeed"] = "uniswapV2PoolPriceFeed";
    Release_OrderBy["WdgldPriceFeed"] = "wdgldPriceFeed";
    Release_OrderBy["YearnVaultV2PriceFeed"] = "yearnVaultV2PriceFeed";
})(Release_OrderBy = exports.Release_OrderBy || (exports.Release_OrderBy = {}));
var RemoveTrackedAssetsTrade_OrderBy;
(function (RemoveTrackedAssetsTrade_OrderBy) {
    RemoveTrackedAssetsTrade_OrderBy["Id"] = "id";
    RemoveTrackedAssetsTrade_OrderBy["Fund"] = "fund";
    RemoveTrackedAssetsTrade_OrderBy["Adapter"] = "adapter";
    RemoveTrackedAssetsTrade_OrderBy["Method"] = "method";
    RemoveTrackedAssetsTrade_OrderBy["OutgoingAssetAmounts"] = "outgoingAssetAmounts";
    RemoveTrackedAssetsTrade_OrderBy["Timestamp"] = "timestamp";
    RemoveTrackedAssetsTrade_OrderBy["FundState"] = "fundState";
})(RemoveTrackedAssetsTrade_OrderBy = exports.RemoveTrackedAssetsTrade_OrderBy || (exports.RemoveTrackedAssetsTrade_OrderBy = {}));
var SettlementType;
(function (SettlementType) {
    SettlementType["None"] = "None";
    SettlementType["Direct"] = "Direct";
    SettlementType["Mint"] = "Mint";
    SettlementType["Burn"] = "Burn";
    SettlementType["MintSharesOutstanding"] = "MintSharesOutstanding";
    SettlementType["BurnSharesOutstanding"] = "BurnSharesOutstanding";
    SettlementType["Unknown"] = "Unknown";
})(SettlementType = exports.SettlementType || (exports.SettlementType = {}));
var ShareChangeType;
(function (ShareChangeType) {
    ShareChangeType["SharesBought"] = "SharesBought";
    ShareChangeType["SharesRedeemed"] = "SharesRedeemed";
    ShareChangeType["FeeSettledForFund"] = "FeeSettledForFund";
    ShareChangeType["AllSharesOutstandingForcePaidForFund"] = "AllSharesOutstandingForcePaidForFund";
    ShareChangeType["SharesOutstandingPaidForFund"] = "SharesOutstandingPaidForFund";
    ShareChangeType["MigratedSharesDuePaid"] = "MigratedSharesDuePaid";
})(ShareChangeType = exports.ShareChangeType || (exports.ShareChangeType = {}));
var ShareState_OrderBy;
(function (ShareState_OrderBy) {
    ShareState_OrderBy["Id"] = "id";
    ShareState_OrderBy["Fund"] = "fund";
    ShareState_OrderBy["Timestamp"] = "timestamp";
    ShareState_OrderBy["TotalSupply"] = "totalSupply";
    ShareState_OrderBy["OutstandingForFees"] = "outstandingForFees";
    ShareState_OrderBy["Events"] = "events";
})(ShareState_OrderBy = exports.ShareState_OrderBy || (exports.ShareState_OrderBy = {}));
var SharesBoughtEvent_OrderBy;
(function (SharesBoughtEvent_OrderBy) {
    SharesBoughtEvent_OrderBy["Id"] = "id";
    SharesBoughtEvent_OrderBy["Fund"] = "fund";
    SharesBoughtEvent_OrderBy["Type"] = "type";
    SharesBoughtEvent_OrderBy["Investor"] = "investor";
    SharesBoughtEvent_OrderBy["InvestmentState"] = "investmentState";
    SharesBoughtEvent_OrderBy["Shares"] = "shares";
    SharesBoughtEvent_OrderBy["Asset"] = "asset";
    SharesBoughtEvent_OrderBy["InvestmentAmount"] = "investmentAmount";
    SharesBoughtEvent_OrderBy["SharesIssued"] = "sharesIssued";
    SharesBoughtEvent_OrderBy["Timestamp"] = "timestamp";
    SharesBoughtEvent_OrderBy["FundState"] = "fundState";
    SharesBoughtEvent_OrderBy["Transaction"] = "transaction";
})(SharesBoughtEvent_OrderBy = exports.SharesBoughtEvent_OrderBy || (exports.SharesBoughtEvent_OrderBy = {}));
var SharesChangeInterface_OrderBy;
(function (SharesChangeInterface_OrderBy) {
    SharesChangeInterface_OrderBy["Id"] = "id";
    SharesChangeInterface_OrderBy["Fund"] = "fund";
    SharesChangeInterface_OrderBy["Investor"] = "investor";
    SharesChangeInterface_OrderBy["Timestamp"] = "timestamp";
    SharesChangeInterface_OrderBy["Type"] = "type";
    SharesChangeInterface_OrderBy["InvestmentState"] = "investmentState";
    SharesChangeInterface_OrderBy["Shares"] = "shares";
    SharesChangeInterface_OrderBy["FundState"] = "fundState";
    SharesChangeInterface_OrderBy["Transaction"] = "transaction";
})(SharesChangeInterface_OrderBy = exports.SharesChangeInterface_OrderBy || (exports.SharesChangeInterface_OrderBy = {}));
var SharesOutstandingPaidForFundEvent_OrderBy;
(function (SharesOutstandingPaidForFundEvent_OrderBy) {
    SharesOutstandingPaidForFundEvent_OrderBy["Id"] = "id";
    SharesOutstandingPaidForFundEvent_OrderBy["Fund"] = "fund";
    SharesOutstandingPaidForFundEvent_OrderBy["Type"] = "type";
    SharesOutstandingPaidForFundEvent_OrderBy["Investor"] = "investor";
    SharesOutstandingPaidForFundEvent_OrderBy["Timestamp"] = "timestamp";
    SharesOutstandingPaidForFundEvent_OrderBy["Transaction"] = "transaction";
    SharesOutstandingPaidForFundEvent_OrderBy["InvestmentState"] = "investmentState";
    SharesOutstandingPaidForFundEvent_OrderBy["Shares"] = "shares";
    SharesOutstandingPaidForFundEvent_OrderBy["ComptrollerProxy"] = "comptrollerProxy";
    SharesOutstandingPaidForFundEvent_OrderBy["Fee"] = "fee";
    SharesOutstandingPaidForFundEvent_OrderBy["SharesDue"] = "sharesDue";
    SharesOutstandingPaidForFundEvent_OrderBy["FundState"] = "fundState";
})(SharesOutstandingPaidForFundEvent_OrderBy = exports.SharesOutstandingPaidForFundEvent_OrderBy || (exports.SharesOutstandingPaidForFundEvent_OrderBy = {}));
var SharesRedeemedEvent_OrderBy;
(function (SharesRedeemedEvent_OrderBy) {
    SharesRedeemedEvent_OrderBy["Id"] = "id";
    SharesRedeemedEvent_OrderBy["Fund"] = "fund";
    SharesRedeemedEvent_OrderBy["Type"] = "type";
    SharesRedeemedEvent_OrderBy["Investor"] = "investor";
    SharesRedeemedEvent_OrderBy["InvestmentState"] = "investmentState";
    SharesRedeemedEvent_OrderBy["Shares"] = "shares";
    SharesRedeemedEvent_OrderBy["PayoutAssetAmounts"] = "payoutAssetAmounts";
    SharesRedeemedEvent_OrderBy["Timestamp"] = "timestamp";
    SharesRedeemedEvent_OrderBy["FundState"] = "fundState";
    SharesRedeemedEvent_OrderBy["Transaction"] = "transaction";
})(SharesRedeemedEvent_OrderBy = exports.SharesRedeemedEvent_OrderBy || (exports.SharesRedeemedEvent_OrderBy = {}));
var SharesTokenSymbolSetEvent_OrderBy;
(function (SharesTokenSymbolSetEvent_OrderBy) {
    SharesTokenSymbolSetEvent_OrderBy["Id"] = "id";
    SharesTokenSymbolSetEvent_OrderBy["Timestamp"] = "timestamp";
    SharesTokenSymbolSetEvent_OrderBy["Transaction"] = "transaction";
    SharesTokenSymbolSetEvent_OrderBy["SharesTokenSymbol"] = "sharesTokenSymbol";
})(SharesTokenSymbolSetEvent_OrderBy = exports.SharesTokenSymbolSetEvent_OrderBy || (exports.SharesTokenSymbolSetEvent_OrderBy = {}));
var StakeTrade_OrderBy;
(function (StakeTrade_OrderBy) {
    StakeTrade_OrderBy["Id"] = "id";
    StakeTrade_OrderBy["Fund"] = "fund";
    StakeTrade_OrderBy["Adapter"] = "adapter";
    StakeTrade_OrderBy["Method"] = "method";
    StakeTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    StakeTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    StakeTrade_OrderBy["Timestamp"] = "timestamp";
    StakeTrade_OrderBy["FundState"] = "fundState";
})(StakeTrade_OrderBy = exports.StakeTrade_OrderBy || (exports.StakeTrade_OrderBy = {}));
var TokenSwapTrade_OrderBy;
(function (TokenSwapTrade_OrderBy) {
    TokenSwapTrade_OrderBy["Id"] = "id";
    TokenSwapTrade_OrderBy["Fund"] = "fund";
    TokenSwapTrade_OrderBy["Adapter"] = "adapter";
    TokenSwapTrade_OrderBy["Method"] = "method";
    TokenSwapTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    TokenSwapTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    TokenSwapTrade_OrderBy["Price"] = "price";
    TokenSwapTrade_OrderBy["Timestamp"] = "timestamp";
    TokenSwapTrade_OrderBy["FundState"] = "fundState";
})(TokenSwapTrade_OrderBy = exports.TokenSwapTrade_OrderBy || (exports.TokenSwapTrade_OrderBy = {}));
var TrackedAssetAddedEvent_OrderBy;
(function (TrackedAssetAddedEvent_OrderBy) {
    TrackedAssetAddedEvent_OrderBy["Id"] = "id";
    TrackedAssetAddedEvent_OrderBy["Fund"] = "fund";
    TrackedAssetAddedEvent_OrderBy["Asset"] = "asset";
    TrackedAssetAddedEvent_OrderBy["Timestamp"] = "timestamp";
    TrackedAssetAddedEvent_OrderBy["Transaction"] = "transaction";
})(TrackedAssetAddedEvent_OrderBy = exports.TrackedAssetAddedEvent_OrderBy || (exports.TrackedAssetAddedEvent_OrderBy = {}));
var TrackedAssetRemovedEvent_OrderBy;
(function (TrackedAssetRemovedEvent_OrderBy) {
    TrackedAssetRemovedEvent_OrderBy["Id"] = "id";
    TrackedAssetRemovedEvent_OrderBy["Fund"] = "fund";
    TrackedAssetRemovedEvent_OrderBy["Account"] = "account";
    TrackedAssetRemovedEvent_OrderBy["Asset"] = "asset";
    TrackedAssetRemovedEvent_OrderBy["Timestamp"] = "timestamp";
    TrackedAssetRemovedEvent_OrderBy["Transaction"] = "transaction";
})(TrackedAssetRemovedEvent_OrderBy = exports.TrackedAssetRemovedEvent_OrderBy || (exports.TrackedAssetRemovedEvent_OrderBy = {}));
var TrackedAssetsLimitSetEvent_OrderBy;
(function (TrackedAssetsLimitSetEvent_OrderBy) {
    TrackedAssetsLimitSetEvent_OrderBy["Id"] = "id";
    TrackedAssetsLimitSetEvent_OrderBy["Timestamp"] = "timestamp";
    TrackedAssetsLimitSetEvent_OrderBy["NextTrackedAssetsLimit"] = "nextTrackedAssetsLimit";
    TrackedAssetsLimitSetEvent_OrderBy["Transaction"] = "transaction";
})(TrackedAssetsLimitSetEvent_OrderBy = exports.TrackedAssetsLimitSetEvent_OrderBy || (exports.TrackedAssetsLimitSetEvent_OrderBy = {}));
var Trade_OrderBy;
(function (Trade_OrderBy) {
    Trade_OrderBy["Id"] = "id";
    Trade_OrderBy["Fund"] = "fund";
    Trade_OrderBy["Adapter"] = "adapter";
    Trade_OrderBy["Method"] = "method";
    Trade_OrderBy["Timestamp"] = "timestamp";
    Trade_OrderBy["FundState"] = "fundState";
})(Trade_OrderBy = exports.Trade_OrderBy || (exports.Trade_OrderBy = {}));
var Transaction_OrderBy;
(function (Transaction_OrderBy) {
    Transaction_OrderBy["Id"] = "id";
    Transaction_OrderBy["From"] = "from";
    Transaction_OrderBy["To"] = "to";
    Transaction_OrderBy["Value"] = "value";
    Transaction_OrderBy["Timestamp"] = "timestamp";
    Transaction_OrderBy["Block"] = "block";
    Transaction_OrderBy["GasUsed"] = "gasUsed";
    Transaction_OrderBy["GasPrice"] = "gasPrice";
    Transaction_OrderBy["Input"] = "input";
    Transaction_OrderBy["Events"] = "events";
})(Transaction_OrderBy = exports.Transaction_OrderBy || (exports.Transaction_OrderBy = {}));
var TransferEvent_OrderBy;
(function (TransferEvent_OrderBy) {
    TransferEvent_OrderBy["Id"] = "id";
    TransferEvent_OrderBy["Fund"] = "fund";
    TransferEvent_OrderBy["Timestamp"] = "timestamp";
    TransferEvent_OrderBy["Transaction"] = "transaction";
    TransferEvent_OrderBy["From"] = "from";
    TransferEvent_OrderBy["To"] = "to";
    TransferEvent_OrderBy["Amount"] = "amount";
})(TransferEvent_OrderBy = exports.TransferEvent_OrderBy || (exports.TransferEvent_OrderBy = {}));
var UniswapV2PoolAssetDetail_OrderBy;
(function (UniswapV2PoolAssetDetail_OrderBy) {
    UniswapV2PoolAssetDetail_OrderBy["Id"] = "id";
    UniswapV2PoolAssetDetail_OrderBy["Token0"] = "token0";
    UniswapV2PoolAssetDetail_OrderBy["Token1"] = "token1";
})(UniswapV2PoolAssetDetail_OrderBy = exports.UniswapV2PoolAssetDetail_OrderBy || (exports.UniswapV2PoolAssetDetail_OrderBy = {}));
var UnknownPolicySetting_OrderBy;
(function (UnknownPolicySetting_OrderBy) {
    UnknownPolicySetting_OrderBy["Id"] = "id";
    UnknownPolicySetting_OrderBy["Policy"] = "policy";
    UnknownPolicySetting_OrderBy["Comptroller"] = "comptroller";
    UnknownPolicySetting_OrderBy["Timestamp"] = "timestamp";
    UnknownPolicySetting_OrderBy["Enabled"] = "enabled";
    UnknownPolicySetting_OrderBy["Events"] = "events";
})(UnknownPolicySetting_OrderBy = exports.UnknownPolicySetting_OrderBy || (exports.UnknownPolicySetting_OrderBy = {}));
var UnstakeAndRedeemTrade_OrderBy;
(function (UnstakeAndRedeemTrade_OrderBy) {
    UnstakeAndRedeemTrade_OrderBy["Id"] = "id";
    UnstakeAndRedeemTrade_OrderBy["Fund"] = "fund";
    UnstakeAndRedeemTrade_OrderBy["Adapter"] = "adapter";
    UnstakeAndRedeemTrade_OrderBy["Method"] = "method";
    UnstakeAndRedeemTrade_OrderBy["IncomingAssetAmounts"] = "incomingAssetAmounts";
    UnstakeAndRedeemTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    UnstakeAndRedeemTrade_OrderBy["Timestamp"] = "timestamp";
    UnstakeAndRedeemTrade_OrderBy["FundState"] = "fundState";
})(UnstakeAndRedeemTrade_OrderBy = exports.UnstakeAndRedeemTrade_OrderBy || (exports.UnstakeAndRedeemTrade_OrderBy = {}));
var UnstakeTrade_OrderBy;
(function (UnstakeTrade_OrderBy) {
    UnstakeTrade_OrderBy["Id"] = "id";
    UnstakeTrade_OrderBy["Fund"] = "fund";
    UnstakeTrade_OrderBy["Adapter"] = "adapter";
    UnstakeTrade_OrderBy["Method"] = "method";
    UnstakeTrade_OrderBy["IncomingAssetAmount"] = "incomingAssetAmount";
    UnstakeTrade_OrderBy["OutgoingAssetAmount"] = "outgoingAssetAmount";
    UnstakeTrade_OrderBy["Timestamp"] = "timestamp";
    UnstakeTrade_OrderBy["FundState"] = "fundState";
})(UnstakeTrade_OrderBy = exports.UnstakeTrade_OrderBy || (exports.UnstakeTrade_OrderBy = {}));
var ValueInterpreterSetEvent_OrderBy;
(function (ValueInterpreterSetEvent_OrderBy) {
    ValueInterpreterSetEvent_OrderBy["Id"] = "id";
    ValueInterpreterSetEvent_OrderBy["Timestamp"] = "timestamp";
    ValueInterpreterSetEvent_OrderBy["Transaction"] = "transaction";
    ValueInterpreterSetEvent_OrderBy["PrevValueInterpreter"] = "prevValueInterpreter";
    ValueInterpreterSetEvent_OrderBy["NextValueInterpreter"] = "nextValueInterpreter";
})(ValueInterpreterSetEvent_OrderBy = exports.ValueInterpreterSetEvent_OrderBy || (exports.ValueInterpreterSetEvent_OrderBy = {}));
var VaultCallDeregisteredEvent_OrderBy;
(function (VaultCallDeregisteredEvent_OrderBy) {
    VaultCallDeregisteredEvent_OrderBy["Id"] = "id";
    VaultCallDeregisteredEvent_OrderBy["Timestamp"] = "timestamp";
    VaultCallDeregisteredEvent_OrderBy["Transaction"] = "transaction";
    VaultCallDeregisteredEvent_OrderBy["ContractAddress"] = "contractAddress";
    VaultCallDeregisteredEvent_OrderBy["Selector"] = "selector";
})(VaultCallDeregisteredEvent_OrderBy = exports.VaultCallDeregisteredEvent_OrderBy || (exports.VaultCallDeregisteredEvent_OrderBy = {}));
var VaultCallRegisteredEvent_OrderBy;
(function (VaultCallRegisteredEvent_OrderBy) {
    VaultCallRegisteredEvent_OrderBy["Id"] = "id";
    VaultCallRegisteredEvent_OrderBy["Timestamp"] = "timestamp";
    VaultCallRegisteredEvent_OrderBy["Transaction"] = "transaction";
    VaultCallRegisteredEvent_OrderBy["ContractAddress"] = "contractAddress";
    VaultCallRegisteredEvent_OrderBy["Selector"] = "selector";
})(VaultCallRegisteredEvent_OrderBy = exports.VaultCallRegisteredEvent_OrderBy || (exports.VaultCallRegisteredEvent_OrderBy = {}));
var VaultLibSetEvent_OrderBy;
(function (VaultLibSetEvent_OrderBy) {
    VaultLibSetEvent_OrderBy["Id"] = "id";
    VaultLibSetEvent_OrderBy["Fund"] = "fund";
    VaultLibSetEvent_OrderBy["Timestamp"] = "timestamp";
    VaultLibSetEvent_OrderBy["Transaction"] = "transaction";
    VaultLibSetEvent_OrderBy["PrevVaultLib"] = "prevVaultLib";
    VaultLibSetEvent_OrderBy["NextVaultLib"] = "nextVaultLib";
})(VaultLibSetEvent_OrderBy = exports.VaultLibSetEvent_OrderBy || (exports.VaultLibSetEvent_OrderBy = {}));
var VaultProxyDeployedEvent_OrderBy;
(function (VaultProxyDeployedEvent_OrderBy) {
    VaultProxyDeployedEvent_OrderBy["Id"] = "id";
    VaultProxyDeployedEvent_OrderBy["Fund"] = "fund";
    VaultProxyDeployedEvent_OrderBy["Timestamp"] = "timestamp";
    VaultProxyDeployedEvent_OrderBy["Transaction"] = "transaction";
    VaultProxyDeployedEvent_OrderBy["FundDeployer"] = "fundDeployer";
    VaultProxyDeployedEvent_OrderBy["Owner"] = "owner";
    VaultProxyDeployedEvent_OrderBy["VaultLib"] = "vaultLib";
    VaultProxyDeployedEvent_OrderBy["Accessor"] = "accessor";
    VaultProxyDeployedEvent_OrderBy["FundName"] = "fundName";
})(VaultProxyDeployedEvent_OrderBy = exports.VaultProxyDeployedEvent_OrderBy || (exports.VaultProxyDeployedEvent_OrderBy = {}));
var VaultProxySetEvent_OrderBy;
(function (VaultProxySetEvent_OrderBy) {
    VaultProxySetEvent_OrderBy["Id"] = "id";
    VaultProxySetEvent_OrderBy["Fund"] = "fund";
    VaultProxySetEvent_OrderBy["Timestamp"] = "timestamp";
    VaultProxySetEvent_OrderBy["Transaction"] = "transaction";
    VaultProxySetEvent_OrderBy["VaultProxy"] = "vaultProxy";
})(VaultProxySetEvent_OrderBy = exports.VaultProxySetEvent_OrderBy || (exports.VaultProxySetEvent_OrderBy = {}));
var _SubgraphErrorPolicy_;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["Allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["Deny"] = "deny";
})(_SubgraphErrorPolicy_ = exports._SubgraphErrorPolicy_ || (exports._SubgraphErrorPolicy_ = {}));
exports.AssetsDocument = graphql_tag_1.default `
    query assets {
  assets(first: 1000, orderBy: symbol, orderDirection: asc) {
    id
    name
    symbol
    decimals
    type
    derivativeType
    releases {
      id
    }
    price {
      price
      timestamp
    }
    underlyingAsset {
      id
      symbol
      name
      decimals
    }
    uniswapV2PoolAssetDetails {
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
    }
  }
}
    `;
exports.CurrentReleaseContractsDocument = graphql_tag_1.default `
    query currentReleaseContracts {
  network(id: "ENZYME") {
    currentRelease {
      adapterBlacklist
      adapterWhitelist
      aggregatedDerivativePriceFeed
      assetBlacklist
      assetWhitelist
      buySharesCallerWhitelist
      chaiAdapter
      chaiIntegratee
      chainlinkPriceFeed
      compoundAdapter
      comptrollerLib
      dispatcher
      entranceRateBurnFee
      entranceRateDirectFee
      feeManager
      fundActionsWrapper
      fundDeployer
      guaranteedRedemption
      integrationManager
      investorWhitelist
      kyberAdapter
      kyberIntegratee
      managementFee
      maxConcentration
      minMaxInvestment
      paraSwapAdapter
      performanceFee
      policyManager
      synthetixAdapter
      synthetixAddressResolver
      synthetixDelegateApprovals
      synthetixIntegratee
      trackedAssetsAdapter
      uniswapV2Adapter
      uniswapV2Integratee
      valueInterpreter
      vaultLib
      wethToken
      zeroExV2Adapter
    }
  }
}
    `;
exports.VaultDocument = graphql_tag_1.default `
    query vault($id: ID!) {
  fund(id: $id) {
    release {
      id
    }
    accessor {
      id
    }
  }
}
    `;
const defaultWrapper = (action, _operationName) => action();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        assets(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.AssetsDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'assets');
        },
        currentReleaseContracts(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.CurrentReleaseContractsDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'currentReleaseContracts');
        },
        vault(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.VaultDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'vault');
        }
    };
}
exports.getSdk = getSdk;
