import ProfileSidebar from "../../../components/common/ProfileSidebar";

const About = () => {
    return (

      <div className="flex">
  <ProfileSidebar />
      <div className="w-[973px] h-[756px] mt-[32px] mx-auto flex flex-col opacity-100 bg-white box-border">
        <h1 className="text-[32px] font-bold mx-[20px] mb-[18px] mt-[20px] text-center text-gray-800">
          About App
        </h1>
  
        <div className="flex flex-col">
          <div className="w-[927px] h-[123px] px-4 rounded-lg">
            <h2 className="text-[20px] font-semibold mb-3 text-gray-800">
              1. Quotation Creation
            </h2>
  
            <p className="text-[18px] ml-[18px] font-medium text-gray-600 leading-relaxed">
              Generate professional quotations instantly with auto-calculated
              totals and tax summaries.
            </p>
          </div>
  
          <div className="w-[927px] h-[123px] px-4 rounded-lg">
            <h2 className="text-[20px] font-semibold mb-3 text-gray-800">
              2. Custom Field Builder
            </h2>
            <p className="text-[18px] ml-[18px]  font-medium text-gray-600 leading-relaxed">
              Super Admins can add, edit, or remove fields to match their
              company's specific needs.
            </p>
          </div>
  
          <div className="w-[927px] h-[123px] px-4 rounded-lg">
            <h2 className="text-[20px] font-semibold mb-3 text-gray-800">
              3. Client Management
            </h2>
            <p className="text-[18px] ml-[18px]  font-medium text-gray-600 leading-relaxed">
              Store and organize client details, view history, and access past
              quotations anytime.
            </p>
          </div>
  
          <div className="w-[927px] h-[123px] px-4 rounded-lg">
            <h2 className="text-[20px] font-semibold mb-3 text-gray-800">
              4. Dashboard & Analytics
            </h2>
            <p className="text-[18px] ml-[18px]  font-medium text-gray-600 leading-relaxed">
              Track total quotations, pending approvals, and client data with an
              interactive, real-time dashboard.
            </p>
          </div>
  
          <div className="w-[927px] h-[123px] px-4 rounded-lg">
            <h2 className="text-[20px] font-semibold mb-3 text-gray-800">
              5. Template Designer
            </h2>
            <p className="text-[18px] ml-[18px]  font-medium text-gray-600 leading-relaxed">
              Create and customize quotation templates to match your brand
              identity and layout preferences.
            </p>
          </div>
        </div>
      </div>
</div>

    );
  };
  
  export default About;