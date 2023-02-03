using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Foundation.ContentActionsApi.Infrastructure
{
    public class LanguageRequest
    {
        private double _weight = 1.0;
        public string LanguageCode { get; set; }
        public double Weight {
            get => _weight;
            set 
            {
                if (value < 0.0 || value > 1.0)
                {
                    throw new ArgumentOutOfRangeException(nameof(value), "The weight must greater then or equal to 0 and smaller then or equal to 1");
                }
                _weight = value;
            }
        }

        public CultureInfo CultureInfo => CultureInfo.GetCultureInfo(LanguageCode);

        public Dictionary<string, string> Params { get; } = new Dictionary<string, string>();

        public LanguageRequest(string headerValue)
        {
            // Split value
            var parts = headerValue.Split(";", StringSplitOptions.TrimEntries & StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 0)
                throw new ArgumentException("headerValue must be a non-empty string", nameof(headerValue));

            // Assign Language Code
            LanguageCode = parts[0];

            // Process language parameters
            parts.Skip(1).ForEach(x => { 
                var paramParts = x.Split("=", 2, StringSplitOptions.TrimEntries); 
                Params.Add(paramParts[0], paramParts[1]); 
            });
            if (Params.ContainsKey("q") && double.TryParse(Params["q"], out var langWeight))
                Weight = langWeight;
        }

        public LanguageRequest(string languageCode, double weight)
        {
            LanguageCode = languageCode;
            Weight = weight;
        }

        public override string ToString()
        {
            string request = LanguageCode;
            if (Weight < 1.0)
                request = request + ";q=" + Weight.ToString("{ 0:0.0 }");
            return request;
        }
    }
}
