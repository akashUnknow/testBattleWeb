const AccountInfoItem = ({ icon: Icon, label, value, bgColor, iconColor, children }) => {
  return (
    <div className={`flex items-start gap-4 p-4 ${bgColor} rounded-xl`}>
      <div className={`w-10 h-10 ${iconColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
        {children}
      </div>
    </div>
  );
};
export default AccountInfoItem;