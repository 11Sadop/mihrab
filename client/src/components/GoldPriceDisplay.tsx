// @ts-nocheck
import React from 'react';
import { useGoldPrice, SUPPORTED_CURRENCIES, formatTimeAgo } from '../services/goldPriceService';
import './GoldPriceDisplay.css';
interface GoldPriceDisplayProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}
export const GoldPriceDisplay: React.FC<GoldPriceDisplayProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const goldPriceData = useGoldPrice(selectedCurrency);
  const currentCurrency = SUPPORTED_CURRENCIES.find(c => c.code === selectedCurrency);
  return (
    <div className="gold-price-container">
      <div className="gold-price-header">
        <h3>🪙 سعر الذهب اليوم (عيار 24)</h3>
        <p className="gold-price-subtitle">الأسعار محدثة من السوق العالمي</p>
      </div>
      <div className="currency-selector">
        <label htmlFor="currency-select">اختر عملتك:</label>
        <select
          id="currency-select"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="currency-select"
        >
          {SUPPORTED_CURRENCIES.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.flag} {curr.name} ({curr.symbol})
            </option>
          ))}
        </select>
      </div>
      <div className="gold-price-content">
        {goldPriceData.loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>جاري تحميل الأسعار...</p>
          </div>
        ) : goldPriceData.error ? (
          <div className="error-state">
            <span className="error-icon">❌</span>
            <p>{goldPriceData.error}</p>
            <button onClick={goldPriceData.refresh} className="retry-btn">
              🔄 إعادة المحاولة
            </button>
          </div>
        ) : (
          <>
            <div className="price-card primary">
              <div className="price-label">💵 سعر الجرام الواحد</div>
              <div className="price-value">
                {goldPriceData.pricePerGram.toLocaleString('ar-SA', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="currency-symbol">{currentCurrency?.symbol}</span>
              </div>
              <div className="price-note">ذهب خالص (عيار 24)</div>
            </div>
            <div className="price-card secondary">
              <div className="price-label">📊 سعر النصاب (85 جرام)</div>
              <div className="price-value nisab">
                {goldPriceData.nisabPrice.toLocaleString('ar-SA', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="currency-symbol">{currentCurrency?.symbol}</span>
              </div>
              <div className="price-note">
                إذا كان مالك يساوي أو يزيد عن هذا المبلغ، تجب الزكاة (2.5%)
              </div>
            </div>
            <div className="update-info">
              <span className="update-time">
                🕐 آخر تحديث: {formatTimeAgo(goldPriceData.lastUpdated)}
              </span>
              <button
                onClick={goldPriceData.refresh}
                className="refresh-btn"
                title="تحديث الأسعار"
              >
                🔄 تحديث
              </button>
            </div>
            <div className="info-banner">
              <span className="info-icon">ℹ️</span>
              <p>
                الأسعار تحدّث تلقائياً كل 10 دقائق وتعكس أسعار السوق العالمية للذهب الخالص
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default GoldPriceDisplay;
