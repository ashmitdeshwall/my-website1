export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#003366] border-b-2 border-[#003366] pb-2 mb-6">About BSNLEUUPW</h1>

      <div className="bg-white border border-gray-200 rounded shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">About Us</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          BSNL Employees Union, Uttar Pradesh (West) — commonly known as BSNLEUUPW — is a registered trade union representing the interests and welfare of BSNL employees working in the UP West Telecom Circle. The union is affiliated with BSNLEU (BSNL Employees Union), the largest and most representative union of BSNL employees in India.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Our circle covers major cities including Meerut, Agra, Aligarh, Bareilly, Moradabad, Saharanpur, Mathura, and surrounding areas. We work tirelessly to ensure that the rights, benefits, and working conditions of all BSNL employees are protected and improved.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          The union actively participates in discussions with management on policy matters, wage revisions, promotions, transfers, and other service conditions affecting employees. We believe in democratic functioning and collective bargaining to achieve the best outcomes for our members.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded p-4">
            <h3 className="font-bold text-[#003366] mb-2">🎯 Our Mission</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Protect the rights and interests of BSNL employees</li>
              <li>Fight for better wages, promotions, and working conditions</li>
              <li>Ensure job security and welfare of all members</li>
              <li>Strengthen BSNL as a public sector telecom company</li>
              <li>Promote unity and solidarity among employees</li>
            </ul>
          </div>
          <div className="bg-yellow-50 rounded p-4">
            <h3 className="font-bold text-[#003366] mb-2">🔭 Our Vision</h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>A strong, vibrant BSNL serving every corner of India</li>
              <li>Dignified working conditions for all employees</li>
              <li>Fair and transparent promotion policies</li>
              <li>Modern infrastructure and technology adoption</li>
              <li>BSNL as the backbone of India's digital revolution</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded shadow-sm p-6">
        <h2 className="text-lg font-bold text-[#003366] mb-3">📡 History of BSNL</h2>
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-[#003366] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm text-center">BSNL</span>
          </div>
          <div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              <strong>Bharat Sanchar Nigam Limited (BSNL)</strong> was incorporated on 15th September 2000 and commenced operations on <strong>1st October 2000</strong>. It was formed by the Government of India to take over the telecom services and network management from the erstwhile Central Government Departments of Telecom Services (DTS) and Telecom Operations (DTO).
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              BSNL is India's oldest and largest communication service provider (CSP). It provides a wide range of telecom services including wireline, CDMA mobile, GSM mobile, internet, broadband, carrier service, MPLS-VPN, VSAT, VoIP, and other value-added services.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              With a network spanning the length and breadth of the country (excluding Delhi and Mumbai), BSNL has been the backbone of India's telecom revolution. It serves millions of customers across urban and rural areas, playing a crucial role in bridging the digital divide.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              The role of employee unions like BSNLEU has been instrumental in protecting the interests of over 60,000 employees and ensuring that BSNL continues to serve the nation as a public sector enterprise. The union has fought against privatization attempts and worked towards the revival and strengthening of BSNL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
